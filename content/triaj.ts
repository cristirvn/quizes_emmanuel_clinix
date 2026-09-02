/**
 * The triage question (Î1) at `/evaluare` — "Cu ce te confrunți cel mai des?".
 *
 * The Aug 2026 brief (`Emmanuel-CliniX_Chestionar_Sinteza-Schimbari.pdf`, §2)
 * collapsed the old six-branch adaptive quiz into a single question: each option
 * hands the visitor straight to the complete test that covers it. The follow-up
 * questions the old branches asked (Î2–Î5) are redundant now — each of the nine
 * tests brings its own question set, scoring, urgency question and consent gate.
 *
 * Nine options, nine tests — one each. Panic attacks used to fold into the
 * anxiety test; the client shipped a dedicated one on 2026-08-28, so the option
 * now routes there. The child (ADHD / autism) branch was removed entirely on
 * 2026-08-29 — see STATUS.md.
 */

import type { ScoredQuizSlug } from "@/content/scored-quizzes";

export interface TriajOption {
  /** The complaint, in the visitor's own words. */
  label: string;
  /** Which test answers it → `/chestionare/<slug>`. */
  slug: ScoredQuizSlug;
}

export const triaj = {
  seo: {
    title: "Cu ce te confrunți? — alege testul potrivit",
    description:
      "Spune-ne într-o singură întrebare ce te deranjează cel mai des și îți dăm testul de auto-evaluare potrivit: o notă de la 1 la 10 și riscurile pe care le indică răspunsurile tale.",
  },
  eyebrow: "Evaluare gratuită",
  question: "Cu ce te confrunți cel mai des?",
  help: "Alege ce te descrie cel mai bine acum. Te ducem direct la testul potrivit — durează 2–3 minute.",
  options: [
    { label: "Anxietate, îngrijorare constantă", slug: "anxietate" },
    { label: "Atacuri de panică", slug: "panica" },
    { label: "Probleme cu somnul — adorm greu sau mă trezesc obosit", slug: "somn" },
    { label: "Epuizare profesională, mă simt ars de muncă", slug: "burnout" },
    { label: "Brain fog — minte încețoșată, concentrare slabă", slug: "focus" },
    { label: "Lipsă de chef, dispoziție scăzută, nu mă mai bucur de nimic", slug: "dispozitie" },
    { label: "Dureri de cap frecvente sau migrene", slug: "migrene" },
    { label: "Stres general, presiune constantă", slug: "stres" },
    { label: "Simt că am pierdut controlul asupra unui obicei (alcool, telefon, jocuri etc.)", slug: "adictii" },
  ] satisfies TriajOption[],
  /** Secondary path for people who'd rather talk than fill in a test. */
  direct: {
    text: "Preferi să vorbești direct cu cineva?",
    button: "Cere să fii sunat →",
    href: "/contact",
  },
};
