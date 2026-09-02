import type { Metadata } from "next";
import Link from "next/link";
import { chestionare, questionCount } from "@/content/chestionare";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Chestionare — află unde stai, de fapt",
  description:
    "Nouă teste de auto-evaluare, în 2–3 minute: anxietate, atacuri de panică, somn, burnout, focus, dispoziție, migrene, stres și dependența de un obicei. La final primești o notă de la 1 la 10 și riscurile pe care le indică răspunsurile tale.",
  path: "/chestionare",
});

/**
 * The Chestionare hub — the funnel's main entry point. Nine cards, one per
 * self-assessment test (`content/scored-quizzes.ts`), each opening
 * `/chestionare/<slug>`. The triage screen (`/evaluare`) sits below for visitors
 * who can't tell which of the nine describes them.
 */
export default function ChestionarePage() {
  return (
    <>
      <PageHero
        eyebrow={chestionare.hero.eyebrow}
        title={chestionare.hero.title}
        subtitle={chestionare.hero.subtitle}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:py-24">
          {/* What every test gives you */}
          <Reveal>
            <ul className="grid gap-6 border-b border-line pb-12 sm:grid-cols-3">
              {chestionare.promise.map((p) => (
                <li key={p.label}>
                  <p className="font-heading text-base font-semibold text-navy">{p.label}</p>
                  <p className="mt-1.5 text-muted">{p.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {chestionare.cards.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 60}>
                <Link
                  href={`/chestionare/${c.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-bone p-7 transition-colors hover:border-[var(--color-quiz-accent)] hover:bg-[var(--color-quiz-accent-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-quiz-accent)] sm:p-8"
                >
                  <p className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-teal-700">
                    {c.audience}
                  </p>
                  <h2 className="mt-3 font-heading text-2xl font-semibold text-navy">{c.title}</h2>
                  <p className="mt-3 flex-1 text-muted">{c.description}</p>
                  <div className="mt-7 flex items-baseline justify-between gap-4">
                    <span className="font-heading text-base font-semibold text-[var(--color-quiz-accent)] transition-colors group-hover:text-navy">
                      Începe testul →
                    </span>
                    <span className="text-sm text-muted">
                      {questionCount(c.slug)} întrebări
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <div className="mt-14 flex flex-col items-center gap-3 rounded-2xl border border-line bg-bone px-6 py-10 text-center">
              <p className="font-heading text-lg font-semibold text-navy">
                {chestionare.general.title}
              </p>
              <p className="max-w-xl text-muted">{chestionare.general.text}</p>
              <Link
                href="/evaluare"
                className="mt-3 inline-flex items-center justify-center rounded-2xl bg-[var(--color-quiz-accent)] px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-quiz-accent-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-quiz-accent)]"
              >
                {chestionare.general.button}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
