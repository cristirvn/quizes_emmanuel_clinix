/**
 * Shared site copy: navigation, the 7 homepage sections (exact text from
 * guide §3), team/technology page copy (§9/§10), and the footer.
 *
 * `[PLACEHOLDER]` marks client-specific facts to swap before launch:
 * social-proof numbers and the 3 homepage testimonials must be real and
 * consented (guide §3.5).
 */

// ─────────────────────────────── Navigation ───────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export const nav = {
  /** Primary header CTA — the single funnel action (into the quiz). */
  cta: "Începe evaluarea →",
  /**
   * Full site IA (the pages now exist). "Landing Pages" is intentionally NOT in
   * the nav — those are campaign destinations, not navigation items.
   */
  links: [
    { label: "Servicii", href: "/servicii" },
    { label: "Chestionare", href: "/chestionare" },
    { label: "Despre noi", href: "/despre-noi" },
    { label: "Echipă", href: "/echipa" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
};

// ───────────────────────────── 3.2 Hero section ───────────────────────────

export const hero = {
  eyebrow: "Clinică de Neuroștiință · București și Londra",
  /**
   * Curiosity hook (client texts) — opens the loop the quiz closes. It never
   * lists the conditions we treat and never mentions the treatment; its only job
   * is to make the visitor want to find out what's in their own brain.
   */
  h1Lines: ["Toate problemele pornesc din creier.", "Află ce se ascunde în al tău."],
  subtitle:
    "Răspunde la 4–5 întrebări scurte și îți spunem exact ce se întâmplă — și dacă te putem ajuta să corectăm.",
  cta: "Începe evaluarea gratuită →",
  /** Micro-reassurance under the single CTA. */
  reassurance: "2–3 minute · Confidențial · Fără spam",
};

// ───────────────────── "Ce este un Brain Map" (discovery) ───────────────────

/**
 * The homepage's main content block. It explains ONLY the Brain Map / discovery
 * — never the treatment protocol (neurofeedback sessions, healing steps), which
 * belongs to the page after the quiz. Three numbered steps (01/02/03) →
 * qEEG mapping → comparison with clinical norms → an understandable report.
 */
export const brainMap = {
  eyebrow: "Descoperă-ți creierul",
  title: "Un Brain Map îți arată, cu date, ce se întâmplă în creierul tău.",
  /** Opening paragraph above the three steps (client texts). */
  opening:
    "Nu presupuneri, nu impresii. O înregistrare de 30 de minute, comparată cu norme clinice validate — și un răspuns clar la întrebarea „de ce mă simt așa?”",
  steps: [
    {
      title: "Cartografiere (qEEG)",
      description:
        "Citim activitatea electrică a creierului tău, în timp real, complet non-invaziv. Fără radiații și fără durere.",
    },
    {
      title: "Analiza datelor înregistrate",
      description:
        "Rezultatele tale sunt comparate cu baze de date validate științific, pentru vârsta și profilul tău — nu cu o medie vagă.",
    },
    {
      title: "Raport pe înțelesul tău",
      description:
        "Primești o hartă vizuală clară: ce zone funcționează normal, și ce zone ies din parametri — explicate de expertul din clinică, nu doar scrise pe o foaie.",
    },
  ],
  /** Subtle italic line that implies a treatment exists, without detailing it. */
  afterNote:
    "Dacă harta arată un tipar corectabil, la finalul discuției îți explicăm și care sunt pașii următori.",
  /**
   * Single media block — a real Brain Map report / live analysis, not a clinic
   * tour. [PLACEHOLDER] video (2–4 min: facem un Brain Map, explicăm procesul,
   * analiză live la cameră).
   */
  video: {
    caption: "Așa arată, concret, harta creierului tău.",
    description:
      "Un exemplu real de raport Brain Map — ce înseamnă culorile, ce zone contează, și cum se citește diferența față de normal.",
    src: null as string | null,
  },
};

// ─────────────────── Proof strip (3 discovery cases) ────────────────────────

export interface ProofCase {
  /** One-line, discovery-framed result title. */
  title: string;
  /** Short label (condition) under the video poster. */
  label: string;
  isPlaceholder: boolean;
}

/**
 * Three short proof cases rendered as a calm STATIC grid (no carousel — premium
 * rule). [PLACEHOLDER] — the client flagged these will change once real
 * testimonials / case-study videos are ready.
 */
export const proofStrip = {
  title: "Trei hărți. Trei răspunsuri clare.",
  cases: [
    {
      title: "Harta lui Maria a arătat exact de ce migrenele nu răspundeau la medicamente.",
      label: "Migrene cronice",
      isPlaceholder: true,
    },
    {
      title: "Harta lui Radu a confirmat un tipar de anxietate corectabil, nu doar „stres”.",
      label: "Anxietate",
      isPlaceholder: true,
    },
    {
      title: "Harta băiatului Andreei a arătat clar sursa lipsei de concentrare.",
      label: "Concentrare — copil",
      isPlaceholder: true,
    },
  ] satisfies ProofCase[],
};

// ─────────────────────── Reassurance (urgency band) ─────────────────────────

/** Mid-page conversion nudge (client texts). */
export const reassurance = {
  titleLines: ["Cei mai mulți amână.", "Până nu mai au de ales."],
  text: "Un tipar cerebral nu dispare de la sine — cu timpul se adâncește, și devine tot mai greu de corectat.",
  cta: "Începe evaluarea gratuită →",
};

// ─────────────────────── Story teaser (bunica) ──────────────────────────────

/**
 * Condensed origin story on the homepage. The full narrative lives on the
 * future Despre-noi page; the "read the full story" link points there (see
 * StorySection — currently routed to /echipa until that page ships).
 */
export const story = {
  eyebrow: "De ce există Emmanuel CliniX",
  title: "O poveste simplă, despre o bunică.",
  paragraphs: [
    "Cu câțiva ani în urmă, o femeie în vârstă a început să uite lucruri mici. Apoi din ce în ce mai multe. Medicii au numit-o demență și au spus că nu prea mai e ce face.",
    "Nepotul ei nu s-a împăcat cu ideea asta. A căutat, a citit, a întrebat. Așa a ajuns la neurofeedback și brain mapping. A încercat, pentru ea. Și a mers.",
    "Nu s-a gândit atunci la nicio clinică. Doar la faptul că, dacă a funcționat pentru ea, poate ajuta și pe altcineva.",
    "Nepotul acela e Dr. Cristian Cotorceanu. Bunica lui a fost primul pacient, cu mult înainte să existe un nume pe ușă. Așa a apărut Emmanuel CliniX.",
  ],
  more: { label: "Află toată povestea", href: "/despre-noi" },
};

// ───────────────────────── Home FAQ (accordion) ─────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * [PLACEHOLDER] — the client's texts list "Întrebări frecvente (dropdown)"
 * without the items, so these are seeded and must be validated by
 * Dr. Cotorceanu before launch.
 */
export const homeFaq = {
  title: "Întrebări frecvente",
  items: [
    {
      question: "Cât durează evaluarea online?",
      answer:
        "2–3 minute. Răspunzi la câteva întrebări scurte, iar la final îți spunem, orientativ, ce pare să descrie cel mai bine ce simți — și dacă te putem ajuta.",
    },
    {
      question: "Ce este mai exact un Brain Map?",
      answer:
        "Este o înregistrare qEEG de aproximativ 30 de minute a activității electrice a creierului tău, comparată cu norme clinice validate pentru vârsta ta. Rezultatul este o hartă clară a zonelor care funcționează normal și a celor care ies din parametri.",
    },
    {
      question: "Doare sau este invaziv?",
      answer:
        "Nu. Senzorii doar citesc activitatea electrică a creierului — nu transmit nimic către el. Fără curent, fără radiații, fără medicamente, fără durere.",
    },
    {
      question: "Cât costă și mă obligă la ceva?",
      answer:
        "Evaluarea online este gratuită și nu te obligă la nimic. Dacă în urma ei decizi să faci un Brain Map în clinică, îți spunem clar costul și pașii, înainte de orice programare.",
    },
    {
      question: "Pentru cine este potrivit?",
      answer:
        "Pentru migrene, anxietate, insomnie, probleme de concentrare, oboseală cronică și altele. Dacă un caz nu se pretează la neurofeedback, îți spunem asta onest, din prima discuție.",
    },
  ] satisfies FaqItem[],
};

// ───────────────────────────── 3.5 Testimonials ────────────────────────────

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
  isPlaceholder: boolean;
}

