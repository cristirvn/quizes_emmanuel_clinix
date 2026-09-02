/**
 * Scored self-assessment questionnaires — the funnel's main entry point.
 *
 * These are the client's own nine adult tests, authored as standalone HTML and
 * imported verbatim into `content/quizzes/*.ts` by `scripts/import-quizzes.mjs`
 * (Aug 2026 brief, `Emmanuel-CliniX_Chestionar_Sinteza-Schimbari.pdf`). This
 * module owns only the TYPES and the registry — never the copy.
 *
 * How one runs (`components/ScoredQuiz.tsx`, engine in `lib/scored-quiz.ts`):
 *
 *  1. Linear — every visitor answers all N scored questions in order. Each
 *     option carries a score (10 / 7 / 4 / 1); the grade is their arithmetic
 *     mean, rounded to one decimal, on a 1–10 scale.
 *  2. Then ONE urgency question, which is deliberately NOT scored. It picks the
 *     result screen's CTA copy and tags the lead HOT / WARM / NURTURE in
 *     GoHighLevel — the client asks for urgency directly rather than inferring
 *     it from the grade.
 *  3. Then name + phone + email behind a mandatory GDPR consent checkbox
 *     (health answers are Art. 9 special-category data — the gate is not
 *     optional, see `LeadCapture requireConsent`).
 *  4. Then the result: the grade with its band, up to five RISKS surfaced from
 *     the answers, and a CTA into the matching campaign LP.
 *
 * Risks come in two layers, resolved in `lib/scored-quiz.ts`:
 *
 *  - `combos` — a known pattern across two weakly-answered questions (e.g. long
 *    duration + degraded sleep). They win, and they CONSUME their questions so
 *    the same ground isn't covered twice.
 *  - per-question `triggers` — fire for the questions no combo consumed.
 *
 * Everything is sorted by `weight` and capped at five.
 *
 * Registry note: `Record<ScoredQuizSlug, ScoredQuiz>` means adding a slug to the
 * union without adding its module is a compile error — the two can't drift.
 */

import { ANXIETATE } from "@/content/quizzes/anxietate";
import { PANICA } from "@/content/quizzes/panica";
import { SOMN } from "@/content/quizzes/somn";
import { BURNOUT } from "@/content/quizzes/burnout";
import { FOCUS } from "@/content/quizzes/focus";
import { DISPOZITIE } from "@/content/quizzes/dispozitie";
import { MIGRENE } from "@/content/quizzes/migrene";
import { STRES } from "@/content/quizzes/stres";
import { ADICTII } from "@/content/quizzes/adictii";

/** Stable id for each test (also its `/chestionare/<slug>` route). */
export type ScoredQuizSlug =
  | "anxietate"
  | "panica"
  | "somn"
  | "burnout"
  | "focus"
  | "dispozitie"
  | "migrene"
  | "stres"
  | "adictii";

/** Lead-scoring tier, taken from the urgency question's chosen answer. */
export type Urgency = "hot" | "warm" | "nurture";

/** An answer option and the score it contributes to the grade. */
export interface ScoredOption {
  label: string;
  /** 10 (best) · 7 · 4 · 1 (worst). */
  score: number;
}

/** A risk shown on the result screen — a documented tendency, never a verdict. */
export interface QuizRisk {
  title: string;
  text: string;
}

export interface ScoredQuestion {
  text: string;
  /** Always four options, in descending score order (10 → 1). */
  options: ScoredOption[];
  /** Chosen scores that fire this question's risk (typically `[4, 1]`). */
  triggers: number[];
  /** Priority — higher sorts nearer the top of the five risks shown. */
  weight: number;
  risk: QuizRisk;
}

/** A pattern spanning two weakly-answered questions. Outranks single risks. */
export interface RiskCombo {
  /** 0-based indices into `questions`. */
  q: number[];
  /** Highest score still counted as a weak answer (inclusive). */
  max: number;
  weight: number;
  risk: QuizRisk;
}

export interface UrgencyOption {
  label: string;
  urgency: Urgency;
}

/** The unscored closing question — drives CTA copy + the CRM lead tag. */
export interface UrgencyQuestion {
  text: string;
  options: UrgencyOption[];
}

/** Result-screen copy for one grade band. `interp` may contain `{name}`. */
export interface BandCopy {
  label: string;
  interp: string;
}

/** CTA copy for one urgency tier. */
export interface CtaCopy {
  title: string;
  text: string;
  button: string;
}

export interface ScoredQuiz {
  slug: ScoredQuizSlug;
  /** Route under the Chestionare tab: `/chestionare/<route>`. */
  route: string;
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    /** The intro paragraph that sets expectations before the first question. */
    lead: string;
    startButton: string;
  };
  /** How the grade is labelled on the result screen. */
  scoreLabel: string;
  questions: ScoredQuestion[];
  urgency: UrgencyQuestion;
  combos: RiskCombo[];
  /** Lead-capture step copy (name + phone + email + consent). */
  lead: { title: string; text: string; submit: string };
  result: {
    risksHeading: string;
    risksSub: string;
    /** Closing reassurance under the risks — contains inline HTML. */
    closing: string;
    /** Shown instead of the risks when nothing fired. */
    goodHeading: string;
    goodText: string;
    /** Bands at > 7.5 · 5–7.5 · < 5 (client spec). */
    bands: { good: BandCopy; mid: BandCopy; low: BandCopy };
  };
  cta: {
    /** Campaign LP this test's result screen sends people to. */
    lp: string;
    eyebrow: string;
    hot: CtaCopy;
    warm: CtaCopy;
    nurture: CtaCopy;
  };
  /** Short "this is not a diagnosis" line, shown under the questions. */
  note: string;
  /** The full legal text at the foot of the result screen. */
  legal: string;
}

/** All tests, keyed by slug. */
export const scoredQuizzes: Record<ScoredQuizSlug, ScoredQuiz> = {
  anxietate: ANXIETATE,
  panica: PANICA,
  somn: SOMN,
  burnout: BURNOUT,
  focus: FOCUS,
  dispozitie: DISPOZITIE,
  migrene: MIGRENE,
  stres: STRES,
  adictii: ADICTII,
};

/** Display order — used by the `/chestionare` hub and the sitemap. */
export const scoredQuizList: ScoredQuiz[] = [
  ANXIETATE,
  PANICA,
  SOMN,
  BURNOUT,
  FOCUS,
  DISPOZITIE,
  MIGRENE,
  STRES,
  ADICTII,
];

/** Lookup by route/slug (they're identical), or `null` if unknown. */
export function getScoredQuiz(slug: string): ScoredQuiz | null {
  return (scoredQuizzes as Record<string, ScoredQuiz>)[slug] ?? null;
}
