/**
 * "Chestionare" page copy — the hub of the funnel.
 *
 * The tab lists the client's nine self-assessment tests
 * (`content/scored-quizzes.ts`); each card opens `/chestionare/<slug>`, where
 * the visitor answers every question, says how urgently they want it solved,
 * leaves name + phone + email behind the consent gate, and gets a grade (1–10),
 * the risks their answers indicate, and a CTA into the matching campaign LP.
 *
 * Card order mirrors the triage question on `/evaluare` (the Aug 2026 brief's
 * Î1), so someone who bounces between the two sees the same list in the same
 * order. Descriptions are in the patient's words — never clinic jargon.
 */

import { scoredQuizzes, type ScoredQuizSlug } from "@/content/scored-quizzes";

export interface ChestionarCard {
  /** A `content/scored-quizzes.ts` slug → `/chestionare/<slug>`. */
  slug: ScoredQuizSlug;
  /** Who the test is for. */
  audience: string;
  title: string;
  /** The symptoms, in the patient's own words — never clinic jargon. */
  description: string;
}

export const chestionare = {
  hero: {
    eyebrow: "Chestionare",
    title: "Află unde stai, de fapt.",
    subtitle:
      "Alege testul care te descrie cel mai bine. La final primești o notă de la 1 la 10 și riscurile concrete pe care le indică răspunsurile tale.",
  },
  /** The promise, restated as three scannable facts above the cards. */
  promise: [
    { label: "2–3 minute", text: "Întrebări scurte, cu variante clare de răspuns." },
    { label: "O notă de la 1 la 10", text: "Vezi exact cât de serioasă e situația ta acum." },
    { label: "Riscuri explicate", text: "Ce arată răspunsurile tale, pe înțelesul tuturor." },
  ],
  cards: [
    {
      slug: "anxietate",
      audience: "Pentru tine",
      title: "Nivelul de anxietate",
      description:
        "Îngrijorare care nu se oprește și tensiune în corp — mintea rămâne în alertă chiar și când nu e niciun pericol.",
    },
    {
      slug: "panica",
      audience: "Pentru tine",
      title: "Atacurile de panică",
      description:
        "Episoade în care inima o ia razna și aerul nu ajunge, analize care ies bune — și teama că urmează încă unul.",
    },
    {
      slug: "somn",
      audience: "Pentru tine",
      title: "Calitatea somnului",
      description:
        "Adormi greu, te trezești noaptea sau prea devreme, iar dimineața ești mai obosit decât seara.",
    },
    {
      slug: "burnout",
      audience: "Pentru tine",
      title: "Epuizarea profesională",
      description:
        "Munca ți-a golit rezervorul: nu te mai reface nici weekendul și te trezești deja obosit.",
    },
    {
      slug: "focus",
      audience: "Pentru tine",
      title: "Focus și productivitate",
      description:
        "Minte încețoșată, amâni ce e important, sari de la una la alta — și simți că îți irosești potențialul.",
    },
    {
      slug: "dispozitie",
      audience: "Pentru tine",
      title: "Starea de spirit și energia",
      description:
        "Nu mai ai chef de nimic, nu te mai bucuri de ce îți plăcea, iar energia a scăzut fără un motiv clar.",
    },
    {
      slug: "migrene",
      audience: "Pentru tine",
      title: "Dureri de cap și migrene",
      description:
        "Dureri de cap frecvente sau migrene care îți taie zile întregi și te fac să trăiești cu analgezice la îndemână.",
    },
    {
      slug: "stres",
      audience: "Pentru tine",
      title: "Nivelul de stres",
      description:
        "Presiune constantă, nervi întinși, corpul care nu se mai relaxează nici când, teoretic, ai timp liber.",
    },
    {
      slug: "adictii",
      audience: "Pentru tine",
      title: "Dependența de un obicei",
      description:
        "Telefon, jocuri, alcool, țigări, pariuri, cumpărături — un obicei care îți ia mai mult timp și control decât ai vrea.",
    },
  ] satisfies ChestionarCard[],
  /** Fallback for people who don't fit a card — the triage screen at `/evaluare`. */
  general: {
    title: "Nu știi pe care să-l alegi?",
    text: "Spune-ne într-o singură întrebare cu ce te confrunți cel mai des și te trimitem direct la testul potrivit.",
    button: "Ajută-mă să aleg →",
  },
};

/**
 * How many questions a test has, as the visitor counts them — the scored
 * questions PLUS the closing urgency question, matching the count on the test's
 * own intro screen. Read from the quiz itself so it can't drift.
 */
export function questionCount(slug: ScoredQuizSlug): number {
  return scoredQuizzes[slug].questions.length + 1;
}