/**
 * [PLACEHOLDER] — real, consented testimonials only (guide §3.5). Reframed on
 * the DISCOVERY theme ("harta lui X a arătat…"), not the treatment result — the
 * homepage talks only about the Brain Map, never the protocol. Each case appears
 * exactly once on the page.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Harta Mariei a arătat exact zonele suprasolicitate care păreau să-i declanșeze migrenele — prima explicație clară în 12 ani.",
    name: "Maria D.",
    detail: "Migrene cronice",
    isPlaceholder: true,
  },
  {
    quote:
      "Brain Map-ul copilului Andreei a scos la iveală de ce îi era atât de greu să se concentreze la școală.",
    name: "Andreea P.",
    detail: "Dificultăți de concentrare — copil",
    isPlaceholder: true,
  },
  {
    quote:
      "Raportul lui Radu a arătat tiparul din spatele atacurilor de panică și al insomniei — negru pe alb, nu doar o presupunere.",
    name: "Radu M.",
    detail: "Anxietate și insomnie",
    isPlaceholder: true,
  },
];

// ───────────────── Homepage closing CTA + objection-buster stats ────────────

/**
 * The homepage's second/closing CTA (dark section) and the small stats grid
 * beside it — evaluation duration, cost, contact time, engagement — meant to
 * clear the last objections before the click. [PLACEHOLDER] figures.
 */
