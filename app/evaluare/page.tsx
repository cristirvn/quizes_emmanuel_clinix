import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { triaj } from "@/content/triaj";

/**
 * The triage screen — the one destination every CTA on the site points to.
 *
 * It used to host a six-branch adaptive quiz (`components/Quiz.tsx`) that asked
 * four more questions before routing. The Aug 2026 brief replaced that with a
 * single question: the nine self-assessment tests each carry their own question
 * set, scoring, urgency question and consent gate, so anything asked here would
 * be asked again a screen later. This page's whole job is to hand the visitor to
 * the right test in one tap.
 *
 * `components/Quiz.tsx`, `content/quiz.ts`, `content/results.ts` and
 * `/rezultat/[slug]` are intentionally left in place but no longer receive
 * traffic — the adaptive funnel can be switched back on without rebuilding it.
 *
 * Static: no client JS, every option is a plain link.
 */
export const metadata: Metadata = buildMetadata({
  title: triaj.seo.title,
  description: triaj.seo.description,
  path: "/evaluare",
});

export default function EvaluarePage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-[var(--color-quiz-bg)] px-5 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8 text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
            {triaj.eyebrow}
          </p>
          <h1
            className="mt-3 text-2xl font-semibold leading-snug text-[var(--color-quiz-navy)] sm:text-3xl"
            style={{ fontFamily: "var(--font-quiz-serif)" }}
          >
            {triaj.question}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted">{triaj.help}</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-10">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[image:linear-gradient(90deg,var(--color-quiz-tan),var(--color-quiz-teal))]" />

          <ul className="grid gap-3">
            {triaj.options.map((option) => (
              <li key={option.label}>
                <TriajLink label={option.label} slug={option.slug} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted">{triaj.direct.text}</p>
          <Link
            href={triaj.direct.href}
            className="mt-3 inline-flex items-center justify-center rounded-2xl border border-line bg-white px-6 py-3 text-base font-semibold text-navy shadow-sm transition-colors hover:border-[var(--color-quiz-accent)] hover:text-[var(--color-quiz-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-quiz-accent)]"
          >
            {triaj.direct.button}
          </Link>
        </div>
      </div>
    </section>
  );
}

function TriajLink({ label, slug }: { label: string; slug: string }) {
  return (
    <Link
      href={`/chestionare/${slug}`}
      className="flex w-full items-center gap-4 rounded-[18px] border border-[var(--color-quiz-navy)]/[0.13] bg-white/62 px-[18px] py-4 text-left text-[var(--color-quiz-navy)] shadow-sm transition-all duration-200 hover:border-[var(--color-quiz-teal)] hover:bg-[var(--color-quiz-navy)]/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-quiz-teal)]"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-quiz-navy)]/20 bg-white/76" />
      <span className="text-[13.5px] font-semibold uppercase tracking-[0.02em]">{label}</span>
    </Link>
  );
}
