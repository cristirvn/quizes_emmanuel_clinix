/**
 * The single adaptive self-evaluation quiz — client's "Chestionar Dinamic"
 * (new_modifications/Chestionar_Dinamic_Workflow_1.pptx). One full-screen funnel
 * at `/evaluare`: a 7-option triage (Î1) fans out into six branches (A–F), each
 * with its own manifestation / duration / history questions, then a SHARED
 * urgency question (lead scoring: HOT / WARM / NURTURE). Every visitor answers
 * 5–6 questions in under two minutes and lands on one of 9 personalized landing
 * pages (`/rezultat/[slug]`).
 *
 * [PLACEHOLDER — de validat clinic] Questions/answers are drafted from the
 * client deck and MUST be reviewed by Dr. Cotorceanu before launch. The quiz is
 * an orientation aid, never a diagnosis.
 *
 * How routing works (see `lib/quiz.ts`):
 *  - Navigation is explicit: an option's `next` points to the following
 *    question. Options with no `next` fall into the shared `tail` (urgency),
 *    after which the lead-capture step appears.
 *  - Outcome (the landing page) is decided by SLUG, not scoring: the LAST
 *    answered option that carries a `slug` wins. So a branch can fix its LP at
 *    Î1 (anxiety, mood, migraines), at Î2 (sleep, exhaustion), or at Î4 with an
 *    Î2 fallback (child ADHD/autism). This mirrors the deck's routing map.
 *  - `branch` (A–F) is set on the Î1 options and carried through for the GHL
 *    `ramura` tag + the GA4 `quiz_step` event.
 *  - `field` on a question is its GoHighLevel custom-field key; the chosen
 *    option's value (slugified label, or `key`) is forwarded on lead submit.
 */

/** A landing-page slug (the quiz outcome). */
export type Slug = string;

/** Lead-scoring tier from the shared urgency question (Î5). */
export type Urgency = "hot" | "warm" | "nurture";

export interface QuizOption {
  /** Patient-language answer. */
  label: string;
  /** Id of the next question. Omit to fall into the shared `tail`. */
  next?: string;
  /**
   * Sets/overrides the outcome landing page. The last answered option carrying
   * a `slug` wins, so a later deciding question can override an earlier
   * provisional assignment (used by the sleep / exhaustion / child branches).
   */
  slug?: Slug;
  /** Branch id (A–F), set on the Î1 triage options → GHL `ramura` + GA4. */
  branch?: string;
  /** Expected total steps for this branch (Î1 options) — drives the progress bar. */
  steps?: number;
  /** Lead-scoring tier, set on the shared urgency (Î5) options. */
  urgency?: Urgency;
  /** Stable value for the GHL custom field (else the label is slugified). */
  key?: string;
  /** "Altele" — reveals an optional free-text field (captured as i*_altele_text). */
  freeText?: boolean;
  /**
   * Only on the Q1 (`domeniu`) options: a URL-friendly key so the Chestionare
   * page can deep-link into the quiz with this domain pre-selected
   * (`/evaluare?topic=<topic>`). See `startFromTopic` in `lib/quiz.ts`.
   */
  topic?: string;
}

export interface QuizQuestion {
  /** Stable, unique id (used for navigation + as the radio group name). */
  id: string;
  text: string;
  /** Optional one-line clarifier under the question. */
  help?: string;
  /** GoHighLevel custom-field key this question's answer maps to. */
  field?: string;
  /** Single-choice answers. */
  options: QuizOption[];
}

export interface Quiz {
  /** Id of the first question. */
  start: string;
  /** All questions, keyed by id. */
  questions: Record<string, QuizQuestion>;
  /** Shared closing questions asked to everyone, in order (urgency). */
  tail: string[];
  /** Always-visible disclaimer. */
  disclaimer: string;
}