export const homeFinalCta = {
  eyebrow: "Următorul pas",
  title: "Nu ești sigur ce ți se potrivește? Hai să aflăm împreună.",
  text: "Răspunde la câteva întrebări scurte, noi analizăm informațiile, și îți oferim o soluție bazată pe răspunsurile tale.",
  button: "Începe evaluarea gratuită →",
  stats: [
    { value: "2–3 minute", label: "Durata evaluării" },
    { value: "Gratuit", label: "Cost" },
    { value: "Niciunul", label: "Angajament" },
  ],
};

// ─────────────────────────── WhatsApp float ─────────────────────────────────

/**
 * Discreet site-wide WhatsApp action (client ask). Uses the clinic's main
 * phone number — international format, digits only, no "+" (wa.me requirement).
 */
export const whatsapp = {
  href: "https://wa.me/40790099070",
  label: "Ai întrebări?",
  aria: "Scrie-ne pe WhatsApp",
};

// ──────────────────────────── 3.7 Lead form ────────────────────────────────

export const leadForm = {
  /** Anchor target — Hero CTA + sticky CTA scroll here on the homepage. */
  id: "formular",
  title: "Completează formularul. Te sunăm noi.",
  text: "Lasă-ne datele tale și te contactăm în 24 de ore pentru o discuție scurtă. Fără obligații, fără costuri.",
  fields: {
    name: { label: "Nume complet", required: true },
    phone: { label: "Telefon", required: true },
  },
  submit: "Trimite — Te sunăm noi",
  note: "Datele tale sunt confidențiale. Nu trimitem spam.",
};

// ─────────────────────────── §9 Echipa page copy ───────────────────────────

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  /** Areas of focus — short chips. */
  tags: string[];
  photo: string | null; // [PLACEHOLDER] — client professional photo
  isFounder?: boolean;
}

/**
 * Echipa page (§9). Roster adapted from the client's live site
 * (emmanuel-clinix.ro/echipa-emmanuel-clinix). Photos are [PLACEHOLDER] until
 * the client provides them; we show brand-geometry initials, never stock people.
 */
