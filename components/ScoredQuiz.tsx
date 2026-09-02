"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { ScoredQuiz as ScoredQuizType, Urgency } from "@/content/scored-quizzes";
import { MAJOR_RISKS, scoreQuiz } from "@/lib/scored-quiz";
import { LeadCapture } from "@/components/LeadCapture";

/**
 * A self-assessment questionnaire (`/chestionare/[slug]`), rendering the
 * client's own nine tests (`content/scored-quizzes.ts`).
 *
 * Five screens, in order:
 *   intro → N scored questions → the urgency question → lead capture → result.
 *
 * The urgency question is deliberately unscored: it decides which CTA copy the
 * result screen closes on and tags the lead HOT / WARM / NURTURE in
 * GoHighLevel. It sits last, right before the form, exactly as in the client's
 * HTML — asking "how fast do you want to fix this" straight after the symptom
 * questions is what makes the answer honest.
 *
 * The result screen shows the grade with its band, then up to five risks
 * (`lib/scored-quiz.ts` resolves combos before per-question triggers), the first
 * two labelled "Risc major". Risks are documented tendencies, never predictions
 * about this person — the copy, the disclaimer under the questions and the legal
 * text at the foot are all load-bearing and must not be dropped.
 *
 * Visual design (client ask 2026-08-23) pixel-matches the live production site's
 * own quiz UI (`emmanuel-clinix.ro/chestionare/*`, a separate WordPress
 * codebase — tokens pulled via `getComputedStyle` from its DOM, see
 * `--color-quiz-*`/`--font-quiz-*` in `globals.css`).
 *
 * Drop-off tracking: each question fires a GA4 `test_step`, the form fires
 * `lead_form_view`, the result fires `test_result`. All env-gated (no ID → no-op).
 */

type Gtag = (...args: unknown[]) => void;

type Phase = "intro" | "quiz" | "urgency" | "lead" | "result";

function gtag(): Gtag | null {
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  return typeof g === "function" ? g : null;
}

/** Band accent — the client's own green / amber / red on the score ring. */
const BAND_COLOR = {
  good: "#10B981",
  mid: "#F59E0B",
  low: "#EF4444",
} as const;

