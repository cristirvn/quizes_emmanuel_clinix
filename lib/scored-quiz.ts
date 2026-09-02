/**
 * Scoring + risk engine for the self-assessment questionnaires
 * (`content/scored-quizzes.ts`). Pure and UI-agnostic — `components/ScoredQuiz`
 * drives the screens, this module only answers: "given these answers, what's the
 * grade, which band, and which risks surface?".
 *
 * A faithful port of the engine in the client's standalone HTML tests, so a
 * visitor gets the same grade and the same risks on either. Three rules carry
 * the behaviour, and changing any of them changes what people are told:
 *
 *  - The grade is the arithmetic mean of the chosen scores (10 / 7 / 4 / 1),
 *    rounded to one decimal. The urgency question is NOT part of it.
 *  - Combo risks are resolved first, highest weight down. A combo fires when
 *    every one of its questions was answered at or below `max`, and none of them
 *    has already been consumed by a heavier combo. Firing consumes them, so the
 *    same weak answer never produces two risks.
 *  - Per-question risks then fire for the questions no combo took.
 *
 * Everything is sorted by weight and capped at `MAX_RISKS`; the UI labels the
 * first two "Risc major" and the rest "Risc secundar".
 */
import type { QuizRisk, ScoredQuiz, Urgency } from "@/content/scored-quizzes";

export type { Urgency };

/** Client spec: show at most five risks, however many fired. */
export const MAX_RISKS = 5;

/** How many of the shown risks are labelled "Risc major". */
export const MAJOR_RISKS = 2;

export type BandTier = "good" | "mid" | "low";

/** Band thresholds (client spec): ≥ 7.5 good · 5–7.5 mid · < 5 low. */
export function bandTierFor(grade: number): BandTier {
  if (grade >= 7.5) return "good";
  if (grade >= 5) return "mid";
  return "low";
}

/**
 * Map a band onto the lead-urgency scale. Only a FALLBACK: every test asks the
 * visitor directly (the unscored urgency question), and the declared answer
 * always wins. Used when a lead somehow reaches the CRM without one.
 */
export function urgencyFor(tier: BandTier): Urgency {
  if (tier === "low") return "hot";
  if (tier === "mid") return "warm";
  return "nurture";
}

export interface ScoredResult {
  /** Grade on the 1–10 scale, rounded to one decimal. */
  grade: number;
  tier: BandTier;
  /** Band copy for this grade, with `{name}` already interpolated. */
  band: { label: string; interp: string };
  /** Up to `MAX_RISKS` risks, heaviest first. */
  risks: QuizRisk[];
  /** How many of the N questions were answered at or below their trigger. */
  total: number;
}

/** An in-progress answer set: `answers[i]` is the chosen option index for question `i`. */
export type AnswerSet = Array<number | undefined>;

/** The score the visitor picked for question `i`, or `undefined` if unanswered. */
function scoreAt(quiz: ScoredQuiz, answers: AnswerSet, i: number): number | undefined {
  const index = answers[i];
  if (index === undefined) return undefined;
  return quiz.questions[i]?.options[index]?.score;
}

/**
 * Resolve the risk list: combos first (heaviest wins and consumes its
 * questions), then per-question triggers for whatever's left.
 */
export function buildRisks(quiz: ScoredQuiz, answers: AnswerSet): QuizRisk[] {
  const consumed = new Set<number>();
  const fired: Array<{ weight: number; risk: QuizRisk }> = [];

  for (const combo of [...quiz.combos].sort((a, b) => b.weight - a.weight)) {
    const allWeak = combo.q.every((i) => {
      const score = scoreAt(quiz, answers, i);
      return score !== undefined && score <= combo.max;
    });
    const allFree = combo.q.every((i) => !consumed.has(i));
    if (allWeak && allFree) {
      combo.q.forEach((i) => consumed.add(i));
      fired.push({ weight: combo.weight, risk: combo.risk });
    }
  }

  quiz.questions.forEach((question, i) => {
    if (consumed.has(i)) return;
    const score = scoreAt(quiz, answers, i);
    if (score !== undefined && question.triggers.includes(score)) {
      fired.push({ weight: question.weight, risk: question.risk });
    }
  });

  return fired
    .sort((a, b) => b.weight - a.weight)
    .slice(0, MAX_RISKS)
    .map((entry) => entry.risk);
}

/**
 * Score a completed questionnaire. Unanswered questions are simply skipped —
 * they contribute to neither the mean nor the risks — so a partial set still
 * produces a sane (if provisional) result.
 *
 * `name` is interpolated into the band's `{name}` placeholder; pass `null`
 * before the lead step and the sentence falls back to an impersonal opening.
 */
export function scoreQuiz(quiz: ScoredQuiz, answers: AnswerSet, name: string | null = null): ScoredResult {
  const scores: number[] = [];
  quiz.questions.forEach((_, i) => {
    const score = scoreAt(quiz, answers, i);
    if (score !== undefined) scores.push(score);
  });

  const mean = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  const grade = Math.round(mean * 10) / 10;
  const tier = bandTierFor(grade);
  const band = quiz.result.bands[tier];

  return {
    grade,
    tier,
    band: { label: band.label, interp: interpolateName(band.interp, name) },
    risks: buildRisks(quiz, answers),
    total: scores.length,
  };
}

/**
 * Put the visitor's name into a band sentence written as "{name}, răspunsurile
 * tale...". Without a name the placeholder AND its trailing comma have to go,
 * or the sentence opens on a stray ", ".
 */
export function interpolateName(text: string, name: string | null): string {
  const trimmed = name?.trim();
  if (trimmed) return text.replace("{name}", trimmed);
  const stripped = text.replace("{name}, ", "").replace("{name}", "");
  return stripped.charAt(0).toUpperCase() + stripped.slice(1);
}