export const team = {
  hero: {
    eyebrow: "Echipa",
    title: "Specialiști dedicați sănătății tale cognitive și emoționale",
    subtitle:
      "Fiecare specialist îmbină pregătirea academică riguroasă cu experiența clinică aplicată și pasiunea autentică pentru neurotehnologie — construim împreună planuri terapeutice personalizate, bazate pe evaluări obiective.",
  },
  members: [
    {
      name: "Dr. Cristian Cotorceanu",
      title: "Fondator · Specialist Longevity & Neurofeedback, Neuromodulație, qEEG",
      bio: "Fondatorul Emmanuel CliniX și specialist în longevity, neurofeedback și biohacking. Parcursul său a pornit dintr-o dorință profundă de a ajuta, transformând o experiență personală într-o misiune dedicată sănătății integrative. Abordarea sa combină știința, tehnologia și empatia, oferind programe personalizate pentru echilibru mental, fizic și emoțional.",
      tags: ["Neurofeedback & BrainMap", "Longevity & Biohacking", "Nutriție integrativă", "Optimizare cognitivă"],
      photo: null,
      isFounder: true,
    },
    {
      name: "Patricia Cihodaru",
      title: "Psiholog & Psihoterapeut",
      bio: "Psiholog și psihoterapeut, cu o experiență de peste 20 de ani în psihoterapie. Abordează terapia dintr-o perspectivă holistică, integrând metode experiențiale, cognitiv-comportamentale și transpersonale. Lucrează cu adulți, copii și adolescenți, susținând vindecarea emoțională și dezvoltarea personală într-un cadru sigur și empatic.",
      tags: ["Psihoterapie experiențială", "Terapie cognitiv-comportamentală (CBT)", "Psihoterapie transpersonală", "Inteligență emoțională"],
      photo: null,
    },
    {
      name: "Dr. Cristian Petrescu",
      title: "Medic Specialist Psihiatrie",
      bio: "Medic specialist psihiatru, cu formare clinică solidă și activitate academică susținută. Abordarea sa pune accent pe înțelegerea profundă a pacientului, dincolo de diagnostic, integrând dimensiunea emoțională, relațională și funcțională într-un demers terapeutic personalizat.",
      tags: ["Psihiatrie clinică", "Evaluare și diagnostic", "Reglare emoțională", "Echilibru funcțional"],
      photo: null,
    },
    {
      name: "Dr. Ticiu Ilie-Andrei",
      title: "Medic Specialist Acupunctură Medicală",
      bio: "Integrează acupunctura medicală într-un concept modern de reglare și optimizare a funcției cerebrale. Combină această metodă cu BrainMapping, Neurofeedback și Fotobiomodulare pentru echilibrarea sistemului nervos, reducerea stresului și anxietății, îmbunătățirea somnului și recuperarea în durere cronică.",
      tags: ["Acupunctură medicală", "Reglarea sistemului nervos", "Somn și anxietate", "Durere cronică"],
      photo: null,
    },
    {
      name: "Aniela Sîrcu",
      title: "Psiholog & Psihoterapeut",
      bio: "Psiholog cu formare în psihoterapie cognitiv-comportamentală, psihoterapie de cuplu și familie și sexologie. Cu o experiență de 20 de ani, lucrează cu adolescenți, adulți și cupluri, într-o abordare centrată pe eficiență, echilibru emoțional și dezvoltarea resurselor personale.",
      tags: ["Psihoterapie cognitiv-comportamentală", "Psihoterapie de cuplu și familie", "Sexologie", "Dezvoltare personală"],
      photo: null,
    },
    {
      name: "Tatiana Dogaru",
      title: "Psiholog · Terapeut Neurofeedback",
      bio: "Absolventă de Psihologie, își continuă formarea prin master în Criminalistică și pregătire în Psihologie Judiciară. Cu experiență ca terapeut neurofeedback, îmbină interesul pentru neuroștiințe, tehnologie și evaluare psihologică într-o abordare analitică asupra comportamentului uman.",
      tags: ["Neurofeedback", "Psihologie judiciară", "Evaluare comportamentală", "Dezvoltare personală"],
      photo: null,
    },
    {
      name: "Cristina Ciobanu",
      title: "Aromaterapeut Certificat",
      bio: "Abordează aromaterapia într-un mod integrativ, inspirat din Medicina Tradițională Chineză, susținând echilibrul emoțional și energetic al organismului. Lucrează cu protocoale personalizate bazate pe evaluare holistică, folosind uleiuri esențiale adaptate nevoilor fiecărei persoane.",
      tags: ["Aromaterapie personalizată", "Echilibru emoțional", "Medicină tradițională chineză", "Reglare energetică"],
      photo: null,
    },
  ] satisfies TeamMember[],
  cta: {
    title: "Vrei să discuți cu echipa noastră?",
    text: "Programează o evaluare inițială gratuită. Discutăm situația ta și îți spunem onest dacă te putem ajuta.",
    button: "Începe evaluarea gratuită →",
  },
};

// ───────────────────────── §10 Tehnologie page copy ────────────────────────