export const quiz: Quiz = {
  start: "domeniu",
  disclaimer:
    "Orientativ — câteva întrebări care ne ajută să înțelegem ce ți se potrivește. Nu înlocuiește o evaluare clinică.",
  tail: ["urgenta"],
  questions: {
    // ══ Î1 · TRIAJ — 7 opțiuni, în cuvintele omului ═══════════════════════
    domeniu: {
      id: "domeniu",
      text: "Cu ce te confrunți cel mai des?",
      help: "Alege ce descrie cel mai bine ce te aduce azi la noi. Următoarele întrebări se adaptează la răspunsul tău.",
      field: "domeniu",
      options: [
        {
          label: "Anxietate, îngrijorare constantă",
          branch: "A",
          steps: 5,
          topic: "anxietate",
          next: "a_anx_manifest",
          slug: "anxietate",
          key: "anxietate",
        },
        {
          label: "Atacuri de panică",
          branch: "A",
          steps: 5,
          topic: "panica",
          next: "a_panic_freq",
          slug: "atacuri-panica",
          key: "panica",
        },
        {
          label: "Probleme cu somnul — adorm greu sau mă trezesc obosit",
          branch: "B",
          steps: 5,
          topic: "somn",
          next: "b_manifest",
          key: "somn",
        },
        {
          label: "Epuizare, oboseală constantă, brain fog",
          branch: "C",
          steps: 5,
          topic: "oboseala",
          next: "c_manifest",
          key: "epuizare",
        },
        {
          label: "Lipsă de chef, dispoziție scăzută, nu mă mai bucur de nimic",
          branch: "D",
          steps: 5,
          topic: "dispozitie",
          next: "d_manifest",
          slug: "depresie",
          key: "dispozitie",
        },
        {
          label: "Dureri de cap frecvente sau migrene",
          branch: "E",
          steps: 5,
          topic: "migrene",
          next: "e_frecventa",
          slug: "migrene",
          key: "migrene",
        },
        {
          label: "Copil cu ADHD / Autism (diagnostic sau suspiciune)",
          branch: "F",
          steps: 6,
          topic: "copil",
          next: "f_ingrijorare",
          key: "copil",
        },
      ],
    },

    // ══ RAMURA A · Anxietate & Atacuri de panică ══════════════════════════
    // LP fixat din Î1. Cele două intrări au doar Î2 diferit; Î3 + Î4 comune.
    a_anx_manifest: {
      id: "a_anx_manifest",
      text: "Cum se manifestă cel mai des?",
      field: "i2_manifestare",
      options: [
        { label: "Îngrijorare constantă, minte care nu se oprește", next: "a_durata", key: "ingrijorare" },
        { label: "Tensiune fizică — nod în stomac, umeri încordați", next: "a_durata", key: "tensiune-fizica" },
        { label: "Evit situații, mă retrag", next: "a_durata", key: "evitare" },
        { label: "Somn afectat de gânduri", next: "a_durata", key: "somn-afectat" },
      ],
    },
    a_panic_freq: {
      id: "a_panic_freq",
      text: "Cât de des ai atacuri de panică?",
      field: "i2_manifestare",
      options: [
        { label: "Săptămânal sau mai des", next: "a_durata", key: "saptamanal" },
        { label: "De câteva ori pe lună", next: "a_durata", key: "lunar" },
        { label: "Rar — dar trăiesc cu frica următorului", next: "a_durata", key: "rar-frica" },
        { label: "Am avut unul singur și m-a speriat", next: "a_durata", key: "unul-singur" },
      ],
    },
    a_durata: {
      id: "a_durata",
      text: "De cât timp trăiești cu asta?",
      field: "i3_durata",
      options: [
        { label: "Sub 6 luni", next: "a_istoric", key: "sub-6-luni" },
        { label: "Între 6 luni și 2 ani", next: "a_istoric", key: "6luni-2ani" },
        { label: "Între 2 și 5 ani", next: "a_istoric", key: "2-5ani" },
        { label: "Peste 5 ani", next: "a_istoric", key: "peste-5ani" },
      ],
    },
    a_istoric: {
      id: "a_istoric",
      text: "Ce ai încercat până acum?",
      field: "i4_istoric",
      options: [
        { label: "Medicamente", key: "medicamente" },
        { label: "Psihoterapie", key: "psihoterapie" },
        { label: "Ambele", key: "ambele" },
        { label: "Nimic structurat", key: "nimic" },
        { label: "Altele", key: "altele", freeText: true },
      ],
    },

    // ══ RAMURA B · Somn ═══════════════════════════════════════════════════
    // LP se DECIDE la Î2: insomnie vs. oboseală & brain fog.
    b_manifest: {
      id: "b_manifest",
      text: "Care e cea mai mare problemă cu somnul tău?",
      field: "i2_manifestare",
      options: [
        { label: "Adorm greu — stau ore în pat cu mintea activă", slug: "insomnie", next: "b_durata", key: "adorm-greu" },
        { label: "Mă trezesc noaptea și nu mai adorm", slug: "insomnie", next: "b_durata", key: "treziri" },
        { label: "Dorm suficient, dar mă trezesc obosit", slug: "brain-fog", next: "b_durata", key: "neodihnit" },
        { label: "Program de somn haotic, neregulat", slug: "insomnie", next: "b_durata", key: "haotic" },
      ],
    },
    b_durata: {
      id: "b_durata",
      text: "De cât timp durează problema?",
      field: "i3_durata",
      options: [
        { label: "Sub 3 luni", next: "b_istoric", key: "sub-3-luni" },
        { label: "Între 3 luni și 1 an", next: "b_istoric", key: "3luni-1an" },
        { label: "Între 1 și 3 ani", next: "b_istoric", key: "1-3ani" },
        { label: "Peste 3 ani", next: "b_istoric", key: "peste-3ani" },
      ],
    },
    b_istoric: {
      id: "b_istoric",
      text: "Ce ai încercat până acum?",
      field: "i4_istoric",
      options: [
        { label: "Somnifere sau melatonină", key: "somnifere" },
        { label: "Igiena somnului — reguli, aplicații, suplimente", key: "igiena-somnului" },
        { label: "Ambele", key: "ambele" },
        { label: "Nimic structurat", key: "nimic" },
        { label: "Altele", key: "altele", freeText: true },
      ],
    },

    // ══ RAMURA C · Epuizare & Oboseală ════════════════════════════════════
    // LP se DECIDE la Î2: burnout vs. oboseală & brain fog.
    c_manifest: {
      id: "c_manifest",
      text: "Care te descrie mai bine?",
      field: "i2_manifestare",
      options: [
        { label: "Mă simt ars de muncă sau de stres prelungit", slug: "burnout", next: "c_durata", key: "ars-de-munca" },
        { label: "Obosit mereu, chiar și după somn — fără legătură clară cu munca", slug: "brain-fog", next: "c_durata", key: "obosit-mereu" },
        { label: "Brain fog — minte încețoșată, concentrare slabă", slug: "brain-fog", next: "c_durata", key: "brain-fog" },
        { label: "Toate, combinate", slug: "burnout", next: "c_durata", key: "toate" },
      ],
    },
    c_durata: {
      id: "c_durata",
      text: "De cât timp te simți așa?",
      field: "i3_durata",
      options: [
        { label: "Sub 3 luni", next: "c_istoric", key: "sub-3-luni" },
        { label: "Între 3 luni și 1 an", next: "c_istoric", key: "3luni-1an" },
        { label: "Între 1 și 3 ani", next: "c_istoric", key: "1-3ani" },
        { label: "Peste 3 ani", next: "c_istoric", key: "peste-3ani" },
      ],
    },
    c_istoric: {
      id: "c_istoric",
      text: "Ce ai încercat până acum?",
      field: "i4_istoric",
      options: [
        { label: "Concedii și pauze — revine mereu", key: "concedii" },
        { label: "Suplimente, sport, stil de viață", key: "suplimente" },
        { label: "Terapie sau coaching", key: "terapie" },
        { label: "Nimic structurat", key: "nimic" },
        { label: "Altele", key: "altele", freeText: true },
      ],
    },

    // ══ RAMURA D · Dispoziție & Motivație ═════════════════════════════════
    // LP fixat din Î1 (depresie). Ton atent — sensibilitate maximă pe LP.
    d_manifest: {
      id: "d_manifest",
      text: "Cum arată o zi obișnuită pentru tine?",
      field: "i2_manifestare",
      options: [
        { label: "Nu mai simt plăcere din lucruri care îmi plăceau", next: "d_durata", key: "anhedonie" },
        { label: "Totul pare un efort — amân constant", next: "d_durata", key: "efort-aman" },
        { label: "Tristețe sau gol fără un motiv clar", next: "d_durata", key: "tristete" },
        { label: "Fluctuez — zile ok, zile foarte grele", next: "d_durata", key: "fluctuez" },
      ],
    },
    d_durata: {
      id: "d_durata",
      text: "De cât timp te simți așa?",
      field: "i3_durata",
      options: [
        { label: "Sub 3 luni", next: "d_istoric", key: "sub-3-luni" },
        { label: "Între 3 luni și 1 an", next: "d_istoric", key: "3luni-1an" },
        { label: "Între 1 și 3 ani", next: "d_istoric", key: "1-3ani" },
        { label: "Peste 3 ani", next: "d_istoric", key: "peste-3ani" },
      ],
    },
    d_istoric: {
      id: "d_istoric",
      text: "Ce ai încercat până acum?",
      field: "i4_istoric",
      options: [
        { label: "Antidepresive", key: "antidepresive" },
        { label: "Psihoterapie", key: "psihoterapie" },
        { label: "Sport, rutine, self-help", key: "self-help" },
        { label: "Nimic structurat", key: "nimic" },
        { label: "Altele", key: "altele", freeText: true },
      ],
    },

    // ══ RAMURA E · Migrene & Dureri de cap ════════════════════════════════
    // LP fixat din Î1 (migrene). Î2 setează severitatea, Î3 poziționează qEEG.
    e_frecventa: {
      id: "e_frecventa",
      text: "Cât de des ai dureri de cap?",
      field: "i2_manifestare",
      options: [
        { label: "Zilnic sau aproape zilnic", next: "e_investigatii", key: "zilnic" },
        { label: "De câteva ori pe săptămână", next: "e_investigatii", key: "saptamanal" },
        { label: "Câteva pe lună, dar severe (migrene)", next: "e_investigatii", key: "lunar-severe" },
      ],
    },
    e_investigatii: {
      id: "e_investigatii",
      text: "Ai fost investigat medical?",
      field: "i3_investigatii",
      options: [
        { label: "Da — dar fără un rezultat clar", next: "e_istoric", key: "fara-rezultat" },
        { label: "Da — am diagnostic de migrenă", next: "e_istoric", key: "diagnostic" },
        { label: "Nu, încă nu am făcut investigații", next: "e_istoric", key: "neinvestigat" },
      ],
    },
    e_istoric: {
      id: "e_istoric",
      text: "Ce ai încercat până acum?",
      field: "i4_istoric",
      options: [
        { label: "Analgezice uzuale, la nevoie", key: "analgezice" },
        { label: "Tratament prescris de neurolog", key: "tratament-neurolog" },
        { label: "Ambele", key: "ambele" },
        { label: "Nimic constant", key: "nimic" },
        { label: "Altele", key: "altele", freeText: true },
      ],
    },

    // ══ RAMURA F · Copil — ADHD / Autism ══════════════════════════════════
    // LP se DECIDE la Î4 (diagnostic). Suspiciune / fără diagnostic → cade pe
    // slug-ul provizoriu setat la Î2 (atenție/hiperactiv/emoțional → adhd;
    // dezvoltare → autism-tsa).
    f_ingrijorare: {
      id: "f_ingrijorare",
      text: "Ce vă îngrijorează cel mai mult?",
      field: "i2_manifestare",
      options: [
        { label: "Atenție și concentrare — probleme la școală", slug: "adhd", next: "f_varsta", key: "atentie" },
        { label: "Hiperactivitate, impulsivitate", slug: "adhd", next: "f_varsta", key: "hiperactivitate" },
        { label: "Dificultăți emoționale — anxietate, crize", slug: "adhd", next: "f_varsta", key: "emotional" },
        { label: "Întârzieri în dezvoltare", slug: "autism-tsa", next: "f_varsta", key: "dezvoltare" },
      ],
    },
    f_varsta: {
      id: "f_varsta",
      text: "Ce vârstă are copilul?",
      field: "i3_varsta",
      options: [
        { label: "Sub 6 ani", next: "f_diagnostic", key: "sub-6" },
        { label: "Între 6 și 11 ani", next: "f_diagnostic", key: "6-11" },
        { label: "Între 12 și 17 ani", next: "f_diagnostic", key: "12-17" },
      ],
    },
    f_diagnostic: {
      id: "f_diagnostic",
      text: "Aveți un diagnostic?",
      field: "i4_diagnostic",
      options: [
        { label: "Da — ADHD", slug: "adhd", next: "f_istoric", key: "adhd" },
        { label: "Da — TSA (autism)", slug: "autism-tsa", next: "f_istoric", key: "tsa" },
        // Suspiciune / fără diagnostic: NU setează slug → rămâne cel de la Î2.
        { label: "Suspiciune, fără evaluare formală", next: "f_istoric", key: "suspiciune" },
        { label: "Nu, dar vedem dificultăți clare", next: "f_istoric", key: "fara-diagnostic" },
      ],
    },
    f_istoric: {
      id: "f_istoric",
      text: "Ce ați încercat până acum?",
      field: "i5_istoric",
      options: [
        { label: "Medicație", key: "medicatie" },
        { label: "Terapie (logopedie, ABA, psihoterapie)", key: "terapie" },
        { label: "Ambele", key: "ambele" },
        { label: "Nimic încă — abia începem", key: "nimic" },
        { label: "Altele", key: "altele", freeText: true },
      ],
    },

    // ══ FINAL COMUN · Î5 URGENȚĂ (lead scoring) ═══════════════════════════
    urgenta: {
      id: "urgenta",
      text: "Cât de important e pentru tine să rezolvi asta acum?",
      help: "Ne ajută să știm cât de repede să te contactăm.",
      field: "i5_urgenta",
      options: [
        { label: "Urgent — nu mai pot continua așa", urgency: "hot", key: "hot" },
        { label: "Important — vreau să rezolv în lunile următoare", urgency: "warm", key: "warm" },
        { label: "Deocamdată mă informez", urgency: "nurture", key: "nurture" },
      ],
    },
  },
};