export function ScoredQuiz({ quiz }: { quiz: ScoredQuizType }) {
  const total = quiz.questions.length;
  /** Questions + the urgency question — what the progress bar counts. */
  const steps = total + 1;

  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | undefined>>([]);
  const [urgencyIndex, setUrgencyIndex] = useState<number | null>(null);
  const [name, setName] = useState<string | null>(null);
  // Picked-but-not-yet-confirmed option on the current question.
  const [selected, setSelected] = useState<number | null>(null);

  const result = useMemo(() => scoreQuiz(quiz, answers, name), [quiz, answers, name]);

  const urgency: Urgency =
    urgencyIndex === null ? "nurture" : quiz.urgency.options[urgencyIndex].urgency;
  const cta = quiz.cta[urgency];

  // ── GA4 drop-off tracking — one `test_step` per question shown ────────────
  // Deliberately NOT `quiz_step`: that name belongs to the adaptive funnel,
  // whose GA4 funnel exploration is built on `{step 1–6, ramura}`. These tests
  // run 11–13 steps and have no branch, so sharing the event name would corrupt
  // that report. Both funnels also carry `funnel` for a single cross-cut filter.
  const firedFor = useRef<number | null>(null);
  const step = phase === "urgency" ? steps : index + 1;
  useEffect(() => {
    if ((phase !== "quiz" && phase !== "urgency") || firedFor.current === step) return;
    firedFor.current = step;
    gtag()?.("event", "test_step", {
      funnel: "test",
      step,
      question_id: phase === "urgency" ? `${quiz.slug}_urgenta` : `${quiz.slug}_q${step}`,
      test: quiz.slug,
    });
  }, [phase, step, quiz.slug]);

  // The lead form is the single biggest drop-off point in the funnel: without
  // this event you can't tell "quit on the last question" from "saw the form and
  // refused to leave a phone number". Fires once, when the form first renders.
  const leadViewFired = useRef(false);
  useEffect(() => {
    if (phase !== "lead" || leadViewFired.current) return;
    leadViewFired.current = true;
    gtag()?.("event", "lead_form_view", {
      funnel: "test",
      test: quiz.slug,
      nivel: result.tier,
    });
  }, [phase, quiz.slug, result.tier]);

  // Tapping an option only picks it — the primary button commits and advances.
  const choose = useCallback((optionIndex: number) => {
    setSelected(optionIndex);
  }, []);

  const confirmAdvance = useCallback(() => {
    if (selected == null) return;
    if (phase === "urgency") {
      setUrgencyIndex(selected);
      setSelected(null);
      setPhase("lead");
      return;
    }
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = selected;
      return next;
    });
    setSelected(null);
    if (index + 1 < total) {
      setIndex(index + 1);
    } else {
      setPhase("urgency");
    }
  }, [selected, phase, index, total]);

  const back = useCallback(() => {
    firedFor.current = null;
    if (phase === "lead") {
      setSelected(urgencyIndex);
      setPhase("urgency");
      return;
    }
    if (phase === "urgency") {
      setSelected(answers[total - 1] ?? null);
      setIndex(total - 1);
      setPhase("quiz");
      return;
    }
    if (index > 0) {
      setSelected(answers[index - 1] ?? null);
      setIndex(index - 1);
      return;
    }
    // Back from the first question returns to the intro, so the button is never
    // present but inert.
    setSelected(null);
    setPhase("intro");
  }, [phase, index, total, answers, urgencyIndex]);

  const onLeadSuccess = useCallback(
    ({ name: submitted }: { name: string }) => {
      setName(submitted.trim() || null);
      setPhase("result");
      gtag()?.("event", "test_result", {
        funnel: "test",
        test: quiz.slug,
        grade: result.grade,
        band: result.tier,
        urgenta: urgency,
        riscuri: result.risks.length,
      });
      window.scrollTo({ top: 0, behavior: "auto" });
    },
    [quiz.slug, result.grade, result.tier, result.risks.length, urgency],
  );

  const question = quiz.questions[index];
  // The form has no "question N of M" of its own — the client's HTML hides the
  // bar there so the last thing on screen is the form, not a progress promise.
  const showProgress = phase === "quiz" || phase === "urgency";
  const progressPct = Math.round((step / steps) * 100);

  const options =
    phase === "urgency"
      ? quiz.urgency.options.map((o) => o.label)
      : (question?.options.map((o) => o.label) ?? []);
  const questionText = phase === "urgency" ? quiz.urgency.text : question?.text;

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-[var(--color-quiz-bg)] px-5 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-2xl">
        {/* Intro header (hidden on the result screen, which has its own hero) */}
        {phase !== "result" && phase !== "intro" && (
          <div className="mb-8 text-center">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              {quiz.hero.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-2xl font-semibold text-navy sm:text-3xl">
              {quiz.hero.title}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted">{quiz.hero.subtitle}</p>
          </div>
        )}

        {showProgress && (
          <div className="mb-6 rounded-full bg-white/66 px-5 py-3 shadow-sm">
            <div
              className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-[0.11em] text-[var(--color-quiz-navy)]/70"
              role="progressbar"
              aria-valuenow={step}
              aria-valuemin={1}
              aria-valuemax={steps}
            >
              <span>
                Întrebarea {step} din {steps}
              </span>
              <span>{progressPct}%</span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[var(--color-quiz-navy)]/10">
              <div
                className="h-full rounded-full bg-[image:var(--color-quiz-gradient)] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* ── INTRO / QUIZ / LEAD card ──────────────────────────────────────── */}
        {phase !== "result" && (
          <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-10">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-[image:linear-gradient(90deg,var(--color-quiz-tan),var(--color-quiz-teal))]" />

            {/* Intro — sets expectations before the first question */}
            {phase === "intro" && (
              <div className="animate-quiz-fade text-center">
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
                  {quiz.hero.eyebrow}
                </p>
                <h1
                  className="mt-4 text-2xl font-semibold leading-snug text-[var(--color-quiz-navy)] sm:text-3xl"
                  style={{ fontFamily: "var(--font-quiz-serif)" }}
                >
                  {quiz.hero.title}
                </h1>
                <p className="mt-3 text-lg text-[var(--color-quiz-navy)]/80">{quiz.hero.subtitle}</p>
                <p className="mx-auto mt-5 max-w-md text-muted">{quiz.hero.lead}</p>
                <p className="mx-auto mt-5 max-w-md text-xs text-muted">{quiz.note}</p>
                <button
                  type="button"
                  onClick={() => setPhase("quiz")}
                  className="mt-7 w-full rounded-lg bg-[image:var(--color-quiz-gradient)] px-7 py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
                >
                  {quiz.hero.startButton}
                </button>
              </div>
            )}

            {/* A question — scored, or the closing urgency question */}
            {(phase === "quiz" || phase === "urgency") && questionText && (
              <div key={`${phase}-${index}`} className="animate-quiz-fade">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.11em] text-[var(--color-quiz-navy)]/70">
                  Întrebarea {step} din {steps}
                </p>
                <h2
                  className="mt-3 text-xl font-semibold leading-snug text-[var(--color-quiz-navy)] sm:text-[30px]"
                  style={{ fontFamily: "var(--font-quiz-serif)" }}
                >
                  {questionText}
                </h2>

                <div className="mt-7 grid gap-3">
                  {options.map((label, i) => {
                    const active = selected === i;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => choose(i)}
                        aria-pressed={active}
                        className={`flex w-full items-center gap-4 rounded-[18px] border px-[18px] py-4 text-left text-base text-[var(--color-quiz-navy)] shadow-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-quiz-teal)] ${
                          active
                            ? "border-[var(--color-quiz-navy)] bg-[var(--color-quiz-navy)]/[0.05]"
                            : "border-[var(--color-quiz-navy)]/[0.13] bg-white/62 hover:border-[var(--color-quiz-teal)] hover:bg-[var(--color-quiz-navy)]/[0.03]"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                            active ? "border-[var(--color-quiz-navy)]" : "border-[var(--color-quiz-navy)]/20"
                          } bg-white/76`}
                        >
                          {active && <span className="h-3 w-3 rounded-full bg-[image:var(--color-quiz-gradient)]" />}
                        </span>
                        <span className="text-[13.5px] font-semibold uppercase tracking-[0.02em]">{label}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={confirmAdvance}
                  disabled={selected == null}
                  className="mt-6 w-full rounded-lg bg-[image:var(--color-quiz-gradient)] px-7 py-4 text-base font-medium text-white transition-opacity disabled:opacity-[0.42] enabled:hover:opacity-90"
                >
                  {phase === "urgency" ? "Continuă →" : "Următoarea →"}
                </button>

                <button
                  type="button"
                  onClick={back}
                  className="mt-3 w-full rounded-lg bg-[var(--color-quiz-accent)] px-7 py-4 text-base font-medium text-white transition-colors hover:bg-[var(--color-quiz-accent-dark)]"
                >
                  ← Înapoi
                </button>

                <p className="mt-6 text-xs text-muted">{quiz.note}</p>
              </div>
            )}

            {/* Lead capture — name + phone + email, behind the consent gate */}
            {phase === "lead" && (
              <div key="lead" className="animate-quiz-fade">
                <div className="rounded-xl border border-[var(--color-quiz-accent)]/30 bg-[var(--color-quiz-accent-soft)] p-5">
                  <p className="font-heading text-lg font-bold text-[var(--color-quiz-navy)]">{quiz.lead.title}</p>
                  <p className="mt-2 text-sm text-muted">{quiz.lead.text}</p>
                </div>

                <div className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
                  <LeadCapture
                    concern={quiz.hero.title}
                    collectEmail
                    requireConsent
                    fields={{
                      // Which funnel + test this lead came from.
                      sursa: `test-${quiz.slug}`,
                      test: quiz.slug,
                      scor: result.grade.toFixed(1),
                      nivel: result.tier,
                      // Declared, not inferred — the urgency question was just
                      // answered. Same field the adaptive funnel's Î5 writes, so
                      // both funnels enter one GHL HOT/WARM/NURTURE workflow.
                      i5_urgenta: urgency,
                      urgenta: quiz.urgency.options[urgencyIndex ?? 0].label,
                      // The risk titles the visitor is about to be shown, so the
                      // person who calls them has the same screen in front of them.
                      riscuri: result.risks.map((r) => r.title).join(" | "),
                    }}
                    submitLabel={quiz.lead.submit}
                    loadingMessage="Calculăm răspunsurile tale. Revenim imediat cu răspunsul potrivit pentru tine."
                    onSuccess={onLeadSuccess}
                  />
                </div>

                <button
                  type="button"
                  onClick={back}
                  className="mt-6 w-full rounded-lg bg-[var(--color-quiz-accent)] px-7 py-4 text-base font-medium text-white transition-colors hover:bg-[var(--color-quiz-accent-dark)]"
                >
                  ← Înapoi la ultima întrebare
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── RESULT screen ─────────────────────────────────────────────────── */}
        {phase === "result" && (
          <div className="animate-quiz-fade">
            {/* Score */}
            <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 text-center shadow-sm sm:p-10">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-[image:linear-gradient(90deg,var(--color-quiz-tan),var(--color-quiz-teal))]" />
              <p className="text-[11px] font-extrabold uppercase tracking-[0.11em] text-[var(--color-quiz-navy)]/70">
                {quiz.scoreLabel}
              </p>

              <div className="mt-6 flex justify-center">
                <ScoreRing grade={result.grade} color={BAND_COLOR[result.tier]} />
              </div>

              <p
                className="mt-5 text-xl font-semibold text-[var(--color-quiz-navy)] sm:text-2xl"
                style={{ fontFamily: "var(--font-quiz-serif)" }}
              >
                {result.band.label}
              </p>
              <p className="mx-auto mt-3 max-w-md text-muted">{result.band.interp}</p>
              <p className="mx-auto mt-4 max-w-md text-xs text-muted">
                Rezultat orientativ, generat automat pe baza răspunsurilor tale. Nu este un diagnostic medical.
              </p>
            </div>

            {/* Risks — or the all-clear block when nothing fired */}
            {result.risks.length > 0 ? (
              <div className="mt-8">
                <h2
                  className="text-xl font-semibold text-[var(--color-quiz-navy)] sm:text-2xl"
                  style={{ fontFamily: "var(--font-quiz-serif)" }}
                >
                  {quiz.result.risksHeading}
                </h2>
                <p className="mt-2 text-sm text-muted">{quiz.result.risksSub}</p>
                <div className="mt-5 grid gap-4">
                  {result.risks.map((risk, i) => {
                    const major = i < MAJOR_RISKS;
                    return (
                      <div
                        key={i}
                        className={`rounded-2xl border border-l-4 border-line bg-white p-5 shadow-sm sm:p-6 ${
                          major ? "border-l-[#EF4444]" : "border-l-[#F59E0B]"
                        }`}
                      >
                        <p
                          className={`font-heading text-[11px] font-extrabold uppercase tracking-[0.11em] ${
                            major ? "text-[#B91C1C]" : "text-[#B45309]"
                          }`}
                        >
                          {major ? "Risc major" : "Risc secundar"}
                        </p>
                        <h3 className="mt-2 font-heading font-semibold text-[var(--color-quiz-navy)]">{risk.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">{risk.text}</p>
                      </div>
                    );
                  })}
                </div>
                <p
                  className="mt-5 rounded-2xl bg-[var(--color-quiz-accent-soft)] p-5 text-sm leading-relaxed text-[var(--color-quiz-navy)]"
                  // Client copy, imported verbatim from their HTML — carries a
                  // single <strong>. Not user input; no untrusted markup here.
                  dangerouslySetInnerHTML={{ __html: quiz.result.closing }}
                />
              </div>
            ) : (
              <div className="mt-8">
                <h2
                  className="text-xl font-semibold text-[var(--color-quiz-navy)] sm:text-2xl"
                  style={{ fontFamily: "var(--font-quiz-serif)" }}
                >
                  {quiz.result.goodHeading}
                </h2>
                <div className="mt-4 rounded-2xl border border-l-4 border-line border-l-[#10B981] bg-white p-6 shadow-sm sm:p-8">
                  <p className="text-muted">{quiz.result.goodText}</p>
                </div>
              </div>
            )}

            {/* The CTA — copy varies with the declared urgency */}
            <div className="mt-8 overflow-hidden rounded-2xl bg-[image:var(--color-quiz-gradient)] p-7 text-center text-white shadow-lg sm:p-10">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-quiz-tan)]">
                {quiz.cta.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl" style={{ fontFamily: "var(--font-quiz-serif)" }}>
                {cta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-white/85">{cta.text}</p>
              <Link
                href={quiz.cta.lp}
                className="mt-7 inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[var(--color-quiz-accent)] shadow-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {cta.button}
              </Link>
            </div>

            <p className="mt-6 text-center text-xs leading-relaxed text-muted">{quiz.legal}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/** A circular gauge showing the grade out of 10, tinted by the band. */
function ScoreRing({ grade, color }: { grade: number; color: string }) {
  const size = 168;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, grade / 10));

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-line)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-semibold" style={{ fontFamily: "var(--font-quiz-serif)", color }}>
          {grade.toFixed(1)}
        </span>
        <span className="text-sm font-medium text-muted">din 10</span>
      </div>
    </div>
  );
}