export const technology = {
  hero: {
    eyebrow: "Tehnologie",
    title: "Cum funcționează brain mapping-ul și neurofeedback-ul",
    subtitle:
      "Nu ghicim ce nu funcționează în creierul tău. Îl măsurăm — și apoi îl antrenăm.",
  },
  /** Accessible explainer of qEEG / Brain Mapping (guide §10). */
  intro: {
    title: "Ce este qEEG (Brain Mapping)",
    paragraphs: [
      "qEEG (electroencefalografie cantitativă), sau „brain mapping”, este o metodă prin care înregistrăm activitatea electrică a creierului tău și o comparăm cu valorile normale pentru vârsta ta. Rezultatul este o hartă care arată exact ce zone funcționează sub sau peste parametrii normali.",
      "Pe baza acestei hărți construim un protocol de neurofeedback — un antrenament prin care creierul învață, treptat, să-și regleze singur activitatea. Este non-invaziv, nedureros și nu folosește medicamente.",
    ],
  },
  /** Technical videos — one per equipment type / process step. [PLACEHOLDER]. */
  videos: [] as { title: string; description: string; src: string | null }[],
  safety: {
    title: "Este sigur?",
    paragraphs: [
      "Da. Neurofeedback-ul este non-invaziv: senzorii doar citesc activitatea electrică a creierului, nu transmit nimic către el. Nu există curent, nu există substanțe.",
      "Procedura este folosită inclusiv la copii și este nedureroasă. La evaluarea inițială discutăm orice îngrijorare specifică situației tale sau a copilului tău.",
    ],
  },
  faq: [
    {
      question: "Doare?",
      answer:
        "Nu. Senzorii doar citesc activitatea electrică a creierului. Nu simți nimic în timpul ședinței.",
    },
    {
      question: "Cât durează o ședință?",
      answer:
        "În general 30-45 de minute. Numărul total de ședințe depinde de problemă și de cât de repede răspunde creierul tău.",
    },
    {
      question: "Există efecte secundare?",
      answer:
        "Neurofeedback-ul este non-invaziv și nu folosește medicamente, deci nu are efectele secundare ale tratamentului medicamentos. Orice reacție o monitorizăm la fiecare ședință.",
    },
  ],
  cta: {
    title: "Vrei să vezi ce arată harta creierului tău?",
    text: "Programează o evaluare inițială gratuită. Discutăm situația ta și îți spunem onest dacă te putem ajuta.",
    button: "Programează o evaluare →",
  },
};

// ────────────────────────────── Hub (§8) copy ──────────────────────────────

export const hub = {
  hero: {
    eyebrow: "Toate problemele tratate",
    title: "Toate problemele pe care le tratăm",
    subtitle:
      "15 probleme, grupate pe 5 categorii. Găsește-o pe a ta și află cum o abordăm.",
  },
  ctaFinal: {
    title: "Nu ești sigur care problemă se aplică la tine?",
    text: "Programează o evaluare gratuită și discutăm împreună ce te preocupă.",
    button: "Programează o evaluare gratuită →",
  },
};

// ──────────────────────────── §14 Thank-you copy ───────────────────────────

export const thankYou = {
  title: "Am primit datele tale.",
  text: "Te sunăm în maxim 24 de ore.",
  back: { label: "Înapoi la pagina principală", href: "/" },
};

// ───────────────────────────────── Footer ──────────────────────────────────

export const footer = {
  tagline: "Longevity. Wellness. Neuro.",
  description: "Clinică de neuroștiință aplicată din București.",
  /**
   * The trust + condition links removed from the header/mega-menu live here now,
   * so the homepage still links internally to the team, tech, hub and the 15
   * landings (SEO link equity).
   */
  columns: [
    {
      title: "Clinică",
      links: [
        { label: "Servicii", href: "/servicii" },
        { label: "Chestionare", href: "/chestionare" },
        { label: "Despre noi", href: "/despre-noi" },
        { label: "Echipă", href: "/echipa" },
        { label: "Tehnologie", href: "/tehnologie" },
        { label: "Contact", href: "/contact" },
      ] satisfies NavLink[],
    },
    {
      title: "Ce tratăm",
      links: [
        { label: "Migrene cronice", href: "/migrene" },
        { label: "Anxietate", href: "/anxietate" },
        { label: "Insomnie", href: "/insomnie" },
        { label: "ADHD", href: "/adhd" },
        { label: "Burnout", href: "/burnout" },
        { label: "Toate cele 15 probleme →", href: "/afectiuni" },
      ] satisfies NavLink[],
    },
  ],
  /** Real clinic contact details (from the client's live site). Email unconfirmed. */
  contact: {
    address: "Str. Pictor Alexandru Romano nr. 26, 030167 București",
    phone: "+40 790 099 070",
    email: "contact@emmanuelclinix.ro",
  },
};
