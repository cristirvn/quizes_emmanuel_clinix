/**
 * Single source of truth for the condition landing pages (17: the original 15
 * plus atacuri-panica and autism-tsa, added as dedicated funnel LPs with the
 * dynamic quiz — see new_modifications/).
 *
 * This one typed array drives: the dynamic landing pages (`/[slug]`), the
 * hub (`/afectiuni`), the "Ce tratăm" mega-menu, the homepage cards, and the
 * internal-link blocks.
 *
 * Authoring status: all 15 conditions are authored in full (Phase 5). ADHD was
 * built first (guide §6) as the proven template; the other 14 follow the same
 * 8-section structure with full Romanian `landing` copy. Real testimonials and
 * client stats remain `[PLACEHOLDER]` until the client provides them.
 *
 * Copy rules (guide §1, §5): speak the patient's language, never lead with
 * "neurofeedback" in an H1, no medical jargon left unexplained.
 */
import type { Category } from "@/lib/slugs";

export interface ConditionSeo {
  /** ≤60 chars — contains the problem + brand/"neurofeedback". */
  title: string;
  /** ≤155 chars — benefit-oriented, click-worthy. */
  description: string;
}

export interface HeroContent {
  eyebrow: string;
  h1: string;
  subtitle: string;
  cta: string;
}

export interface SymptomSection {
  title: string;
  /** 4–6 checklist items ("Te recunoști în asta?"). */
  items: string[];
}

export interface BrainSection {
  title: string;
  /** 2–3 paragraphs — "Ce se întâmplă în creier". */
  paragraphs: string[];
}

export interface ApproachStep {
  title: string;
  description: string;
}

export interface ApproachSection {
  title: string;
  /** The 4 process steps, reframed for this condition. */
  steps: ApproachStep[];
}

export interface ConditionTestimonial {
  quote: string;
  name: string;
  /** e.g. "ADHD la copil — 25 ședințe". */
  detail: string;
  /** Example copy until a real, consented testimonial replaces it. */
  isPlaceholder: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CtaFinal {
  title: string;
  text: string;
  button: string;
}

/** The full 8-section landing content (guide §5/§6). */
export interface ConditionLanding {
  hero: HeroContent;
  symptoms: SymptomSection;
  brain: BrainSection;
  approach: ApproachSection;
  testimonial: ConditionTestimonial;
  faq: FaqItem[];
  /** Heading for the "Probleme conexe" block; links come from `related`. */
  relatedTitle: string;
  ctaFinal: CtaFinal;
}

export interface Condition {
  slug: string;
  category: Category;
  /** Canonical short name — mega-menu + hub rows (guide §8). */
  name: string;
  /** Card title on homepage / featured cards (guide §3.3). */
  cardTitle: string;
  /** 2-sentence card description, patient language. */
  cardDescription: string;
  seo: ConditionSeo;
  /** Slugs of 2–3 related conditions (internal linking, guide §11). */
  related: string[];
  /** Full 8-section landing copy. Authored for all 15 conditions (Phase 5). */
  landing?: ConditionLanding;
}

/** One-line description per category, shown on the hub (guide §8). */
export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  Neurologic: "Afecțiuni legate direct de funcționarea sistemului nervos central.",
  "Psihic & Emoțional":
    "Tipare de reglare emoțională care pot fi corectate prin antrenament cerebral.",
  Somn: "Tranziții cerebrale incorecte între starea de veghe și starea de somn.",
  Cognitiv: "Probleme de atenție, concentrare și funcționare executivă.",
  "Performanță":
    "Optimizare cerebrală pentru cei fără un diagnostic, dar care vor mai mult.",
};

export const conditions: Condition[] = [
  // ───────────────────────────── Neurologic ─────────────────────────────
  {
    slug: "migrene",
    category: "Neurologic",
    name: "Migrene cronice",
    cardTitle: "Migrene cronice",
    cardDescription:
      "Dureri persistente pe care medicamentele nu le mai rezolvă. Neurofeedback-ul corectează tiparele electrice care le declanșează.",
    seo: {
      title: "Tratament migrene fără medicamente | Emmanuel CliniX",
      description:
        "Neurofeedback și brain mapping (qEEG) pentru migrene cronice. Corectăm tiparele electrice care declanșează durerea, fără medicație. Evaluare gratuită.",
    },
    related: ["insomnie", "burnout", "anxietate"],
    landing: {
      hero: {
        eyebrow: "Tratament migrene prin Neurofeedback",
        h1: "Migrenele nu sunt ceva cu care trebuie să te obișnuiești. Sunt un tipar electric pe care creierul îl poate dezvăța.",
        subtitle:
          "Dacă ai încercat deja medicament după medicament și migrenele tot revin, problema nu e că nu te străduiești destul. E un tipar de hiperexcitabilitate în creier, vizibil pe Brain Map (qEEG) — și pe care îl putem reduce prin neurofeedback, fără medicație.",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title:
          "Te recunoști în asta? Semnele pe care le vedem cel mai des la persoanele cu migrene cronice",
        items: [
          "Dureri de cap care revin de mai multe ori pe lună și îți dau viața peste cap",
          "Sensibilitate la lumină, la sunete sau la mirosuri în timpul crizei",
          "Greață sau tulburări de vedere („aura”) înainte de durere",
          "Medicamentele ajută din ce în ce mai puțin, sau le iei prea des",
          "Crizele apar la stres, la oboseală sau înainte de somn",
          "Ți-e teamă constant de următoarea criză și îți planifici viața în jurul ei",
        ],
      },
      brain: {
        title: "Migrena are o semnătură vizibilă în activitatea electrică a creierului",
        paragraphs: [
          "Migrena nu pornește din vasele de sânge, așa cum s-a crezut mult timp, ci dintr-un creier care se „aprinde” prea ușor. La majoritatea persoanelor cu migrene cronice, Brain Map-ul (qEEG) arată zone de hiperexcitabilitate corticală — grupuri de neuroni care trec prea repede într-o stare de suprasolicitare și declanșează cascada care duce la durere.",
          "Neurofeedback-ul lucrează exact pe acest mecanism. Antrenăm creierul să-și mențină un ritm electric mai stabil, astfel încât pragul de la care se declanșează o criză să crească. Nu mascăm durerea, cum fac analgezicele — reducem frecvența și intensitatea crizelor, antrenând creierul să nu mai intre atât de ușor în starea care le provoacă.",
          "Important de știut: neurofeedback-ul nu promite că vei scăpa „garantat” de migrene. Ceea ce urmărim, realist, este o reducere a frecvenței și a intensității crizelor, astfel încât să depinzi mai puțin de calmante și să-ți recapeți controlul asupra zilelor tale. Pentru că pornim de la Brain Map-ul tău, nu de la o rețetă standard, protocolul vizează exact zonele de hiperexcitabilitate identificate la tine, iar harta de control de la fiecare 10 ședințe arată, în date, dacă mergem în direcția bună. Dacă răspunsul nu este cel așteptat, ajustăm sau îți spunem deschis că metoda nu e potrivită pentru cazul tău.",
        ],
      },
      approach: {
        title: "Un protocol construit pe baza hărții cerebrale, nu pe rețete standard",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm istoricul migrenelor tale: cât de des apar, ce le declanșează, ce tratamente ai încercat. Stabilim dacă neurofeedback-ul e potrivit pentru cazul tău.",
          },
          {
            title: "Brain Map (qEEG) specific migrenei",
            description:
              "Cartografiem activitatea electrică și identificăm zonele de hiperexcitabilitate care întrețin crizele. Comparăm cu valorile normale pentru vârsta ta.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe de 30–45 de minute, nedureroase, în care creierul învață treptat să-și mențină un ritm mai stabil. Fără medicamente, fără efecte secundare.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Urmărim frecvența și intensitatea crizelor la fiecare 10 ședințe. Vezi în date, nu în impresii, cum se rărește durerea.",
          },
        ],
      },
      testimonial: {
        quote:
          "Am avut migrene de 12 ani. Am încercat tot ce se putea — pastile, injecții, diete. După 20 de ședințe de neurofeedback, frecvența a scăzut cu aproape 80%. Nu am mai luat un calmant de luni de zile.",
        name: "Maria D.",
        detail: "Migrene cronice — 20 ședințe",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "Neurofeedback-ul chiar funcționează pentru migrene?",
          answer:
            "Neurofeedback-ul este una dintre cele mai studiate aplicații ale acestei metode. Mulți pacienți raportează o scădere clară a frecvenței și intensității crizelor. La evaluarea inițială îți spunem onest, pe baza Brain Map-ului, dacă e potrivit pentru cazul tău.",
        },
        {
          question: "Trebuie să renunț la medicamente?",
          answer:
            "Nu de la început. Continui tratamentul recomandat de medicul tău, iar pe măsură ce crizele se răresc, reducerea medicației se face treptat, sub coordonarea lui. Scopul este să ai nevoie de cât mai puține calmante.",
        },
        {
          question: "În cât timp văd rezultate?",
          answer:
            "Majoritatea pacienților observă o rărire a crizelor după 15–20 de ședințe, dar fiecare creier răspunde în ritmul lui. Brain Map-ul de control îți arată progresul obiectiv.",
        },
        {
          question: "Doare procedura?",
          answer:
            "Deloc. Senzorii doar citesc activitatea electrică a creierului, nu transmit nimic către el. Stai relaxat pe un scaun și nu simți nimic în timpul ședinței.",
        },
        {
          question: "Neurofeedback-ul ajută și la migrenele cu aură?",
          answer:
            "Da. Aura este un semn de hiperexcitabilitate corticală — exact mecanismul pe care îl antrenăm. Mulți pacienți cu migrenă cu aură raportează crize mai rare și mai blânde, însă răspunsul îl evaluăm individual, pe baza Brain Map-ului tău.",
        },
        {
          question: "Câte ședințe sunt necesare pentru migrene?",
          answer:
            "De obicei între 20 și 40 de ședințe, în funcție de vechimea și frecvența crizelor. Repetăm Brain Map-ul de control la fiecare 10 ședințe, ca să vedem obiectiv cum răspunde creierul și să ajustăm protocolul, în loc să fixăm un număr rigid de la început.",
        },
        {
          question: "Rezultatele se mențin după ce termin ședințele?",
          answer:
            "De regulă da, pentru că neurofeedback-ul este un proces de învățare: creierul deprinde un ritm mai stabil și tinde să-l păstreze. La unii pacienți recomandăm câteva ședințe de întreținere, dar scopul este o reducere de durată a crizelor, nu o dependență de ședințe.",
        },
      ],
      relatedTitle: "Vezi și — Probleme conexe care apar frecvent împreună cu migrenele",
      ctaFinal: {
        title: "Vrei să afli dacă putem reduce frecvența migrenelor tale?",
        text: "Programează o evaluare inițială gratuită. Ne uităm la istoricul tău și îți spunem onest dacă neurofeedback-ul te poate ajuta.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },
  {
    slug: "recuperare-avc",
    category: "Neurologic",
    name: "Recuperare post-AVC",
    cardTitle: "Recuperare neurologică",
    cardDescription:
      "Post-AVC, traumatisme craniene, recuperare post-COVID neurologică. Neurofeedback-ul accelerează refacerea circuitelor.",
    seo: {
      title: "Recuperare neurologică post-AVC | Emmanuel CliniX",
      description:
        "Neurofeedback pentru recuperare post-AVC și neurologică. Antrenăm creierul să refacă circuitele afectate, pe baza unei hărți cerebrale. Evaluare gratuită.",
    },
    related: ["traumatisme-craniene", "brain-fog"],
    landing: {
      hero: {
        eyebrow: "Recuperare neurologică prin Neurofeedback",
        h1: "După un AVC, creierul nu rămâne blocat acolo unde l-a lăsat boala. Poate fi antrenat să refacă ce s-a pierdut.",
        subtitle:
          "Creierul are o capacitate remarcabilă de a-și reorganiza circuitele — se numește neuroplasticitate. Neurofeedback-ul ghidează acest proces, antrenând zonele afectate să-și reia treptat funcția, pe baza unei hărți precise a creierului tău (qEEG).",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title:
          "Te recunoști în asta? Dificultăți frecvente după un AVC sau o afecțiune neurologică",
        items: [
          "Oboseală care nu trece, chiar și după odihnă",
          "Dificultăți de concentrare, memorie sau găsire a cuvintelor",
          "Mișcări mai lente sau mai greu de controlat pe o parte a corpului",
          "Schimbări de dispoziție, iritabilitate sau stări depresive de la AVC încoace",
          "Recuperarea „s-a oprit” după primele luni de kinetoterapie",
          "Simți că mintea nu mai funcționează la fel de clar ca înainte",
        ],
      },
      brain: {
        title: "Recuperarea înseamnă să ajuți creierul să-și refacă circuitele",
        paragraphs: [
          "Un AVC sau un traumatism întrerupe circuite din creier, dar zonele învecinate pot prelua, în timp, o parte din funcțiile pierdute. Acest proces de reorganizare se numește neuroplasticitate și este motorul oricărei recuperări. Problema e că, lăsat de la sine, creierul nu știe întotdeauna pe ce să se concentreze.",
          "Aici intervine neurofeedback-ul. Pe baza Brain Map-ului (qEEG), vedem exact ce zone funcționează sub parametri și antrenăm creierul, ședință cu ședință, să-și reactiveze și să-și stabilizeze acele circuite. Este o terapie adjuvantă, care lucrează alături de kinetoterapie și de recomandările medicului neurolog, nu în locul lor.",
          "Fii realist împreună cu noi: amploarea recuperării depinde de zona afectată, de gravitatea evenimentului și de timpul scurs, iar neurofeedback-ul nu „reface” un creier ca și cum nimic nu s-ar fi întâmplat. Ce poate face, ca terapie adjuvantă, este să sprijine neuroplasticitatea și să ajute circuitele învecinate să preia treptat din funcțiile pierdute. Lucrăm întotdeauna alături de medicul neurolog și de kinetoterapeut, nu în locul lor, și pornim de la Brain Map ca să țintim exact zonele care funcționează sub parametri. La fiecare reevaluare vezi în date ce s-a schimbat, iar dacă progresul stagnează, adaptăm protocolul sau îți spunem onest la ce te poți aștepta.",
        ],
      },
      approach: {
        title: "Un plan de recuperare construit pe harta cerebrală actuală",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm istoricul medical, momentul evenimentului și obiectivele tale de recuperare. Stabilim, alături de ce recomandă neurologul, dacă neurofeedback-ul te poate ajuta.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Cartografiem activitatea electrică și identificăm zonele afectate și pe cele care pot prelua funcția. Comparăm cu valorile normale pentru vârsta ta.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe nedureroase în care antrenăm țintit circuitele afectate. Protocolul se ajustează pe măsură ce creierul răspunde.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Reevaluăm progresul periodic și adaptăm protocolul. Vezi în date cum se reactivează zonele afectate.",
          },
        ],
      },
      testimonial: {
        quote:
          "După AVC, tata recuperase fizic, dar mintea îi rămăsese „în ceață” — uita cuvinte, obosea repede. După câteva luni de neurofeedback, a început din nou să citească ziarul și să poarte conversații lungi. Pentru noi a fost enorm.",
        name: "Elena V.",
        detail: "fiica unui pacient post-AVC — 30 ședințe",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "Neurofeedback-ul înlocuiește kinetoterapia sau tratamentul neurologic?",
          answer:
            "Nu. Este o terapie adjuvantă, care lucrează alături de recomandările medicului tău și de kinetoterapie. Coordonăm întotdeauna abordarea cu echipa medicală care te urmărește.",
        },
        {
          question: "Cât de târziu după AVC mai are sens să începem?",
          answer:
            "Neuroplasticitatea rămâne activă mult timp după faza acută. Mulți pacienți obțin progrese chiar și atunci când recuperarea „s-a oprit” după primele luni. La evaluare îți spunem realist la ce te poți aștepta.",
        },
        {
          question: "Ce tip de îmbunătățiri sunt posibile?",
          answer:
            "Cel mai des, pacienții raportează mai multă claritate mentală, concentrare și energie, somn mai bun și o dispoziție mai stabilă. Rezultatele depind de zonele afectate și se urmăresc obiectiv pe Brain Map.",
        },
        {
          question: "Procedura este sigură pentru cineva fragil după un AVC?",
          answer:
            "Da. Neurofeedback-ul este non-invaziv: senzorii doar citesc activitatea creierului, nu transmit curent. Ședințele sunt scurte și se adaptează la nivelul de oboseală al pacientului.",
        },
        {
          question: "De la ce interval după AVC putem începe?",
          answer:
            "În general după ce faza acută a trecut și starea pacientului este stabilă, cu acordul medicului neurolog. Nu există un „prea târziu” strict — neuroplasticitatea rămâne activă mult timp — dar momentul potrivit îl stabilim împreună cu echipa medicală care urmărește pacientul.",
        },
        {
          question: "Câte ședințe presupune un program de recuperare?",
          answer:
            "Recuperarea neurologică cere de obicei mai multe ședințe decât alte afecțiuni, iar durata depinde de zonele afectate și de obiective. Reevaluăm periodic pe Brain Map și adaptăm protocolul, păstrând legătura cu medicul și cu kinetoterapeutul.",
        },
        {
          question: "Ședințele se fac la clinică sau acasă?",
          answer:
            "Evaluarea, Brain Map-ul și ședințele se desfășoară la clinică, sub supraveghere. Pentru pacienții cu mobilitate redusă, organizăm programul ținând cont de nivelul lor de oboseală și de recomandările medicale.",
        },
      ],
      relatedTitle: "Vezi și — Probleme conexe în recuperarea neurologică",
      ctaFinal: {
        title: "Vrei să afli dacă putem sprijini recuperarea?",
        text: "Programează o evaluare inițială gratuită. Ne uităm la situația medicală și îți spunem onest, alături de ce recomandă neurologul, cum te putem ajuta.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },
  {
    slug: "traumatisme-craniene",
    category: "Neurologic",
    name: "Traumatisme craniene",
    cardTitle: "Traumatisme craniene",
    cardDescription:
      "Efecte persistente după o lovitură la cap: oboseală, ceață mentală, dificultăți de concentrare. Creierul poate fi reantrenat.",
    seo: {
      title: "Recuperare după traumatisme craniene | Emmanuel CliniX",
      description:
        "Neurofeedback pentru efectele de durată ale traumatismelor craniene. Reantrenăm circuitele afectate pe baza hărții cerebrale qEEG. Evaluare gratuită.",
    },
    related: ["recuperare-avc", "brain-fog"],
    landing: {
      hero: {
        eyebrow: "Recuperare după traumatisme craniene prin Neurofeedback",
        h1: "După o lovitură la cap, „totul pare normal la analize” — dar tu simți că nu mai ești la fel. Nu e în capul tău. E în creierul tău, și se poate corecta.",
        subtitle:
          "Multe simptome care persistă după un traumatism cranian — oboseală, ceață mentală, iritabilitate, dureri de cap — nu apar pe RMN sau CT, dar sunt vizibile pe Brain Map (qEEG). Neurofeedback-ul antrenează creierul să-și refacă tiparele de funcționare normale.",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title: "Te recunoști în asta? Simptome care persistă după un traumatism cranian",
        items: [
          "Oboseală și epuizare care nu trec, chiar și după somn",
          "Ceață mentală, dificultăți de concentrare și de memorie",
          "Dureri de cap frecvente de la accident încoace",
          "Iritabilitate, schimbări de dispoziție, toleranță scăzută la stres",
          "Sensibilitate la lumină, la zgomot sau amețeli",
          "„Analizele sunt normale”, dar tu știi că ceva s-a schimbat",
        ],
      },
      brain: {
        title: "De ce simptomele persistă chiar dacă imagistica e „normală”",
        paragraphs: [
          "Un traumatism cranian, chiar și ușor (o comoție), poate perturba modul în care comunică între ele rețelele de neuroni — fără să lase o leziune vizibilă pe RMN sau CT. De aceea mulți pacienți aud că „totul e în regulă”, deși simptomele sunt foarte reale. Aceste perturbări de comunicare se văd, în schimb, clar pe Brain Map (qEEG).",
          "Neurofeedback-ul lucrează exact pe aceste tipare disfuncționale. Antrenăm creierul să revină la ritmuri electrice mai apropiate de cele normale, ajutând rețelele afectate să-și recapete coordonarea. Pe măsură ce tiparele se normalizează, simptomele — oboseala, ceața mentală, iritabilitatea — se reduc.",
          "De multe ori, cel mai greu lucru după un traumatism este că ceilalți nu „văd” nimic: analizele ies normale, iar tu ești lăsat cu senzația că exagerezi. Brain Map-ul (qEEG) schimbă asta — pune pe hârtie tiparele perturbate care îți explică oboseala, ceața mentală și iritabilitatea, validând faptul că simptomele sunt reale. Pe baza lor construim un protocol care antrenează creierul să revină la ritmuri mai apropiate de normal. Nu promitem un rezultat garantat, dar mulți pacienți raportează îmbunătățiri pe care le urmărim obiectiv, la fiecare 10 ședințe. Dacă bănuim o cauză care cere investigații medicale suplimentare, te îndrumăm către specialistul potrivit.",
        ],
      },
      approach: {
        title: "Un protocol bazat pe ce arată harta creierului tău acum",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm despre accident, despre simptomele care au apărut și despre cum îți afectează viața de zi cu zi. Stabilim dacă neurofeedback-ul e potrivit.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Identificăm tiparele perturbate de traumatism — exact lucrurile pe care imagistica obișnuită nu le arată.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe nedureroase în care creierul învață să-și refacă tiparele normale de funcționare. Fără medicamente.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Reevaluăm la fiecare 10 ședințe și vedem, în date, cum se normalizează activitatea și cum se reduc simptomele.",
          },
        ],
      },
      testimonial: {
        quote:
          "După un accident, am rămas cu o ceață mentală constantă și oboseală de care niciun medic nu părea să-și dea seama. Brain Map-ul a arătat exact ce nu funcționa. După neurofeedback, mi-am recăpătat claritatea și energia.",
        name: "Andrei T.",
        detail: "traumatism cranian ușor — 25 ședințe",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "De ce simptomele mele nu apar pe RMN sau CT?",
          answer:
            "Imagistica clasică arată leziuni structurale, dar multe efecte ale traumatismelor sunt tulburări de funcționare a rețelelor neuronale, nu leziuni vizibile. Acestea se văd pe Brain Map (qEEG), care măsoară activitatea electrică, nu structura.",
        },
        {
          question: "Mai are sens să încep dacă au trecut ani de la accident?",
          answer:
            "Da. Tiparele disfuncționale pot persista mult timp, dar pot fi reantrenate și după ani. La evaluare îți spunem realist la ce te poți aștepta în cazul tău.",
        },
        {
          question: "Neurofeedback-ul ajută și la durerile de cap post-traumatice?",
          answer:
            "De multe ori, da — durerile de cap care apar după un traumatism sunt legate de aceeași hiperexcitabilitate pe care o antrenăm. Mulți pacienți raportează o rărire a lor pe parcursul protocolului.",
        },
        {
          question: "Câte ședințe sunt necesare?",
          answer:
            "Depinde de severitatea și vechimea traumatismului. Mulți pacienți observă îmbunătățiri după 15–20 de ședințe, dar numărul exact îl estimăm după Brain Map.",
        },
        {
          question: "Ajută și după o comoție ușoară, nu doar după traumatisme grave?",
          answer:
            "Da. Chiar și o comoție aparent ușoară poate lăsa tulburări de funcționare a rețelelor neuronale, invizibile pe RMN sau CT, dar vizibile pe Brain Map. Tocmai aceste tipare le antrenăm, indiferent de cât de „minor” a părut traumatismul.",
        },
        {
          question: "Ajută și cu iritabilitatea și schimbările de dispoziție de după traumatism?",
          answer:
            "De multe ori, da. Iritabilitatea, toleranța scăzută la stres și instabilitatea emoțională sunt legate de aceleași tipare perturbate pe care le antrenăm. Pe măsură ce funcționarea creierului se normalizează, mulți pacienți raportează o stare emoțională mai stabilă.",
        },
        {
          question: "Pot continua activitatea profesională în timpul protocolului?",
          answer:
            "Da. Ședințele sunt scurte, non-invazive și nu necesită o perioadă de recuperare — îți poți relua activitățile imediat după fiecare ședință. Programul se poate organiza în jurul serviciului tău.",
        },
      ],
      relatedTitle: "Vezi și — Probleme conexe după un traumatism cranian",
      ctaFinal: {
        title: "Vrei să afli ce arată harta creierului tău după traumatism?",
        text: "Programează o evaluare inițială gratuită. Ne uităm la simptomele tale și îți spunem onest dacă te putem ajuta.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },
  {
    slug: "epilepsie",
    category: "Neurologic",
    name: "Epilepsie (terapie adjuvantă)",
    cardTitle: "Epilepsie (terapie adjuvantă)",
    cardDescription:
      "Ca sprijin alături de tratamentul neurologic, neurofeedback-ul poate ajuta la stabilizarea activității electrice a creierului.",
    seo: {
      title: "Epilepsie — neurofeedback adjuvant | Emmanuel CliniX",
      description:
        "Neurofeedback ca terapie adjuvantă în epilepsie, alături de tratamentul neurologic. Stabilizăm activitatea electrică pe baza qEEG. Evaluare gratuită.",
    },
    related: ["recuperare-avc", "traumatisme-craniene"],
    landing: {
      hero: {
        eyebrow: "Neurofeedback ca terapie adjuvantă în epilepsie",
        h1: "Alături de tratamentul neurologic, creierul poate fi antrenat să-și stabilizeze activitatea electrică.",
        subtitle:
          "Neurofeedback-ul nu înlocuiește medicația antiepileptică și nu o oprește niciodată — este o terapie complementară, folosită alături de medicul neurolog, prin care antrenăm creierul să-și mențină un ritm electric mai stabil. Totul pornește de la o hartă precisă a creierului (qEEG).",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title: "Pentru cine poate fi utilă această terapie adjuvantă",
        items: [
          "Ai un diagnostic de epilepsie confirmat și ești în tratament neurologic",
          "Crizele nu sunt complet controlate de medicație",
          "Cauți o abordare complementară, alături de tratamentul actual",
          "Te confrunți cu oboseală, probleme de concentrare sau de somn între crize",
          "Vrei să înțelegi mai bine activitatea electrică a creierului tău",
          "Medicul neurolog este de acord cu o terapie adjuvantă",
        ],
      },
      brain: {
        title: "Cum poate ajuta neurofeedback-ul la stabilizarea activității electrice",
        paragraphs: [
          "Epilepsia este, în esență, o tulburare a activității electrice a creierului: în anumite momente, grupuri de neuroni descarcă sincron și excesiv, declanșând o criză. Tratamentul medicamentos rămâne baza obligatorie a oricărei abordări și nu trebuie modificat decât de medicul neurolog.",
          "Neurofeedback-ul intervine ca terapie adjuvantă: pe baza Brain Map-ului (qEEG), antrenăm creierul să-și mențină tipare electrice mai stabile, crescând pragul de la care apar descărcările anormale. Este o metodă studiată ca terapie complementară, iar la noi se aplică întotdeauna în coordonare cu medicul neurolog, niciodată în locul lui.",
          "Subliniem încă o dată, pentru că este esențial: neurofeedback-ul nu este un tratament al epilepsiei și nu înlocuiește niciodată medicația. Este, strict, o terapie adjuvantă, studiată ca metodă complementară, care se aplică doar cu acordul și în coordonarea medicului neurolog. Nu promitem oprirea crizelor și nu facem niciun fel de ajustare a tratamentului — acela rămâne în întregime în mâna medicului tău. Ce putem oferi este un antrenament al stabilității electrice, pornind de la Brain Map-ul tău, plus o monitorizare atentă a evoluției, pe care o împărtășim cu neurologul. Dacă, în cazul tău, terapia adjuvantă nu are sens, îți spunem deschis acest lucru de la început.",
        ],
      },
      approach: {
        title: "O abordare în coordonare cu medicul tău neurolog",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm diagnosticul, tratamentul actual și recomandarea medicului neurolog. Stabilim împreună dacă terapia adjuvantă are sens în cazul tău.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Cartografiem activitatea electrică pentru a înțelege tiparele specifice creierului tău, în contextul diagnosticului confirmat.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe nedureroase prin care antrenăm stabilitatea activității electrice, în paralel cu tratamentul medicamentos, care continuă neschimbat.",
          },
          {
            title: "Monitorizare în coordonare cu neurologul",
            description:
              "Urmărim evoluția și menținem legătura cu medicul tău. Orice ajustare a medicației o face exclusiv el.",
          },
        ],
      },
      testimonial: {
        quote:
          "Fiica noastră își urmează în continuare tratamentul prescris de neurolog. Am adăugat neurofeedback-ul ca sprijin, cu acordul medicului. Vedem o copilă mai liniștită, mai odihnită și mai concentrată la școală.",
        name: "Cristina și Mihai R.",
        detail: "părinții unei paciente — terapie adjuvantă",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "Neurofeedback-ul înlocuiește medicația antiepileptică?",
          answer:
            "Niciodată. Este strict o terapie adjuvantă, folosită alături de tratamentul prescris de neurolog. Medicația nu se modifică și nu se oprește decât de către medicul tău.",
        },
        {
          question: "Trebuie să fiu de acord cu medicul meu neurolog?",
          answer:
            "Da, și o considerăm obligatorie. Lucrăm doar în coordonare cu medicul care te urmărește și păstrăm legătura cu el pe parcursul protocolului.",
        },
        {
          question: "Ce beneficii pot apărea?",
          answer:
            "Pe lângă obiectivul de stabilizare, mulți pacienți raportează un somn mai bun, mai multă concentrare și o stare generală mai bună. Rezultatele se urmăresc obiectiv și diferă de la caz la caz.",
        },
        {
          question: "Este sigur?",
          answer:
            "Neurofeedback-ul este non-invaziv — senzorii doar citesc activitatea creierului. La evaluarea inițială discutăm orice îngrijorare specifică situației tale, împreună cu recomandările neurologului.",
        },
        {
          question: "Cât durează un program de neurofeedback adjuvant?",
          answer:
            "Ca terapie adjuvantă, programul se întinde de obicei pe mai multe ședințe decât la alte afecțiuni și se desfășoară în ritmul stabilit împreună cu medicul neurolog. Repetăm Brain Map-ul de control pe parcurs și ajustăm protocolul în funcție de evoluție, păstrând permanent legătura cu medicul care te urmărește.",
        },
        {
          question: "Orice tip de epilepsie poate beneficia de terapia adjuvantă?",
          answer:
            "Nu putem promite acest lucru pentru toate formele. Indicarea depinde de diagnosticul exact, de istoricul crizelor și de recomandarea neurologului. Tocmai de aceea pornim întotdeauna de la o evaluare individuală și de la acordul medicului tău, fără a generaliza.",
        },
        {
          question: "Pot să-mi continui activitățile normale în timpul protocolului?",
          answer:
            "Da. Ședințele sunt non-invazive — senzorii doar citesc activitatea creierului, nu transmit nimic spre el — și nu necesită o perioadă de recuperare. Îți poți relua activitățile obișnuite imediat după fiecare ședință, iar tratamentul medicamentos continuă neschimbat.",
        },
        {
          question: "Ce se întâmplă dacă apare o criză în timpul programului?",
          answer:
            "Tratamentul prescris de neurolog rămâne prima și cea mai importantă măsură, exact ca până acum. Neurofeedback-ul nu schimbă nimic din protocolul de urgență stabilit de medicul tău; noi doar urmărim evoluția în timp și comunicăm cu el, fără a interveni asupra medicației.",
        },
        {
          question: "Cum colaborați concret cu medicul neurolog?",
          answer:
            "Pornim de la diagnosticul și recomandările lui, îi punem la dispoziție rezultatele Brain Map-ului și ale evaluărilor de control și îl ținem la curent cu evoluția pe parcursul protocolului. Deciziile asupra tratamentului medicamentos rămân în întregime la medicul tău — rolul nostru este strict de sprijin complementar, în coordonare cu el.",
        },
      ],
      relatedTitle: "Vezi și — Probleme conexe neurologice",
      ctaFinal: {
        title: "Vrei să afli dacă terapia adjuvantă are sens în cazul tău?",
        text: "Programează o evaluare inițială gratuită. Discutăm situația ta, întotdeauna în coordonare cu medicul neurolog.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },

  // ─────────────────────────── Psihic & Emoțional ───────────────────────
  {
    slug: "anxietate",
    category: "Psihic & Emoțional",
    name: "Anxietate & atacuri de panică",
    cardTitle: "Anxietate și atacuri de panică",
    cardDescription:
      "Mintea nu se oprește, tensiune constantă, atacuri de panică. Creierul tău e blocat într-un mod de alertă permanentă.",
    seo: {
      title: "Tratament anxietate fără medicamente | Emmanuel CliniX",
      description:
        "Neurofeedback pentru anxietate și atacuri de panică. Reglăm modul de alertă al creierului, vizibil pe Brain Map, fără medicație. Evaluare gratuită.",
    },
    related: ["insomnie", "burnout", "depresie"],
    landing: {
      hero: {
        eyebrow: "Tratament anxietate prin Neurofeedback",
        h1: "Nu ești o persoană „prea sensibilă”. Creierul tău e blocat într-un mod de alertă permanentă — și poate fi învățat să se liniștească.",
        subtitle:
          "Anxietatea nu e o slăbiciune de caracter. E un tipar de hiperactivare în creier, vizibil pe Brain Map (qEEG), în care sistemul de alarmă rămâne pornit chiar și când nu există niciun pericol. Neurofeedback-ul îl antrenează să revină la normal, fără medicație.",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title:
          "Te recunoști în asta? Semnele pe care le vedem cel mai des la persoanele cu anxietate",
        items: [
          "Mintea nu se oprește niciodată — gânduri în buclă, mai ales seara",
          "Tensiune fizică constantă: umeri încordați, respirație scurtă, nod în stomac",
          "Atacuri de panică sau valuri bruște de frică, uneori fără motiv clar",
          "Te aștepți mereu la ce e mai rău, anticipezi pericole peste tot",
          "Iritabilitate, dificultăți de concentrare și de adormit",
          "Eviți situații care altădată ți se păreau normale",
        ],
      },
      brain: {
        title: "Anxietatea este un creier blocat în „modul de alarmă”",
        paragraphs: [
          "În spatele anxietății stă un creier al cărui sistem de alertă — în special zonele care procesează frica — rămâne hiperactiv. Pe Brain Map (qEEG) vedem adesea un exces de unde rapide și o activitate dezechilibrată în regiunile care ar trebui să te ajute să te calmezi. Practic, „pedala de alarmă” e apăsată, iar „frâna” nu mai răspunde bine.",
          "Neurofeedback-ul antrenează direct acest dezechilibru. Ședință cu ședință, creierul învață să producă mai des tiparele asociate cu starea de calm și să iasă mai ușor din starea de alertă. Nu îți „acoperă” anxietatea cum face un medicament, ci antrenează creierul să se autoregleze — efectul se construiește și rămâne în timp.",
          "Ce ne diferențiază de o simplă recomandare „relaxează-te” este că pornim de la o măsurătoare obiectivă: Brain Map-ul arată exact unde și cât de activ este sistemul tău de alertă, iar protocolul țintește acele zone, nu o idee generală despre anxietate. Fii realist împreună cu noi — neurofeedback-ul nu te face „imun” la stres și nu acționează peste noapte; antrenează, ședință cu ședință, capacitatea creierului de a reveni mai ușor la calm. Mulți pacienți observă întâi un somn mai bun și mai puțină tensiune fizică. Urmărim progresul obiectiv la fiecare 10 ședințe, iar dacă metoda nu e potrivită pentru tine, îți spunem deschis.",
        ],
      },
      approach: {
        title: "Un protocol construit pe harta cerebrală a anxietății tale",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm despre cum se manifestă anxietatea la tine, de când a apărut și ce ai încercat. Stabilim dacă neurofeedback-ul e potrivit.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Identificăm exact tiparele de hiperactivare și zonele implicate. Comparăm cu valorile normale pentru vârsta ta.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe de 30–45 de minute, relaxante, în care creierul învață să-și regleze singur starea de alertă. Fără medicamente, fără efecte secundare.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Urmărim progresul la fiecare 10 ședințe. Mulți pacienți observă un somn mai bun și mai puține atacuri încă din primele săptămâni.",
          },
        ],
      },
      testimonial: {
        quote:
          "Anxietatea îmi controla viața — atacuri de panică, insomnie, gânduri care nu se opreau. Brain Map-ul a arătat exact ce nu funcționa. Acum dorm bine, gândesc clar și nu am mai avut un atac de panică de luni de zile.",
        name: "Radu M.",
        detail: "Anxietate și insomnie — 18 ședințe",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "Neurofeedback-ul funcționează dacă iau deja medicamente pentru anxietate?",
          answer:
            "Da. Mulți pacienți încep neurofeedback-ul în timp ce iau medicație, iar pe măsură ce creierul se reglează, reducerea se face treptat, sub coordonarea medicului. Scopul este să ai nevoie de cât mai puțin sprijin medicamentos.",
        },
        {
          question: "Cu ce e diferit față de terapia prin discuții (psihoterapie)?",
          answer:
            "Se completează foarte bine. Psihoterapia lucrează la nivelul gândurilor și comportamentelor; neurofeedback-ul lucrează direct la nivelul tiparului cerebral care întreține anxietatea. Mulți pacienți le combină.",
        },
        {
          question: "În cât timp văd rezultate?",
          answer:
            "Majoritatea oamenilor observă schimbări — somn mai bun, mai puțină tensiune — după 10–20 de ședințe. Fiecare creier răspunde în ritmul lui, iar Brain Map-ul de control îți arată progresul obiectiv.",
        },
        {
          question: "Ajută și la atacurile de panică?",
          answer:
            "Da. Atacurile de panică sunt vârful aceleiași hiperactivări pe care o antrenăm. Pe măsură ce creierul iese mai ușor din starea de alertă, frecvența și intensitatea lor scad de obicei.",
        },
        {
          question: "Anxietatea mea e mai mult fizică (palpitații, tensiune) decât mentală. Ajută?",
          answer:
            "Da. Simptomele fizice — palpitații, tensiune musculară, respirație scurtă — sunt expresia aceleiași hiperactivări a sistemului de alertă. Antrenând creierul să iasă din starea de alarmă, mulți pacienți simt că scade și componenta fizică, nu doar gândurile.",
        },
        {
          question: "Câte ședințe sunt necesare pentru anxietate?",
          answer:
            "De obicei între 20 și 40 de ședințe, în funcție de cât de veche și de intensă este anxietatea. Repetăm Brain Map-ul de control la fiecare 10 ședințe și ajustăm protocolul în funcție de cum răspunde creierul tău.",
        },
        {
          question: "Se mențin rezultatele după terminarea ședințelor?",
          answer:
            "De regulă da, fiindcă neurofeedback-ul antrenează creierul să se autoregleze, nu „acoperă” simptomul ca un medicament. Creierul tinde să păstreze tiparul învățat; la nevoie, câteva ședințe de întreținere consolidează rezultatul.",
        },
      ],
      relatedTitle: "Vezi și — Probleme conexe care apar frecvent împreună cu anxietatea",
      ctaFinal: {
        title: "Vrei să afli dacă putem liniști sistemul tău de alarmă?",
        text: "Programează o evaluare inițială gratuită. Ne uităm la ce te preocupă și îți spunem onest dacă te putem ajuta.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },
  {
    slug: "burnout",
    category: "Psihic & Emoțional",
    name: "Burnout & epuizare cronică",
    cardTitle: "Burnout și epuizare",
    cardDescription:
      "Oboseală cronică, brain fog, lipsă de motivație. Creierul funcționează la suprasarcină de prea mult timp.",
    seo: {
      title: "Tratament burnout și epuizare cronică | Emmanuel CliniX",
      description:
        "Neurofeedback pentru burnout și epuizare cronică. Ajutăm creierul să iasă din suprasarcină și să-și refacă resursele, fără medicație. Evaluare gratuită.",
    },
    related: ["anxietate", "insomnie", "brain-fog"],
    landing: {
      hero: {
        eyebrow: "Tratament burnout prin Neurofeedback",
        h1: "Nu ești leneș și nu ți-ai pierdut „voința”. Creierul tău funcționează la suprasarcină de prea mult timp — și are nevoie să fie reechilibrat.",
        subtitle:
          "Burnout-ul nu se rezolvă cu „odihnește-te puțin”. Este o epuizare reală a sistemelor de reglare ale creierului, vizibilă pe Brain Map (qEEG). Neurofeedback-ul ajută creierul să iasă din suprasarcină și să-și refacă resursele, fără medicație.",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title: "Te recunoști în asta? Semnele epuizării cronice și ale burnout-ului",
        items: [
          "Oboseală care nu mai trece, oricât ai dormi",
          "Ceață mentală: greu de gândit, de decis, de ținut minte",
          "Lipsă de motivație și de bucurie pentru lucruri care altădată îți plăceau",
          "Iritabilitate, nerăbdare, sensibilitate crescută la stres",
          "Somn prost și senzația că nu te mai poți „deconecta”",
          "Cinism sau detașare față de muncă și de oameni",
        ],
      },
      brain: {
        title: "Burnout-ul este un creier rămas blocat în suprasolicitare",
        paragraphs: [
          "Stresul prelungit ține creierul mult timp în „modul de luptă”, cu sistemele de alertă pornite non-stop. La un moment dat, mecanismele de reglare se epuizează: creierul nu mai reușește să comute în starea de odihnă și refacere. Pe Brain Map (qEEG), acest lucru apare adesea ca un amestec de hiperactivare și de zone „secătuite”, care explică combinația tipică de tensiune și epuizare.",
          "Neurofeedback-ul antrenează creierul să iasă din această capcană: să reducă hiperactivarea și să reactiveze tiparele de calm și de refacere. Practic, îl reînvățăm să-și recupereze resursele. Spre deosebire de o simplă vacanță, antrenamentul lucrează la rădăcina problemei — la modul în care creierul își gestionează energia.",
          "Un lucru pe care îl spunem deschis tuturor: dacă sursa epuizării rămâne neschimbată — un program imposibil, suprasolicitare constantă — niciun antrenament cerebral nu o poate compensa la nesfârșit. De aceea, pe lângă protocolul de neurofeedback, discutăm onest și despre contextul care a dus la burnout. Ce poate face metoda, pe baza Brain Map-ului tău, este să ajute creierul să iasă din suprasolicitare și să-și refacă mecanismul de comutare între efort și odihnă. Rezultatele se construiesc treptat: de regulă, întâi revine somnul, apoi energia și claritatea. Urmărim totul obiectiv la fiecare 10 ședințe și ajustăm protocolul în funcție de cum răspunzi.",
        ],
      },
      approach: {
        title: "Un protocol care reechilibrează modul în care creierul își gestionează energia",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm despre nivelul de epuizare, despre context și despre ce ai încercat deja. Stabilim dacă neurofeedback-ul e potrivit pentru tine.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Identificăm tiparele de hiperactivare și zonele epuizate. Vedem obiectiv ce înseamnă burnout-ul în cazul creierului tău.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe relaxante prin care creierul reînvață să comute între efort și refacere. Fără medicamente.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Urmărim progresul la fiecare 10 ședințe. Cei mai mulți observă întâi un somn mai bun, apoi revenirea energiei și a clarității.",
          },
        ],
      },
      testimonial: {
        quote:
          "Ajunsesem să nu mai pot funcționa — oboseală totală, ceață mentală, zero motivație. Concediile nu mai ajutau. După neurofeedback, am simțit cum îmi revine energia și claritatea, treptat, ca și cum creierul a învățat din nou să se odihnească.",
        name: "Ioana S.",
        detail: "Burnout profesional — 22 ședințe",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "Cu ce e diferit neurofeedback-ul de „o vacanță” sau de concediu medical?",
          answer:
            "Odihna ajută, dar burnout-ul ține de modul în care creierul își reglează energia — iar acela nu se reface doar prin pauză. Neurofeedback-ul antrenează direct acest mecanism, ca să nu reintri în aceeași stare după prima săptămână de muncă.",
        },
        {
          question: "Trebuie să iau și medicamente?",
          answer:
            "Nu neapărat. Mulți pacienți aleg neurofeedback-ul tocmai ca abordare fără medicație. Dacă urmezi deja un tratament, lucrăm alături de el și de medicul tău.",
        },
        {
          question: "În cât timp îmi revine energia?",
          answer:
            "Cei mai mulți observă primele schimbări — somn mai bun, mai puțină tensiune — în 10–15 ședințe, iar energia și motivația revin treptat după aceea. Brain Map-ul de control arată progresul în date.",
        },
        {
          question: "Burnout-ul și depresia sunt același lucru?",
          answer:
            "Nu, deși se suprapun des. La evaluare și pe Brain Map vedem mai clar ce predomină în cazul tău și adaptăm protocolul. Dacă e nevoie, recomandăm și sprijin de specialitate suplimentar.",
        },
        {
          question: "Câte ședințe sunt necesare pentru burnout?",
          answer:
            "De obicei între 20 și 30 de ședințe, în funcție de cât de adâncă este epuizarea. Urmărim progresul pe Brain Map la fiecare 10 ședințe; de regulă, întâi se reface somnul, apoi revin energia și claritatea.",
        },
        {
          question: "Pot continua să lucrez în timpul programului?",
          answer:
            "Da, în cele mai multe cazuri. Ședințele sunt scurte și relaxante. Discutăm însă deschis dacă ritmul actual de muncă întreține problema, fiindcă uneori câteva ajustări în program ajută creierul să-și refacă resursele mai repede.",
        },
        {
          question: "Cum știu dacă e burnout sau o cauză medicală (tiroidă, anemie)?",
          answer:
            "La evaluare ținem cont de istoricul tău, iar Brain Map-ul arată tiparul de suprasolicitare specific burnout-ului. Dacă bănuim o cauză medicală — de exemplu tiroidă sau anemie — te îndrumăm și către investigațiile potrivite, ca să nu ratăm nimic.",
        },
      ],
      relatedTitle: "Vezi și — Probleme conexe care însoțesc frecvent burnout-ul",
      ctaFinal: {
        title: "Vrei să afli cum îți poți reface resursele creierului?",
        text: "Programează o evaluare inițială gratuită. Ne uităm la nivelul tău de epuizare și îți spunem onest dacă te putem ajuta.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },
  {
    slug: "depresie",
    category: "Psihic & Emoțional",
    name: "Depresie ușoară & moderată",
    cardTitle: "Depresie ușoară și moderată",
    cardDescription:
      "Lipsă de energie, de bucurie și de motivație. Un tipar cerebral care poate fi reechilibrat prin antrenament.",
    seo: {
      title: "Tratament depresie ușoară și moderată | Emmanuel CliniX",
      description:
        "Neurofeedback pentru depresie ușoară și moderată. Reechilibrăm tiparul cerebral asociat, vizibil pe Brain Map, fără medicație. Evaluare gratuită.",
    },
    related: ["anxietate", "burnout", "insomnie"],
    landing: {
      hero: {
        eyebrow: "Neurofeedback pentru depresie ușoară și moderată",
        h1: "Nu e vorba că „nu te străduiești destul”. E un tipar în creier care îți fură energia și bucuria — și care poate fi reechilibrat.",
        subtitle:
          "Depresia ușoară și moderată are o semnătură vizibilă pe Brain Map (qEEG): un dezechilibru în zonele care reglează dispoziția și motivația. Neurofeedback-ul antrenează creierul să revină la un tipar mai echilibrat, fără medicație.",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title: "Te recunoști în asta? Semnele depresiei ușoare și moderate",
        items: [
          "Lipsă de energie și de chef, chiar și pentru lucruri simple",
          "Ai pierdut bucuria pentru activități care altădată îți plăceau",
          "Dispoziție apăsată, tristețe sau gol interior, majoritatea zilelor",
          "Somn dereglat — dormi prea mult sau prea puțin",
          "Dificultăți de concentrare și de a lua decizii",
          "Te simți inutil, vinovat sau fără speranță",
        ],
      },
      brain: {
        title: "Depresia are un tipar specific în activitatea creierului",
        paragraphs: [
          "La multe persoane cu depresie ușoară și moderată, Brain Map-ul (qEEG) arată un dezechilibru între cele două emisfere și în zonele frontale, care reglează dispoziția, motivația și energia. Acest tipar ajută la explicarea de ce „vrei, dar nu poți” — nu e o problemă de voință, ci de funcționare a unor circuite.",
          "Neurofeedback-ul antrenează direct acest dezechilibru, ajutând creierul să producă mai des tiparele asociate cu o dispoziție echilibrată și cu motivația. Pe măsură ce circuitele se reglează, mulți pacienți simt cum revin treptat energia, somnul bun și interesul pentru viață. Metoda nu folosește substanțe și nu are efectele secundare ale medicației.",
          "Ține minte un lucru, pentru siguranța ta: abordarea noastră prin neurofeedback se adresează formelor ușoare și moderate. Dacă la evaluare identificăm o depresie severă sau gânduri de a-ți face rău, prioritatea absolută devine sprijinul psihiatric de specialitate, către care te îndrumăm — putem lucra, dacă e cazul, doar ca abordare complementară. Pentru formele ușoare și moderate, ce poate face metoda este să reechilibreze, pe baza Brain Map-ului, tiparele asociate dispoziției și energiei, fără efectele secundare ale medicației. Nu promitem un rezultat garantat, dar urmărim progresul obiectiv la fiecare 10 ședințe și, de obicei, întâi se ameliorează somnul și energia, apoi dispoziția.",
        ],
      },
      approach: {
        title: "Un protocol construit pe harta cerebrală a stării tale",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm despre cum te simți, de când și despre ce ai încercat. Stabilim dacă neurofeedback-ul e potrivit și dacă e nevoie de sprijin suplimentar de specialitate.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Identificăm dezechilibrele specifice asociate dispoziției și energiei. Comparăm cu valorile normale pentru vârsta ta.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe nedureroase prin care creierul învață să revină la un tipar mai echilibrat. Fără medicamente.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Urmărim progresul la fiecare 10 ședințe. De obicei, întâi se îmbunătățește somnul și energia, apoi dispoziția.",
          },
        ],
      },
      testimonial: {
        quote:
          "Mă simțeam golit pe dinăuntru, fără energie și fără chef de nimic, de aproape un an. Nu voiam să încep cu pastile. După câteva luni de neurofeedback, am simțit cum revine, încet, culoarea în viața mea — somnul, pofta de a face lucruri, bucuria.",
        name: "Bogdan I.",
        detail: "Depresie moderată — 28 ședințe",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "Neurofeedback-ul înlocuiește antidepresivele?",
          answer:
            "Pentru formele ușoare și moderate, mulți pacienți îl aleg ca alternativă fără medicație; alții îl combină cu tratamentul prescris. Orice ajustare a medicației se face doar de către medicul tău. La evaluare îți spunem onest ce e potrivit în cazul tău.",
        },
        {
          question: "Funcționează și în depresia severă?",
          answer:
            "Abordarea noastră se adresează formelor ușoare și moderate. În depresia severă sau dacă există gânduri de a-ți face rău, prioritatea este sprijinul psihiatric de specialitate — te îndrumăm către el și putem lucra, dacă e cazul, ca abordare complementară.",
        },
        {
          question: "Cu ce ajută față de psihoterapie?",
          answer:
            "Se completează foarte bine. Psihoterapia lucrează la nivelul gândurilor și emoțiilor; neurofeedback-ul lucrează la nivelul tiparului cerebral. Combinarea lor dă adesea cele mai bune rezultate.",
        },
        {
          question: "În cât timp văd schimbări?",
          answer:
            "Cei mai mulți observă primele îmbunătățiri — somn, energie — în 10–20 de ședințe, iar dispoziția se ameliorează treptat. Brain Map-ul de control arată progresul obiectiv.",
        },
        {
          question: "Câte ședințe presupune un program pentru depresie?",
          answer:
            "De obicei între 20 și 40 de ședințe pentru formele ușoare și moderate. Urmărim progresul pe Brain Map la fiecare 10 ședințe; de regulă, întâi se ameliorează somnul și energia, apoi dispoziția.",
        },
        {
          question: "Se mențin rezultatele după terminarea ședințelor?",
          answer:
            "De obicei da, pentru că neurofeedback-ul antrenează creierul să-și regleze singur dispoziția și energia, spre deosebire de medicație, care acționează doar cât timp o iei. La nevoie recomandăm câteva ședințe de întreținere.",
        },
        {
          question: "Cum îmi dau seama dacă e depresie ușoară-moderată sau severă?",
          answer:
            "La evaluarea inițială discutăm despre simptome și despre durata și intensitatea lor. Dacă identificăm o formă severă sau gânduri de a-ți face rău, prioritatea este sprijinul psihiatric de specialitate, către care te îndrumăm — putem lucra, dacă e cazul, ca abordare complementară.",
        },
      ],
      relatedTitle: "Vezi și — Probleme conexe care însoțesc frecvent depresia",
      ctaFinal: {
        title: "Vrei să afli dacă putem reechilibra acest tipar?",
        text: "Programează o evaluare inițială gratuită. Ne uităm la situația ta și îți spunem onest dacă te putem ajuta.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },
  {
    slug: "ptsd",
    category: "Psihic & Emoțional",
    name: "Stres post-traumatic (PTSD)",
    cardTitle: "Stres post-traumatic (PTSD)",
    cardDescription:
      "Retrăiri, hipervigilență, somn întrerupt după un eveniment traumatic. Creierul a rămas blocat în modul de alarmă.",
    seo: {
      title: "Tratament stres post-traumatic (PTSD) | Emmanuel CliniX",
      description:
        "Neurofeedback pentru stres post-traumatic (PTSD). Ajutăm creierul să iasă din modul de alarmă, pe baza hărții cerebrale qEEG. Evaluare gratuită.",
    },
    related: ["anxietate", "insomnie", "depresie"],
    landing: {
      hero: {
        eyebrow: "Tratament stres post-traumatic (PTSD) prin Neurofeedback",
        h1: "După o traumă, creierul a rămas blocat în „modul de alarmă”. Poate fi învățat, în siguranță, să revină la normal.",
        subtitle:
          "Retrăirile, hipervigilența și somnul întrerupt nu înseamnă că ești „slab” sau că „nu treci peste”. Sunt semnele unui creier blocat în starea de alarmă de la momentul traumei. Neurofeedback-ul îl antrenează blând să iasă din ea, pe baza unei hărți precise (qEEG).",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title: "Te recunoști în asta? Semnele stresului post-traumatic",
        items: [
          "Retrăiri, flashback-uri sau coșmaruri legate de eveniment",
          "Hipervigilență — ești mereu „în gardă”, tresari ușor",
          "Somn întrerupt, dificultăți de a adormi sau de a rămâne adormit",
          "Eviți locuri, oameni sau situații care îți amintesc de traumă",
          "Iritabilitate, izbucniri sau senzație de detașare/amorțeală",
          "Anxietate constantă și dificultăți de concentrare",
        ],
      },
      brain: {
        title: "PTSD-ul este un creier care a rămas în alarmă după ce pericolul a trecut",
        paragraphs: [
          "În timpul unei traume, creierul își pornește la maximum sistemul de supraviețuire. La PTSD, acest sistem nu se mai oprește după ce pericolul a trecut: amigdala (centrul fricii) rămâne hiperactivă, iar zonele care ar trebui s-o „liniștească” nu mai țin pasul. Pe Brain Map (qEEG) acest dezechilibru este vizibil și explică hipervigilența, retrăirile și somnul perturbat.",
          "Neurofeedback-ul antrenează creierul să iasă din această stare de alarmă permanentă și să-și recapete capacitatea de autoreglare. Pentru că lucrează la nivelul tiparului cerebral, nu te obligă să retrăiești sau să povestești trauma în detaliu — un avantaj important pentru mulți oameni. Ședință cu ședință, creierul învață din nou să se simtă în siguranță.",
          "Pentru mulți oameni, cel mai mare avantaj este că nu trebuie să retrăiască sau să povestească trauma în detaliu ca să beneficieze — neurofeedback-ul lucrează la nivelul tiparului cerebral, nu prin reexpunere. Asta face procesul mai blând, mai ales pentru cei pentru care vorbitul despre eveniment este în sine retraumatizant. Fii sigur de un lucru: mergem în ritmul tău, fără presiune, iar dacă urmezi deja o terapie pentru traumă, lucrăm alături de specialistul tău, nu în locul lui. Pornim de la Brain Map ca să țintim exact sistemul de alarmă rămas activ și urmărim, la fiecare 10 ședințe, cum scad hipervigilența și problemele de somn.",
        ],
      },
      approach: {
        title: "Un protocol blând, construit pe harta cerebrală a sistemului tău de alarmă",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm, în ritmul tău și fără presiune, despre simptome și despre cum îți afectează viața. Stabilim dacă neurofeedback-ul e potrivit.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Identificăm tiparele de hiperactivare lăsate de traumă. Comparăm cu valorile normale pentru vârsta ta.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe blânde, nedureroase, în care creierul învață să iasă din starea de alarmă. Nu trebuie să retrăiești trauma.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Urmărim progresul la fiecare 10 ședințe. De obicei, întâi se îmbunătățește somnul și scade hipervigilența.",
          },
        ],
      },
      testimonial: {
        quote:
          "După un eveniment traumatic, ani de zile am trăit în alertă — coșmaruri, tresăriri, somn imposibil. Ce m-a ajutat la neurofeedback a fost că nu a trebuit să retrăiesc totul. Pur și simplu, încet, creierul meu a învățat din nou să se liniștească.",
        name: "Cătălina N.",
        detail: "Stres post-traumatic — 30 ședințe",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "Trebuie să povestesc sau să retrăiesc trauma?",
          answer:
            "Nu. Un avantaj important al neurofeedback-ului este că lucrează la nivelul tiparului cerebral, fără să te oblige să retrăiești sau să descrii evenimentul. Mergi în ritmul tău.",
        },
        {
          question: "Neurofeedback-ul înlocuiește psihoterapia pentru traumă?",
          answer:
            "Se completează foarte bine. Multe forme de psihoterapie pentru traumă și neurofeedback-ul lucrează la niveluri diferite și dau adesea rezultate mai bune împreună. Dacă urmezi deja terapie, lucrăm alături de ea.",
        },
        {
          question: "Pot lua și medicamente în paralel?",
          answer:
            "Da. Mulți pacienți încep neurofeedback-ul în timp ce iau medicație. Orice ajustare a tratamentului se face doar de către medicul tău.",
        },
        {
          question: "În cât timp văd rezultate?",
          answer:
            "Cei mai mulți observă întâi un somn mai bun și mai puțină hipervigilență, în primele 10–20 de ședințe. Recuperarea după traumă e un proces, iar Brain Map-ul de control arată progresul obiectiv.",
        },
        {
          question: "Câte ședințe sunt necesare în cazul PTSD?",
          answer:
            "Recuperarea după traumă este un proces, iar PTSD-ul cere de obicei mai multe ședințe decât anxietatea simplă. Urmărim progresul pe Brain Map la fiecare 10 ședințe; de regulă, întâi se îmbunătățește somnul și scade hipervigilența.",
        },
        {
          question: "Funcționează și pentru o traumă veche, de acum mulți ani?",
          answer:
            "Da. Creierul poate rămâne în starea de alarmă ani la rând după eveniment, dar acest tipar rămâne antrenabil. Nu contează atât cât de veche este trauma, cât faptul că sistemul de alertă este încă activat — exact lucrul pe care îl reglăm.",
        },
        {
          question: "Este sigur dacă am traume multiple sau simptome intense?",
          answer:
            "Lucrăm blând și în ritmul tău, fără să te obligăm să retrăiești evenimentele. Dacă simptomele sunt foarte intense sau urmezi deja o terapie pentru traumă, coordonăm abordarea cu specialistul tău, ca totul să se desfășoare în siguranță.",
        },
      ],
      relatedTitle: "Vezi și — Probleme conexe care însoțesc frecvent PTSD-ul",
      ctaFinal: {
        title: "Vrei să afli dacă putem ajuta creierul să iasă din alarmă?",
        text: "Programează o evaluare inițială gratuită. Discutăm în ritmul tău, fără presiune, și îți spunem onest dacă te putem ajuta.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },

  // ───────────────────────────────── Somn ───────────────────────────────
  {
    slug: "insomnie",
    category: "Somn",
    name: "Insomnie",
    cardTitle: "Insomnie",
    cardDescription:
      "Nu poți adormi, te trezești obosit, somnul nu te odihnește. Creierul nu face tranziția corectă spre starea de somn.",
    seo: {
      title: "Tratament insomnie fără somnifere | Emmanuel CliniX",
      description:
        "Neurofeedback pentru insomnie. Antrenăm creierul să facă tranziția corectă spre somn, fără somnifere, pe baza hărții cerebrale qEEG. Evaluare gratuită.",
    },
    related: ["anxietate", "burnout", "somn-neodihnitor"],
    landing: {
      hero: {
        eyebrow: "Tratament insomnie prin Neurofeedback",
        h1: "Nu „nu știi să dormi”. Creierul tău nu face corect tranziția spre somn — și asta se poate reantrena.",
        subtitle:
          "Insomnia nu se rezolvă forțând somnul. Este un creier care rămâne „pornit” când ar trebui să încetinească, un tipar vizibil pe Brain Map (qEEG). Neurofeedback-ul antrenează creierul să facă din nou tranziția firească spre somn, fără somnifere.",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title:
          "Te recunoști în asta? Semnele pe care le vedem cel mai des la persoanele cu insomnie",
        items: [
          "Stai în pat cu mintea „pornită” și nu reușești să adormi",
          "Te trezești în mijlocul nopții și nu mai poți readormi",
          "Te trezești prea devreme, obosit, înainte de alarmă",
          "Te gândești cu teamă la noapte și la cum vei dormi",
          "Te bazezi pe somnifere ca să adormi",
          "Ziua ești epuizat, irascibil și fără concentrare",
        ],
      },
      brain: {
        title: "Insomnia este un creier care nu reușește să „încetinească”",
        paragraphs: [
          "Pentru a adormi, creierul trebuie să treacă de la undele rapide ale stării de veghe la unde tot mai lente. La insomnie, această tranziție nu se face cum trebuie: creierul rămâne într-o stare de hiperactivare — „pornit” — exact când ar trebui să comute spre somn. Pe Brain Map (qEEG) vedem adesea acest exces de activitate rapidă, mai ales seara.",
          "Neurofeedback-ul antrenează creierul să producă mai ușor tiparele lente, asociate cu relaxarea și cu adormirea. În loc să forțezi somnul sau să-l induci chimic cu somnifere, reantrenezi mecanismul natural prin care creierul comută spre odihnă. Pentru că lucrează la rădăcină, efectul se construiește treptat și tinde să rămână în timp.",
          "Spre deosebire de un somnifer, care induce somnul chimic dar lasă mecanismul neatins, neurofeedback-ul reantrenează chiar capacitatea creierului de a încetini seara și de a face tranziția firească spre somn. Asta înseamnă că nu urmărim un efect care dispare când oprești o pastilă, ci o schimbare care tinde să rămână. Fii realist împreună cu noi: somnul nu se reglează peste noapte, iar igiena somnului și nivelul de stres contează în continuare — le discutăm deschis. Pornim de la Brain Map-ul tău ca să vedem exact ce îți ține creierul „pornit” și urmărim calitatea somnului obiectiv, la fiecare 10 ședințe.",
        ],
      },
      approach: {
        title: "Un protocol construit pe harta cerebrală a somnului tău",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm despre cum arată nopțile tale, de când a apărut problema și ce ai încercat. Stabilim dacă neurofeedback-ul e potrivit.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Identificăm tiparele de hiperactivare care îți țin creierul „pornit” seara. Comparăm cu valorile normale pentru vârsta ta.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe relaxante prin care creierul reînvață să încetinească și să comute spre somn. Fără somnifere.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Urmărim calitatea somnului la fiecare 10 ședințe. Mulți pacienți adorm mai ușor încă din primele săptămâni.",
          },
        ],
      },
      testimonial: {
        quote:
          "De ani de zile nu adormeam fără somnifere, și tot mă trezeam epuizat. Brain Map-ul a arătat un creier care nu se oprea niciodată seara. După neurofeedback, am început să adorm natural — ceva ce uitasem cum se simte.",
        name: "Liviu A.",
        detail: "Insomnie cronică — 20 ședințe",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "Va trebui să renunț la somnifere?",
          answer:
            "Scopul este să nu mai ai nevoie de ele. Nu se renunță brusc — pe măsură ce creierul reînvață să adoarmă singur, reducerea se face treptat, sub coordonarea medicului care ți le-a prescris.",
        },
        {
          question: "Cu ce e diferit de un somnifer?",
          answer:
            "Somniferul induce somnul chimic, dar nu repară mecanismul, de aceea problema revine când îl oprești. Neurofeedback-ul reantrenează chiar mecanismul natural de adormire, ca somnul să vină de la sine.",
        },
        {
          question: "În cât timp voi dormi mai bine?",
          answer:
            "Mulți pacienți observă schimbări — adorm mai ușor, se trezesc mai rar — în 10–20 de ședințe. Fiecare creier răspunde în ritmul lui, iar Brain Map-ul de control arată progresul.",
        },
        {
          question: "Insomnia mea vine din anxietate. Mai ajută?",
          answer:
            "Da, și de multe ori se rezolvă împreună — aceeași hiperactivare întreține și anxietatea, și insomnia. Protocolul ține cont de acest lucru și antrenează starea de calm de care depind amândouă.",
        },
        {
          question: "Câte ședințe sunt necesare pentru insomnie?",
          answer:
            "Mulți pacienți observă schimbări în 20–30 de ședințe, în funcție de cât de veche este insomnia. Urmărim calitatea somnului pe Brain Map la fiecare 10 ședințe și ajustăm protocolul în funcție de cum răspunde creierul.",
        },
        {
          question: "Mă trezesc des în timpul nopții, nu am probleme la adormire. Ajută la fel?",
          answer:
            "Da. Și trezirile repetate țin de un creier care nu menține corect somnul. Brain Map-ul arată ce anume îl „repornește” noaptea, iar protocolul antrenează tocmai stabilitatea de care depinde un somn neîntrerupt.",
        },
        {
          question: "Se mențin rezultatele după ce termin ședințele?",
          answer:
            "De obicei da, pentru că reantrenăm mecanismul natural de adormire, nu inducem somnul chimic. Creierul tinde să păstreze tiparul învățat, iar la nevoie câteva ședințe de întreținere îl consolidează.",
        },
      ],
      relatedTitle: "Vezi și — Probleme conexe care întrețin insomnia",
      ctaFinal: {
        title: "Vrei să afli de ce creierul tău nu se oprește seara?",
        text: "Programează o evaluare inițială gratuită. Ne uităm la cum dormi și îți spunem onest dacă te putem ajuta.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },
  {
    slug: "somn-neodihnitor",
    category: "Somn",
    name: "Somn neodihnitor",
    cardTitle: "Somn neodihnitor",
    cardDescription:
      "Dormi suficiente ore, dar te trezești epuizat. Creierul nu atinge fazele profunde care refac cu adevărat resursele.",
    seo: {
      title: "Tratament somn neodihnitor | Emmanuel CliniX",
      description:
        "Neurofeedback pentru somn neodihnitor. Ajutăm creierul să atingă fazele profunde de somn care refac energia, pe baza qEEG. Evaluare gratuită.",
    },
    related: ["insomnie", "burnout", "brain-fog"],
    landing: {
      hero: {
        eyebrow: "Somn neodihnitor — tratament prin Neurofeedback",
        h1: "Dormi orele întregi, dar te trezești epuizat. Problema nu e cât dormi, ci cum doarme creierul tău.",
        subtitle:
          "Dacă te trezești obosit deși ai dormit suficient, creierul tău probabil nu atinge fazele profunde de somn care refac cu adevărat resursele. E un tipar vizibil pe Brain Map (qEEG), pe care neurofeedback-ul îl poate corecta — fără medicație.",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title: "Te recunoști în asta? Semnele unui somn care nu odihnește",
        items: [
          "Te trezești obosit, deși ai dormit 7–8 ore",
          "Ai nevoie de mult timp și de cafea ca să „pornești” dimineața",
          "Te simți epuizat peste zi, fără un motiv clar",
          "Somnul ți se pare superficial, te trezești des fără să-ți amintești",
          "Memoria și concentrarea au scăzut",
          "Nu te simți niciodată cu adevărat „refăcut”",
        ],
      },
      brain: {
        title: "Odihna nu vine din ore de somn, ci din fazele profunde",
        paragraphs: [
          "Somnul de calitate înseamnă să parcurgi corect ciclurile sale, în special fazele profunde, în care creierul își reface resursele, consolidează memoria și „face curățenie”. Poți petrece 8 ore în pat, dar dacă creierul nu coboară suficient în aceste faze, te trezești la fel de obosit. Pe Brain Map (qEEG) vedem adesea un creier care rămâne prea „activ” și în timpul somnului.",
          "Neurofeedback-ul antrenează creierul să producă tiparele lente, profunde, de care depinde odihna reală. În loc să adaugi ore de somn neodihnitor, îmbunătățești calitatea lui. Pe măsură ce fazele profunde se restabilesc, mulți pacienți simt că se trezesc cu adevărat refăcuți, uneori pentru prima dată după ani.",
          "Diferența esențială pe care o facem este între durata somnului și calitatea lui: poți petrece opt ore în pat și totuși să te trezești epuizat dacă creierul nu coboară suficient în fazele profunde. Brain Map-ul (qEEG) ne arată tocmai acest lucru, iar protocolul antrenează tiparele lente de care depinde odihna reală. Fii realist împreună cu noi — dacă bănuim o cauză care necesită investigație medicală, cum ar fi apneea de somn, te îndrumăm către specialistul potrivit înainte de orice. Acolo unde neurofeedback-ul este potrivit, urmărim obiectiv, la fiecare 10 ședințe, cum se schimbă energia ta de dimineață, primul semn pe care îl observă majoritatea. Iar dacă, pe parcurs, vedem că nu răspunzi la antrenament, îți spunem deschis și nu prelungim ședințele fără rost.",
        ],
      },
      approach: {
        title: "Un protocol care îmbunătățește calitatea somnului, nu doar durata",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm despre cum te simți dimineața și peste zi, deși dormi suficient. Stabilim dacă neurofeedback-ul e potrivit.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Identificăm de ce creierul tău rămâne prea activ și nu coboară în fazele profunde. Comparăm cu valorile normale pentru vârsta ta.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe relaxante prin care antrenăm tiparele profunde de somn. Fără medicamente.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Urmărim cum te simți la trezire la fiecare 10 ședințe. Cel mai des, energia de dimineață e primul lucru care se schimbă.",
          },
        ],
      },
      testimonial: {
        quote:
          "Dormeam opt ore și mă trezeam ca și cum nu dormisem deloc. Credeam că așa e să îmbătrânești. După neurofeedback, mă trezesc odihnit și am energie toată ziua — diferența e ca de la cer la pământ.",
        name: "Mihaela C.",
        detail: "Somn neodihnitor — 18 ședințe",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "Dorm suficient. De ce mă trezesc obosit?",
          answer:
            "Pentru că odihna depinde de calitatea somnului, nu doar de durată. Dacă creierul nu coboară suficient în fazele profunde, te trezești obosit oricât ai dormi. Brain Map-ul arată exact acest lucru.",
        },
        {
          question: "E nevoie de o investigație a somnului (polisomnografie)?",
          answer:
            "Brain Map-ul (qEEG) ne arată tiparele de activitate ale creierului. Dacă suspectăm o cauză care necesită investigație medicală suplimentară (de exemplu apnee), te îndrumăm către specialistul potrivit.",
        },
        {
          question: "În cât timp mă voi trezi odihnit?",
          answer:
            "Mulți pacienți observă mai multă energie dimineața în 10–20 de ședințe. Fiecare creier răspunde în ritmul lui, iar progresul se urmărește obiectiv pe Brain Map.",
        },
        {
          question: "Este legat de stres și de burnout?",
          answer:
            "Foarte des, da. Un creier suprasolicitat rămâne activ și noaptea. De aceea protocolul antrenează și starea de calm de care depinde somnul profund.",
        },
        {
          question: "Câte ședințe sunt necesare?",
          answer:
            "Mulți pacienți simt mai multă energie dimineața în 15–25 de ședințe, în funcție de cât de perturbat este somnul profund. Urmărim progresul pe Brain Map la fiecare 10 ședințe și ajustăm protocolul în funcție de cum răspunde creierul.",
        },
        {
          question: "Care e diferența față de insomnie?",
          answer:
            "La insomnie problema e că nu adormi sau nu rămâi adormit; la somnul neodihnitor dormi orele întregi, dar creierul nu coboară suficient în fazele profunde, așa că te trezești obosit. Brain Map-ul ne ajută să vedem care dintre tipare predomină la tine.",
        },
        {
          question: "Se mențin rezultatele după ce termin ședințele?",
          answer:
            "De obicei da, fiindcă antrenăm chiar capacitatea creierului de a atinge fazele profunde de somn. Odată reînvățat tiparul, creierul tinde să-l păstreze; la nevoie recomandăm câteva ședințe de întreținere.",
        },
      ],
      relatedTitle: "Vezi și — Probleme conexe legate de somn și energie",
      ctaFinal: {
        title: "Vrei să afli de ce somnul tău nu te odihnește?",
        text: "Programează o evaluare inițială gratuită. Ne uităm la cum dormi și îți spunem onest dacă te putem ajuta.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },

  // ─────────────────────────────── Cognitiv ─────────────────────────────
  {
    slug: "adhd",
    category: "Cognitiv",
    name: "ADHD & deficit de atenție",
    cardTitle: "ADHD și deficit de atenție",
    cardDescription:
      "Copilul tău nu se poate concentra, e impulsiv, are dificultăți la școală. Sau tu ca adult simți că nu poți finaliza nimic.",
    seo: {
      title: "Tratament ADHD fără medicamente | Emmanuel CliniX",
      description:
        "Neurofeedback pentru ADHD la copii și adulți, pe baza unei hărți cerebrale qEEG. Antrenăm creierul să se regleze, fără medicație. Evaluare gratuită.",
    },
    related: ["brain-fog", "dificultati-invatare-copii", "anxietate"],
    landing: {
      hero: {
        eyebrow: "Tratament ADHD prin Neurofeedback",
        h1: "Copilul tău nu e lipsit de voință. Creierul lui funcționează diferit — și se poate antrena.",
        subtitle:
          "ADHD-ul nu e o problemă de caracter sau de disciplină. E un tipar specific de activitate cerebrală, vizibil pe Brain Map, pe care îl putem corecta prin neurofeedback — fără medicație, fără efecte secundare.",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title:
          "Te recunoști în asta? Semnele pe care le vedem cel mai des la copiii și adulții cu ADHD",
        items: [
          "Nu poate sta concentrat la teme mai mult de câteva minute",
          "Își pierde constant lucrurile, e dezorganizat",
          "Întrerupe, vorbește excesiv, are dificultăți să aștepte",
          "Notele au scăzut, profesorii reclamă lipsa de atenție",
          "Impulsivitate — acționează înainte să gândească",
          "Ca adult: procrastinare cronică, nu finalizează proiecte",
        ],
      },
      brain: {
        title: "ADHD-ul are o semnătură vizibilă în activitatea cerebrală",
        paragraphs: [
          "La majoritatea copiilor și adulților cu ADHD, Brain Map-ul (qEEG) arată un exces de unde lente (theta) și un deficit de unde rapide (beta) în zona frontală a creierului — exact regiunea responsabilă de atenție, planificare și control al impulsurilor.",
          'Acest tipar explică de ce "vrea, dar nu poate" — nu e o problemă de motivație, e o problemă de reglare electrică pe care neurofeedback-ul o poate antrena direct.',
          "Spunem deschis, ca să ai așteptări realiste: neurofeedback-ul nu este o „vindecare” garantată a ADHD-ului și nu funcționează identic la toți copiii. Este un antrenament al atenției și al autoreglării, una dintre cele mai studiate aplicații ale metodei, prin care mulți copii și adulți obțin îmbunătățiri reale, vizibile acasă și la școală. Pentru că pornim de la Brain Map-ul individual, protocolul vizează exact raportul theta/beta și zonele identificate la copilul tău, nu o schemă generală. Urmărim progresul obiectiv la fiecare 10 ședințe și, dacă răspunsul nu este cel sperat, ajustăm sau îți spunem onest dacă metoda nu e potrivită în cazul lui.",
        ],
      },
      approach: {
        title: "Un protocol construit pe baza hărții cerebrale a copilului tău",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm despre comportamentul copilului, contextul școlar, și istoricul. Stabilim dacă neurofeedback-ul e potrivit.",
          },
          {
            title: "Brain Map (qEEG) specific ADHD",
            description:
              "Identificăm exact raportul theta/beta și zonele afectate. Comparăm cu normele pentru vârsta copilului.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe de 30-45 minute, sub formă de joc interactiv pentru copii. Creierul învață să-și regleze singur activitatea.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Urmărim progresul la fiecare 10 ședințe. Părinții văd îmbunătățiri și acasă, și la școală.",
          },
        ],
      },
      testimonial: {
        quote:
          "Fiul meu de 9 ani nu se putea concentra la școală. Profesorii ne-au sugerat medicație. Am ales neurofeedback-ul. După 3 luni, notele au crescut și profesorii au observat diferența — fără nicio pastilă.",
        name: "Andreea P.",
        detail: "mama unui copil de 9 ani — 25 ședințe",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "De la ce vârstă se poate face neurofeedback pentru ADHD?",
          answer:
            "De la 5-6 ani, atunci când copilul poate sta concentrat suficient pentru o ședință scurtă. Protocolul se adaptează la vârstă și capacitatea de atenție.",
        },
        {
          question: "Înlocuiește neurofeedback-ul medicația pentru ADHD?",
          answer:
            "Depinde de caz. Mulți părinți aleg neurofeedback-ul ca alternativă, alții îl combină cu medicația sub coordonarea medicului. Discutăm fiecare caz individual la evaluarea inițială.",
        },
        {
          question: "În cât timp văd rezultate?",
          answer:
            "Majoritatea părinților observă schimbări vizibile (acasă și la școală) după 15-20 de ședințe, dar fiecare creier răspunde în ritmul lui.",
        },
        {
          question: "Cât durează un program complet de neurofeedback pentru ADHD?",
          answer:
            "Un program tipic înseamnă între 30 și 40 de ședințe, de obicei de două ori pe săptămână. Numărul exact depinde de ce arată Brain Map-ul inițial și de cum răspunde creierul copilului — de aceea repetăm harta de control la fiecare 10 ședințe și ajustăm protocolul pe parcurs, în loc să fixăm un număr rigid de la început.",
        },
        {
          question: "Se mențin rezultatele după ce se termină ședințele?",
          answer:
            "De obicei, da. Spre deosebire de medicație, care își face efectul doar cât timp este luată, neurofeedback-ul este un proces de învățare: creierul deprinde un tipar mai bun de reglare și tinde să-l păstreze și după încheierea programului. La unii copii recomandăm câteva ședințe de întreținere, dar scopul este o schimbare de durată, nu o dependență de ședințe.",
        },
        {
          question: "Funcționează neurofeedback-ul și pentru ADHD la adulți?",
          answer:
            "Da. La adulți, ADHD-ul se manifestă mai des prin procrastinare cronică, dezorganizare, dificultatea de a finaliza proiecte și de a-ți menține atenția la serviciu. Tiparul cerebral din spate este similar cu cel de la copii, iar protocolul se construiește la fel, pornind de la Brain Map-ul tău.",
        },
        {
          question: "Ce dovezi există că neurofeedback-ul ajută în ADHD?",
          answer:
            "Neurofeedback-ul aplicat în ADHD este una dintre cele mai studiate forme de antrenament cerebral, iar rezultatele raportate în literatură sunt în general încurajatoare. În același timp, suntem onești: efectele variază de la o persoană la alta și nu promitem o „vindecare” garantată. La evaluarea inițială îți explicăm realist la ce te poți aștepta în cazul copilului tău.",
        },
        {
          question: "Cum se combină cu sprijinul de la școală, logoped sau psiholog?",
          answer:
            "Foarte bine — se completează reciproc. Neurofeedback-ul lucrează la nivelul reglării atenției, în timp ce sprijinul educațional, logopedic sau psihologic lucrează la nivelul deprinderilor și al comportamentului. Atunci când copilul beneficiază de mai multe forme de sprijin în paralel, rezultatele sunt de obicei mai bune.",
        },
      ],
      relatedTitle: "Vezi și — Probleme conexe care apar frecvent împreună cu ADHD",
      ctaFinal: {
        title: "Vrei să afli dacă neurofeedback-ul ajută în cazul copilului tău?",
        text: "Programează o evaluare inițială gratuită. Discutăm situația lui și îți spunem onest dacă te putem ajuta.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },
  {
    slug: "brain-fog",
    category: "Cognitiv",
    name: "Brain fog",
    cardTitle: "Brain fog (ceață mentală)",
    cardDescription:
      "Gânduri încețoșate, memorie de scurtă durată slabă, dificultăți de concentrare. Mintea parcă funcționează cu frână de mână.",
    seo: {
      title: "Tratament brain fog (ceață mentală) | Emmanuel CliniX",
      description:
        "Neurofeedback pentru brain fog și ceață mentală. Limpezim concentrarea și claritatea mentală pe baza hărții cerebrale qEEG. Evaluare gratuită.",
    },
    related: ["burnout", "insomnie", "somn-neodihnitor"],
    landing: {
      hero: {
        eyebrow: "Tratament brain fog (ceață mentală) prin Neurofeedback",
        h1: "Nu „îmbătrânești” și nu „ai înnebunit”. Creierul tău funcționează cu frână de mână — și poate fi limpezit.",
        subtitle:
          "Ceața mentală — gânduri încețoșate, memorie slabă, concentrare imposibilă — nu e ceva ce trebuie să accepți. E un tipar de funcționare ineficientă a creierului, vizibil pe Brain Map (qEEG), pe care neurofeedback-ul îl poate corecta, fără medicație.",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title: "Te recunoști în asta? Semnele cele mai frecvente ale ceții mentale",
        items: [
          "Gânduri încețoșate, ca și cum mintea funcționează prin ceață",
          "Uiți cuvinte, nume sau de ce ai intrat într-o cameră",
          "Te concentrezi greu și obosești mental repede",
          "Citești același paragraf de mai multe ori fără să-l reții",
          "Lentoare în gândire și în luarea deciziilor",
          "Senzația că „nu mai ești la fel de ascuțit” ca înainte",
        ],
      },
      brain: {
        title: "Ceața mentală este un creier care funcționează ineficient",
        paragraphs: [
          "Brain fog-ul nu e un diagnostic în sine, ci semnul că rețelele de atenție și de procesare ale creierului nu mai lucrează eficient. Poate apărea după stres prelungit, somn prost, o boală (inclusiv post-viral), dezechilibre hormonale sau epuizare. Pe Brain Map (qEEG) se vede adesea ca un exces de unde lente în zonele frontale — exact regiunile responsabile de claritate și concentrare.",
          "Neurofeedback-ul antrenează aceste zone să revină la un tipar mai alert și mai eficient. Pe măsură ce creierul produce mai des undele asociate cu atenția și claritatea, mulți pacienți simt cum „se ridică ceața”: gândesc mai limpede, rețin mai ușor și obosesc mai greu mental. Lucrăm la mecanismul de bază, nu la simptom.",
          "Un lucru important: ceața mentală este un simptom, nu un diagnostic în sine, așa că la evaluare încercăm întâi să înțelegem ce o întreține — stres prelungit, somn prost, o perioadă post-virală sau epuizare. Brain Map-ul (qEEG) validează faptul că senzația ta este reală și arată tiparul de funcționare ineficientă, chiar și atunci când analizele de rutină ies normale. Pe baza lui, protocolul antrenează zonele de atenție să revină la un ritm mai alert. Fii realist împreună cu noi: dacă există în continuare o cauză activă, o abordăm împreună, fiindcă altfel ceața tinde să revină. Urmărim progresul obiectiv la fiecare 10 ședințe.",
        ],
      },
      approach: {
        title: "Un protocol care limpezește concentrarea, pe baza hărții cerebrale",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm despre cum se manifestă ceața mentală, de când și în ce context a apărut. Stabilim dacă neurofeedback-ul e potrivit.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Identificăm exact tiparele de funcționare ineficientă din zonele de atenție. Comparăm cu valorile normale pentru vârsta ta.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe prin care antrenăm claritatea și concentrarea. Fără medicamente.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Urmărim progresul la fiecare 10 ședințe și vedem, în date, cum se limpezește activitatea creierului.",
          },
        ],
      },
      testimonial: {
        quote:
          "După o perioadă foarte grea, am rămas cu o ceață mentală pe care n-o puteam explica nimănui — uitam tot, nu mă concentram, mă simțeam „prost”. După neurofeedback, mi-am recăpătat claritatea. Parcă cineva a șters geamul prin care priveam lumea.",
        name: "Diana P.",
        detail: "Brain fog — 16 ședințe",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "Ceața mentală e ceva real sau e „în capul meu”?",
          answer:
            "Este foarte reală și are o semnătură vizibilă pe Brain Map. Faptul că analizele de rutină ies normale nu înseamnă că totul e în regulă — qEEG-ul măsoară funcționarea creierului, nu structura.",
        },
        {
          question: "Din ce cauze apare?",
          answer:
            "Cel mai des din stres prelungit, somn de proastă calitate, epuizare, după infecții (inclusiv post-viral) sau dezechilibre hormonale. La evaluare încercăm să identificăm contextul, iar dacă bănuim o cauză medicală, te îndrumăm și către investigații.",
        },
        {
          question: "În cât timp se limpezește?",
          answer:
            "Mulți pacienți observă mai multă claritate în 10–20 de ședințe. Fiecare creier răspunde în ritmul lui, iar Brain Map-ul de control arată progresul obiectiv.",
        },
        {
          question: "Are legătură cu burnout-ul sau cu somnul prost?",
          answer:
            "Foarte des, da — ceața mentală e adesea un simptom al lor. De aceea protocolul ține cont de întreaga imagine, nu doar de concentrare.",
        },
        {
          question: "Câte ședințe sunt necesare ca să se limpezească ceața mentală?",
          answer:
            "Mulți pacienți observă mai multă claritate în 10–20 de ședințe, dar numărul exact depinde de cauza din spate (stres, somn prost, post-viral) și de ce arată Brain Map-ul. Urmărim progresul obiectiv la fiecare 10 ședințe.",
        },
        {
          question: "Ceața mea a apărut după o viroză sau după COVID. Ajută și în cazul ăsta?",
          answer:
            "Da, este una dintre situațiile frecvente cu care venim în contact. Ceața mentală post-virală apare adesea ca un exces de unde lente în zonele de atenție — exact tiparul pe care neurofeedback-ul îl antrenează. Răspunsul îl evaluăm individual.",
        },
        {
          question: "Se mențin rezultatele după terminarea ședințelor?",
          answer:
            "De regulă da, pentru că antrenăm creierul să revină la un tipar de funcționare mai eficient, pe care tinde să-l păstreze. Dacă există în continuare o cauză activă (somn prost, stres cronic), o abordăm împreună, ca rezultatul să dureze.",
        },
      ],
      relatedTitle: "Vezi și — Probleme conexe care provoacă ceață mentală",
      ctaFinal: {
        title: "Vrei să afli de ce gândești prin ceață?",
        text: "Programează o evaluare inițială gratuită. Ne uităm la situația ta și îți spunem onest dacă te putem ajuta.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },
  {
    slug: "dificultati-invatare-copii",
    category: "Cognitiv",
    name: "Dificultăți de învățare la copii",
    cardTitle: "Dificultăți de învățare la copii",
    cardDescription:
      "Citit, scris sau calcul mai greu decât la alți copii, deși se străduiește. De multe ori e un tipar cerebral care poate fi antrenat.",
    seo: {
      title: "Dificultăți de învățare la copii | Emmanuel CliniX",
      description:
        "Neurofeedback pentru dificultăți de învățare la copii. Antrenăm circuitele de atenție și procesare pe baza hărții cerebrale qEEG. Evaluare gratuită.",
    },
    related: ["adhd", "anxietate"],
    landing: {
      hero: {
        eyebrow: "Dificultăți de învățare la copii — Neurofeedback",
        h1: "Copilul tău nu e „leneș” și nu „nu se străduiește”. Creierul lui procesează diferit — și poate fi antrenat.",
        subtitle:
          "Când un copil se chinuie la citit, scris sau calcul deși se străduiește, de multe ori la mijloc este un tipar de funcționare a creierului, vizibil pe Brain Map (qEEG). Neurofeedback-ul antrenează circuitele de atenție și procesare, fără medicație.",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title:
          "Te recunoști în situația copilului tău? Semne frecvente ale dificultăților de învățare",
        items: [
          "Citește, scrie sau socotește mai greu decât colegii, deși se străduiește",
          "Se concentrează greu la teme și obosește repede mental",
          "Inversează litere/cifre sau citește foarte încet",
          "Evită temele și se descurajează ușor („nu sunt în stare”)",
          "Are rezultate sub potențialul lui real",
          "Profesorii spun că „ar putea, dacă ar fi mai atent”",
        ],
      },
      brain: {
        title: "Dificultățile de învățare au, de multe ori, o bază în funcționarea creierului",
        paragraphs: [
          "Un copil cu dificultăți de învățare nu are mai puțină inteligență sau mai puțină voință. De cele mai multe ori, anumite circuite — cele de atenție, de procesare a informației sau de coordonare — funcționează diferit, ceea ce face ca cititul, scrisul sau calculul să necesite un efort mult mai mare. Pe Brain Map (qEEG) aceste tipare devin vizibile.",
          "Neurofeedback-ul antrenează exact aceste circuite, ajutând creierul copilului să-și regleze mai bine atenția și procesarea. Pe măsură ce funcționarea se îmbunătățește, învățatul cere mai puțin efort, iar mulți părinți observă rezultate mai bune și, la fel de important, mai multă încredere în sine la copil. Antrenamentul se face sub formă de joc, potrivit vârstei.",
          "Spunem deschis părinților, ca să aibă așteptări corecte: neurofeedback-ul nu „vindecă” dislexia sau discalculia și nu înlocuiește logopedul ori sprijinul școlar. Ce poate face este să antreneze baza — atenția și procesarea — pe care se sprijină cititul, scrisul și calculul, astfel încât celelalte forme de sprijin să dea rezultate mai bune. Pentru că pornim de la Brain Map-ul copilului, protocolul vizează exact circuitele identificate la el, iar antrenamentul se face sub formă de joc, potrivit vârstei. La fel de important ca notele este încrederea în sine, pe care mulți copii o recapătă. Urmărim progresul obiectiv la fiecare 10 ședințe, alături de feedbackul vostru și al școlii.",
        ],
      },
      approach: {
        title: "Un protocol construit pe harta cerebrală a copilului tău",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm despre dificultățile copilului, despre contextul școlar și despre istoricul lui. Stabilim dacă neurofeedback-ul e potrivit.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Identificăm tiparele din circuitele de atenție și de procesare. Comparăm cu normele pentru vârsta copilului.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe sub formă de joc interactiv, potrivite pentru copii. Creierul învață, treptat, să se regleze singur.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Urmărim progresul la fiecare 10 ședințe. Părinții văd schimbări și acasă, și în rezultatele de la școală.",
          },
        ],
      },
      testimonial: {
        quote:
          "Băiatul nostru se chinuia la citit și ajunsese să creadă că „e prost”. Nu era — pur și simplu creierul lui obosea altfel. După neurofeedback, citește mult mai ușor, dar cel mai mult ne bucură că și-a recăpătat încrederea.",
        name: "Familia Dumitrescu",
        detail: "copil de 8 ani — 25 ședințe",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "De la ce vârstă se poate face neurofeedback?",
          answer:
            "De obicei de la 5–6 ani, când copilul poate sta concentrat pentru o ședință scurtă. Protocolul și jocul se adaptează la vârsta și la capacitatea lui de atenție.",
        },
        {
          question: "Dificultățile de învățare și ADHD-ul sunt același lucru?",
          answer:
            "Nu, deși se suprapun des și pot apărea împreună. Brain Map-ul ne ajută să vedem ce predomină în cazul copilului tău și să adaptăm protocolul. Dacă e nevoie, recomandăm și o evaluare psihopedagogică.",
        },
        {
          question: "Neurofeedback-ul înlocuiește logopedul sau sprijinul școlar?",
          answer:
            "Nu — se completează foarte bine cu ele. Neurofeedback-ul îmbunătățește baza (atenția și procesarea), ceea ce face ca logopedia și meditațiile să dea rezultate mai bune.",
        },
        {
          question: "În cât timp se văd rezultate?",
          answer:
            "Mulți părinți observă schimbări — la teme și la concentrare — după 15–20 de ședințe. Fiecare copil răspunde în ritmul lui, iar progresul se urmărește obiectiv pe Brain Map.",
        },
        {
          question: "Câte ședințe presupune programul pentru un copil?",
          answer:
            "De obicei între 20 și 40 de ședințe, în funcție de ce arată Brain Map-ul și de cum răspunde copilul. Repetăm harta de control la fiecare 10 ședințe, iar părinții văd progresul atât acasă, cât și la școală.",
        },
        {
          question: "Copilul meu are și dislexie sau discalculie. Poate ajuta?",
          answer:
            "Neurofeedback-ul nu „vindecă” direct dislexia sau discalculia, dar antrenează baza — atenția și procesarea — pe care se sprijină cititul și calculul. Combinat cu logopedia și sprijinul de specialitate, mulți copii progresează mai ușor. Evaluăm fiecare caz individual.",
        },
        {
          question: "Cum se simte copilul în timpul ședinței?",
          answer:
            "Pentru copil, ședința arată ca un joc pe ecran pe care îl „controlează” cu propria activitate cerebrală. Senzorii doar citesc semnalul, nu transmit nimic — nu doare și nu e neplăcut. Majoritatea copiilor așteaptă cu plăcere ședințele.",
        },
      ],
      relatedTitle: "Vezi și — Probleme conexe la copii",
      ctaFinal: {
        title: "Vrei să afli ce arată harta creierului copilului tău?",
        text: "Programează o evaluare inițială gratuită. Discutăm situația lui și îți spunem onest dacă îl putem ajuta.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },

  // ───────────────────────────── Performanță ────────────────────────────
  {
    slug: "performanta-cognitiva",
    category: "Performanță",
    name: "Performanță cognitivă & focus",
    cardTitle: "Performanță cognitivă și focus",
    cardDescription:
      "Nu ai un diagnostic, dar vrei mai mult: concentrare mai bună, claritate, control sub presiune. Creierul se poate optimiza.",
    seo: {
      title: "Performanță cognitivă și focus | Emmanuel CliniX",
      description:
        "Neurofeedback pentru performanță cognitivă și focus. Optimizăm concentrarea și claritatea mentală pe baza hărții cerebrale qEEG. Evaluare gratuită.",
    },
    related: ["brain-fog", "sportivi-performanta"],
    landing: {
      hero: {
        eyebrow: "Performanță cognitivă și focus — Neurofeedback",
        h1: "Nu ai un diagnostic. Vrei doar ca mintea ta să funcționeze la capacitate maximă — și se poate antrena.",
        subtitle:
          "Concentrare profundă, claritate sub presiune, control al atenției — toate depind de tipare cerebrale care pot fi optimizate. Pe baza unei hărți precise (qEEG), neurofeedback-ul antrenează creierul performant să devină și mai eficient.",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title: "Te regăsești aici? Ce vor să optimizeze cei care vin pentru performanță",
        items: [
          "Vrei să te concentrezi profund, fără să te distragi la fiecare notificare",
          "Cauți claritate și decizii bune sub presiune și deadline-uri",
          "Vrei să intri mai ușor în starea de „flow” și să rămâi în ea",
          "Simți că randamentul tău mental scade pe la mijlocul zilei",
          "Vrei o memorie de lucru și o viteză de gândire mai bune",
          "Nu ai o problemă medicală — vrei pur și simplu mai mult",
        ],
      },
      brain: {
        title: "Performanța mentală este un tipar cerebral care poate fi antrenat",
        paragraphs: [
          "Concentrarea, claritatea și controlul atenției nu sunt „talente” fixe — depind de cât de eficient își reglează creierul activitatea electrică. Cei care performează constant au, de regulă, un creier care intră ușor în starea potrivită pentru sarcină și iese din ea când trebuie. Pe Brain Map (qEEG) putem vedea unde stai tu față de acest profil optim.",
          "Neurofeedback-ul antrenează creierul să producă, la comandă, tiparele asociate cu focusul profund și cu claritatea. La fel cum un sportiv își antrenează corpul, tu îți antrenezi atenția și autoreglarea. Pentru că nu pornim de la o problemă, ci de la optimizare, lucrăm fin: țintim exact acele tipare care îți pot crește randamentul mental.",
          "Pentru că nu pornim de la o problemă medicală, ci de la optimizare, lucrăm fin și cu așteptări realiste: neurofeedback-ul nu îți „triplează” peste noapte capacitatea mentală, ci antrenează creierul să intre mai ușor în starea potrivită pentru sarcină și să rămână în ea. Brain Map-ul arată unde stai față de un profil optim pentru concentrare și control, iar protocolul țintește exact acele tipare. Spre deosebire de cafea sau de suplimente, care oferă un impuls trecător, aici câștigul se construiește și tinde să rămână, ca o deprindere bine fixată. Măsurăm progresul obiectiv la fiecare 10 ședințe și îl ajustăm pe obiectivele tale concrete.",
        ],
      },
      approach: {
        title: "Un protocol de optimizare construit pe harta ta cognitivă",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm despre obiectivele tale de performanță — focus, claritate, gestionarea presiunii. Stabilim ce poate fi optimizat.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Cartografiem activitatea creierului tău și vedem unde stai față de profilul optim pentru concentrare și control.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe în care antrenezi exact tiparele de focus și de autoreglare de care ai nevoie. Fără substanțe.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Măsurăm progresul obiectiv la fiecare 10 ședințe. Vezi în date cum se îmbunătățește atenția și claritatea.",
          },
        ],
      },
      testimonial: {
        quote:
          "Nu aveam o „problemă”, dar simțeam că nu funcționez la capacitate maximă — mă distrăgeam ușor, randamentul scădea după-amiaza. După neurofeedback, intru mult mai ușor în concentrare profundă și o țin ore întregi. Diferența la muncă e clară.",
        name: "Alexandru M.",
        detail: "antreprenor — 15 ședințe",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "Are sens neurofeedback-ul dacă nu am niciun diagnostic?",
          answer:
            "Absolut. O bună parte dintre cei care vin la noi nu au nicio afecțiune — vor doar să-și optimizeze concentrarea, claritatea și controlul sub presiune. Protocolul de performanță e construit exact pentru asta.",
        },
        {
          question: "Cu ce e diferit de cafea sau de suplimentele pentru focus?",
          answer:
            "Acelea oferă un impuls temporar și nu schimbă felul în care creierul se reglează. Neurofeedback-ul antrenează chiar capacitatea de a intra în focus la comandă — un câștig care se construiește și rămâne.",
        },
        {
          question: "Câte ședințe sunt necesare pentru optimizare?",
          answer:
            "Pentru obiective de performanță, mulți oameni observă rezultate în 10–15 ședințe. Numărul exact depinde de obiectivele tale și de ce arată Brain Map-ul.",
        },
        {
          question: "Pot combina cu sportul de performanță sau cu munca intensă?",
          answer:
            "Da, se combină foarte bine. Antrenamentul mental susține exact tipul de concentrare și control de care ai nevoie în muncă sau în sport.",
        },
        {
          question: "Cât de repede văd rezultate la concentrare?",
          answer:
            "Pentru obiective de performanță, mulți oameni observă o concentrare mai bună în 10–15 ședințe. Pentru că nu pornim de la o problemă, ci de la optimizare, progresul îl măsurăm obiectiv pe Brain Map și îl ajustăm pe obiectivele tale.",
        },
        {
          question: "Se mențin rezultatele după ce termin ședințele?",
          answer:
            "De obicei da. Neurofeedback-ul antrenează capacitatea creierului de a intra în focus la comandă — o abilitate care, odată dobândită, tinde să rămână, la fel ca o deprindere bine fixată. La nevoie, câteva ședințe de întreținere o consolidează.",
        },
        {
          question: "Ajută și la randamentul care scade după-amiaza?",
          answer:
            "Da, este unul dintre obiectivele frecvente. Scăderea de randament din a doua parte a zilei ține adesea de felul în care creierul își gestionează resursele atenționale — exact ce antrenăm, ca să-ți menții claritatea mai constant pe parcursul zilei.",
        },
      ],
      relatedTitle: "Vezi și — Optimizare și performanță cognitivă",
      ctaFinal: {
        title: "Vrei să afli cât de mult poate fi optimizat focusul tău?",
        text: "Programează o evaluare inițială gratuită. Discutăm obiectivele tale și îți spunem onest ce putem îmbunătăți.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },
  {
    slug: "sportivi-performanta",
    category: "Performanță",
    name: "Optimizare pentru sportivi de performanță",
    cardTitle: "Optimizare pentru sportivi de performanță",
    cardDescription:
      "Concentrare în momentele decisive, control al emoțiilor, refacere mentală. Antrenăm creierul la fel ca pe corp.",
    seo: {
      title: "Neurofeedback pentru sportivi | Emmanuel CliniX",
      description:
        "Neurofeedback pentru sportivi de performanță. Antrenăm focusul, controlul emoțional și refacerea mentală pe baza qEEG. Evaluare gratuită.",
    },
    related: ["performanta-cognitiva", "brain-fog"],
    landing: {
      hero: {
        eyebrow: "Neurofeedback pentru sportivi de performanță",
        h1: "Îți antrenezi corpul la maximum. Dar în momentele decisive, mintea face diferența — și se poate antrena la fel.",
        subtitle:
          "Concentrare în clipa decisivă, control al emoțiilor sub presiune, refacere mentală rapidă — toate depind de creier. Pe baza unei hărți precise (qEEG), neurofeedback-ul antrenează exact tiparele mentale care fac diferența în competiție.",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title: "Te regăsești aici? Ce vor să optimizeze sportivii care vin la noi",
        items: [
          "Vrei concentrare maximă fix în momentul decisiv",
          "„Te blochezi” sau cedezi mental sub presiunea competiției",
          "Emoțiile sau adrenalina îți strică execuția când contează",
          "Îți revii greu mental după greșeli sau după înfrângeri",
          "Vrei să intri în „zonă” (flow) mai des și mai constant",
          "Refacerea mentală după efort durează prea mult",
        ],
      },
      brain: {
        title: "În sportul de mare performanță, mintea face diferența",
        paragraphs: [
          "La nivel înalt, diferența dintre sportivi nu mai ține de condiția fizică, ci de minte: capacitatea de a rămâne concentrat sub presiune, de a-și controla emoțiile și de a intra în „zonă” la comandă. Toate acestea sunt tipare cerebrale, vizibile pe Brain Map (qEEG) — și, ca orice abilitate, pot fi antrenate.",
          "Neurofeedback-ul este folosit de sportivi de top și de echipe profesioniste tocmai pentru asta. Antrenăm creierul să producă, la comandă, tiparele asociate cu focusul, calmul sub presiune și refacerea rapidă. Practic, adaugi la antrenamentul fizic un antrenament al minții — partea care decide adesea rezultatul în competiție.",
          "Fii sigur de un lucru, mai ales dacă ești în competiție: neurofeedback-ul este antrenament mental, nu o substanță — nu introduce nimic în organism și este permis, motiv pentru care e folosit deschis de sportivi și de echipe de top. Nu îți garantăm rezultate sportive, fiindcă acelea depind de mulți factori; ce antrenăm este partea mentală pe care o controlezi: concentrarea în momentul decisiv, calmul sub presiune și revenirea rapidă după greșeli. Pornim de la Brain Map-ul tău ca să vedem cum răspunzi sub solicitare și construim un protocol pe obiectivele tale competiționale. Măsurăm progresul obiectiv la fiecare 10 ședințe și îl ajustăm înaintea competițiilor importante. Iar dacă obiectivele tale nu se potrivesc cu ce poate oferi realist metoda, îți spunem onest încă de la prima evaluare.",
        ],
      },
      approach: {
        title: "Un protocol de performanță mentală construit pe harta ta cerebrală",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm despre sportul tău, despre momentele în care mintea te limitează și despre obiectivele tale. Stabilim ce poate fi optimizat.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Cartografiem activitatea creierului și vedem cum răspunzi sub solicitare — focus, control emoțional, refacere.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe în care antrenezi exact tiparele de concentrare, calm sub presiune și revenire mentală de care ai nevoie.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Măsurăm progresul obiectiv la fiecare 10 ședințe și ajustăm protocolul pe obiectivele tale competiționale.",
          },
        ],
      },
      testimonial: {
        quote:
          "Fizic eram pregătit, dar în concursurile mari cedam mental — mă blocam exact când conta. Neurofeedback-ul m-a învățat să-mi controlez focusul și emoțiile sub presiune. Acum intru în „zonă” mult mai ușor și îmi revin rapid după greșeli.",
        name: "Ștefan D.",
        detail: "sportiv de performanță — 20 ședințe",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "Neurofeedback-ul chiar e folosit în sportul de performanță?",
          answer:
            "Da. Este folosit de sportivi de top și de echipe profesioniste din multe discipline pentru antrenamentul mental — focus, control emoțional și refacere. Noi îl aplicăm personalizat, pe baza Brain Map-ului tău.",
        },
        {
          question: "Cu ce mă ajută concret în competiție?",
          answer:
            "Cel mai des: concentrare mai bună în momentele decisive, mai mult calm sub presiune, intrare mai ușoară în „zonă” și revenire mentală mai rapidă după greșeli.",
        },
        {
          question: "Câte ședințe sunt necesare?",
          answer:
            "Pentru obiective de performanță, mulți sportivi observă rezultate în 10–20 de ședințe. Numărul exact depinde de obiectivele tale și de ce arată Brain Map-ul.",
        },
        {
          question: "Se combină cu antrenamentul fizic și cu psihologia sportivă?",
          answer:
            "Foarte bine. Neurofeedback-ul antrenează baza neurologică a performanței mentale și amplifică rezultatele muncii cu psihologul sportiv și ale antrenamentului fizic.",
        },
        {
          question: "Cât de repede apar rezultatele?",
          answer:
            "Mulți sportivi observă îmbunătățiri ale focusului și ale controlului sub presiune în 10–20 de ședințe. Măsurăm progresul obiectiv pe Brain Map și ajustăm protocolul pe obiectivele tale competiționale.",
        },
        {
          question: "Se mențin rezultatele în afara sezonului?",
          answer:
            "De obicei da, pentru că antrenezi o abilitate — intrarea în focus și calmul sub presiune — pe care creierul tinde s-o păstreze. Mulți sportivi fac câteva ședințe de întreținere înaintea competițiilor importante, ca să fie la vârf.",
        },
        {
          question: "Funcționează pentru orice sport?",
          answer:
            "Da. Principiile — concentrare în momentul decisiv, control emoțional, refacere mentală — sunt valabile în orice disciplină, individuală sau de echipă. Diferă doar accentul protocolului, pe care îl adaptăm la cerințele sportului tău.",
        },
        {
          question: "Este permis în competiții, nu intră la dopaj?",
          answer:
            "Da, este permis. Neurofeedback-ul este antrenament mental, nu o substanță — nu introduce nimic în organism, ci antrenează propriile tipare cerebrale. De aceea este folosit deschis de sportivi și de echipe de top.",
        },
      ],
      relatedTitle: "Vezi și — Optimizare pentru performanță",
      ctaFinal: {
        title: "Vrei să antrenezi partea mentală care decide competiția?",
        text: "Programează o evaluare inițială gratuită. Discutăm obiectivele tale sportive și îți spunem onest ce putem îmbunătăți.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },

  // ── Funnel LPs added with the dynamic quiz (new_modifications) ──────────
  {
    slug: "atacuri-panica",
    category: "Psihic & Emoțional",
    name: "Atacuri de panică",
    cardTitle: "Atacuri de panică",
    cardDescription:
      "Valuri bruște de frică, inimă care bate cu putere, senzația că îți pierzi controlul. Nu e „în capul tău” — e un sistem de alarmă hiperactiv, vizibil pe Brain Map.",
    seo: {
      title: "Tratament atacuri de panică fără medicamente | Emmanuel CliniX",
      description:
        "Neurofeedback pentru atacuri de panică. Antrenăm sistemul de alarmă al creierului să nu se mai declanșeze fals, pe baza qEEG, fără medicație. Evaluare gratuită.",
    },
    related: ["anxietate", "insomnie", "burnout"],
    landing: {
      hero: {
        eyebrow: "Tratament atacuri de panică prin Neurofeedback",
        h1: "Atacurile de panică nu sunt „în capul tău”. Sunt un sistem de alarmă blocat pe pornit — și poate fi reantrenat.",
        subtitle:
          "Un atac de panică e o descărcare a sistemului de alarmă al creierului atunci când nu există niciun pericol real. Pe Brain Map (qEEG) se vede tiparul de hiperactivare care îl declanșează — și pe care neurofeedback-ul îl poate antrena să revină la normal, fără medicație.",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title:
          "Te recunoști în asta? Semnele pe care le vedem cel mai des la persoanele cu atacuri de panică",
        items: [
          "Valuri bruște de frică intensă, care apar uneori fără un motiv clar",
          "Inima care bate cu putere, respirație scurtă, amețeală sau furnicături",
          "Senzația că îți pierzi controlul, că „o iei razna” sau că ți se face rău",
          "Frica de următorul atac — începi să eviți locuri sau situații",
          "Atacurile te trezesc noaptea sau apar în momente aparent liniștite",
          "Ai fost la urgențe convins că e ceva grav, dar analizele au ieșit bune",
        ],
      },
      brain: {
        title: "Panica este un sistem de alarmă care se declanșează fals",
        paragraphs: [
          "În spatele unui atac de panică stă un creier al cărui sistem de alarmă — în special amigdala și circuitele fricii — se activează brusc și disproporționat. Corpul primește semnalul de „pericol maxim” și pornește reacția de luptă-sau-fugă: inima accelerează, respirația se scurtează, mușchii se încordează. Problema nu e pericolul, ci alarma care se declanșează fals.",
          "Pe Brain Map (qEEG) vedem adesea tiparul de hiperactivare care întreține aceste declanșări și zonele care ar trebui să „pună frâna”, dar nu mai răspund bine. Neurofeedback-ul antrenează direct acest dezechilibru: ședință cu ședință, creierul învață să iasă mai ușor din starea de alertă și să nu mai treacă atât de repede în panică.",
          "Fii realist împreună cu noi: neurofeedback-ul nu îți promite că nu vei mai simți niciodată frică — frica e normală și utilă. Ce urmărim, pe baza Brain Map-ului tău, este ca pragul de la care se declanșează un atac să crească, iar atacurile să devină mai rare și mai blânde. Mulți pacienți observă întâi un somn mai bun și mai puțină tensiune de fond. Urmărim progresul obiectiv la fiecare 10 ședințe, iar dacă metoda nu e potrivită pentru tine, îți spunem deschis.",
        ],
      },
      approach: {
        title: "Un protocol construit pe harta cerebrală a sistemului tău de alarmă",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm despre cum și când apar atacurile, de când le ai și ce ai încercat. Stabilim dacă neurofeedback-ul e potrivit pentru cazul tău.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Identificăm tiparele de hiperactivare care întrețin panica și zonele implicate. Comparăm cu valorile normale pentru vârsta ta.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe de 30–45 de minute, relaxante, în care creierul învață să-și regleze singur starea de alertă. Fără medicamente, fără efecte secundare.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Urmărim frecvența și intensitatea atacurilor la fiecare 10 ședințe. Vezi în date cum se răresc, nu în impresii.",
          },
        ],
      },
      testimonial: {
        quote:
          "Aveam atacuri de panică săptămânale — ajunsesem să nu mai ies singură din casă. Brain Map-ul mi-a arătat exact ce se întâmpla. După câteva săptămâni de neurofeedback, atacurile s-au rărit, iar acum trec luni fără vreunul.",
        name: "Cristina M.",
        detail: "Atacuri de panică — 20 ședințe",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "Pot face neurofeedback dacă iau deja medicamente pentru panică?",
          answer:
            "Da. Mulți pacienți încep neurofeedback-ul în timp ce iau medicație, iar pe măsură ce creierul se reglează, reducerea se face treptat, sub coordonarea medicului. Nu îți modificăm noi tratamentul.",
        },
        {
          question: "Cu ce e diferit față de psihoterapie?",
          answer:
            "Se completează foarte bine. Psihoterapia lucrează la nivelul gândurilor și al reacțiilor; neurofeedback-ul lucrează direct la nivelul tiparului cerebral care declanșează atacul. Mulți pacienți le combină.",
        },
        {
          question: "În cât timp văd rezultate?",
          answer:
            "Mulți oameni observă primele schimbări — somn mai bun, mai puțină tensiune de fond, atacuri mai blânde — după 10–20 de ședințe. Fiecare creier răspunde în ritmul lui, iar Brain Map-ul de control îți arată progresul obiectiv.",
        },
        {
          question: "Atacurile mele apar noaptea. Ajută și în cazul ăsta?",
          answer:
            "Da. Atacurile de panică nocturne pornesc din același sistem de alarmă hiperactiv. Antrenând creierul să rămână într-o stare mai stabilă, inclusiv în somn, mulți pacienți raportează că se răresc.",
        },
        {
          question: "Doare sau e periculos în vreun fel?",
          answer:
            "Deloc. Neurofeedback-ul este non-invaziv — senzorii doar citesc activitatea electrică a creierului, nu transmit nimic spre el. Stai relaxat pe un scaun și nu simți nimic în timpul ședinței.",
        },
        {
          question: "Câte ședințe sunt necesare?",
          answer:
            "De obicei între 20 și 40 de ședințe, în funcție de cât de dese și de vechi sunt atacurile. Repetăm Brain Map-ul de control la fiecare 10 ședințe și ajustăm protocolul în funcție de cum răspunde creierul tău.",
        },
      ],
      relatedTitle: "Vezi și — Probleme conexe care apar frecvent împreună cu panica",
      ctaFinal: {
        title: "Vrei să afli dacă putem liniști sistemul tău de alarmă?",
        text: "Programează o evaluare inițială gratuită. Ne uităm la ce ți se întâmplă și îți spunem onest dacă te putem ajuta.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },
  {
    slug: "autism-tsa",
    category: "Cognitiv",
    name: "Tulburări de spectru autist (TSA)",
    cardTitle: "Autism (TSA) — sprijin prin Neurofeedback",
    cardDescription:
      "Ca sprijin alături de terapiile de specialitate, neurofeedback-ul poate ajuta la autoreglare, atenție și calm — pe baza unei hărți cerebrale, niciodată în locul echipei terapeutice.",
    seo: {
      title: "Autism (TSA) — neurofeedback ca sprijin | Emmanuel CliniX",
      description:
        "Neurofeedback ca terapie de sprijin în TSA, alături de echipa de specialitate. Antrenăm autoreglarea și atenția pe baza qEEG, fără promisiuni de „vindecare”. Evaluare gratuită.",
    },
    related: ["adhd", "dificultati-invatare-copii"],
    landing: {
      hero: {
        eyebrow: "Neurofeedback ca sprijin în tulburările de spectru autist",
        h1: "Nu promitem să „reparăm” autismul. Putem sprijini creierul copilului să se regleze mai bine — alături de echipa lui de terapie.",
        subtitle:
          "Autismul nu este o boală care se „vindecă”, iar noi nu prezentăm neurofeedback-ul ca pe un tratament al TSA. Este o terapie de sprijin, folosită alături de terapiile de specialitate (logopedie, ABA, terapie ocupațională), prin care antrenăm autoreglarea, atenția și calmul — pornind de la o hartă a creierului copilului (qEEG).",
        cta: "Află dacă vă putem sprijini →",
      },
      symptoms: {
        title: "Pentru ce dificultăți vine cel mai des sprijinul prin neurofeedback",
        items: [
          "Dificultăți de autoreglare emoțională — crize, frustrare greu de gestionat",
          "Atenție și concentrare fluctuante, ușor de perturbat",
          "Hipersensibilitate la sunete, lumină sau atingere",
          "Somn agitat sau greu de instalat",
          "Anxietate și rigiditate la schimbările de rutină",
          "Copilul are deja o echipă de terapie și căutați un sprijin complementar",
        ],
      },
      brain: {
        title: "Ce poate și ce nu poate face neurofeedback-ul în TSA",
        paragraphs: [
          "În tulburările de spectru autist, Brain Map-ul (qEEG) arată adesea tipare de reglare atipică — de exemplu în zonele legate de atenție, de procesarea senzorială sau de gestionarea stărilor emoționale. Aceste tipare nu „definesc” copilul, dar ne ajută să înțelegem unde un antrenament de autoreglare ar putea să-l sprijine.",
          "Neurofeedback-ul, aplicat cu blândețe și sub formă de joc, antrenează creierul să-și mențină stări mai stabile. Scopul realist nu este să schimbe cine este copilul, ci să reducă din disconfort: crize mai rare, un somn mai bun, mai mult calm și o atenție mai ușor de menținut — lucruri care fac terapiile de specialitate să meargă mai bine.",
          "Spunem foarte clar, pentru că este esențial: neurofeedback-ul NU este un tratament curativ al autismului și nu înlocuiește niciodată echipa de specialitate. Este strict o terapie de sprijin, complementară logopediei, terapiei ABA sau ocupaționale, și se aplică doar în coordonare cu specialiștii care se ocupă de copil. Nu promitem rezultate garantate; urmărim obiectiv, pe Brain Map, dacă antrenamentul de autoreglare ajută, iar dacă nu este potrivit pentru copilul vostru, vă spunem deschis de la început.",
        ],
      },
      approach: {
        title: "Un sprijin construit împreună cu echipa de terapie a copilului",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm despre copil, despre terapiile pe care le urmează deja și despre ce v-ați dori să se îmbunătățească. Stabilim, împreună cu ce recomandă specialiștii lui, dacă neurofeedback-ul are sens ca sprijin.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Cartografiem, cu blândețe, activitatea electrică, pentru a înțelege tiparele de reglare ale copilului. Comparăm cu valorile normale pentru vârsta lui.",
          },
          {
            title: "Protocol de neurofeedback sub formă de joc",
            description:
              "Ședințe scurte, adaptate la toleranța copilului, în care creierul antrenează autoreglarea. Ritmul îl dictează el, nu invers.",
          },
          {
            title: "Monitorizare în coordonare cu echipa de terapie",
            description:
              "Urmărim evoluția pe Brain Map și ținem legătura cu specialiștii copilului. Deciziile terapeutice rămân ale echipei lui.",
          },
        ],
      },
      testimonial: {
        quote:
          "Băiețelul nostru continuă logopedia și terapia ABA. Am adăugat neurofeedback-ul ca sprijin, cu acordul terapeuților. Am observat un copil mai calm, care doarme mai bine și tolerează mai ușor schimbările de program.",
        name: "Familia D.",
        detail: "părinții unui copil cu TSA — terapie de sprijin",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "Neurofeedback-ul vindecă autismul?",
          answer:
            "Nu. Autismul nu este o boală care se „vindecă”, iar noi nu îl prezentăm niciodată așa. Neurofeedback-ul este o terapie de sprijin, care poate ajuta la autoreglare, atenție și calm, folosită alături de terapiile de specialitate.",
        },
        {
          question: "Înlocuiește logopedia, ABA sau terapia ocupațională?",
          answer:
            "Niciodată. Este complementar acestor terapii, nu un substitut. Lucrăm doar în coordonare cu echipa care se ocupă deja de copil și pornim de la recomandările ei.",
        },
        {
          question: "De la ce vârstă se poate?",
          answer:
            "Depinde de copil — de cât poate sta liniștit pentru o ședință scurtă și de toleranța lui senzorială. La evaluarea inițială stabilim, cu blândețe, dacă și cum se poate adapta protocolul pentru el.",
        },
        {
          question: "Ce îmbunătățiri realiste ne putem aștepta?",
          answer:
            "Cel mai des, părinții raportează un copil mai calm, cu crize mai rare, somn mai bun și o atenție mai ușor de menținut. Nu promitem rezultate garantate; urmărim obiectiv, pe Brain Map, dacă antrenamentul ajută în cazul copilului vostru.",
        },
        {
          question: "Este o procedură sigură și confortabilă pentru copil?",
          answer:
            "Da. Neurofeedback-ul este non-invaziv — senzorii doar citesc activitatea creierului, nu transmit nimic spre el. Ședințele sunt scurte, sub formă de joc, și se adaptează complet la ritmul și la confortul copilului.",
        },
      ],
      relatedTitle: "Vezi și — Alte forme de sprijin pentru copil",
      ctaFinal: {
        title: "Vreți să aflați dacă neurofeedback-ul poate sprijini copilul?",
        text: "Programați o evaluare inițială gratuită. Discutăm situația lui, întotdeauna în coordonare cu echipa de terapie de specialitate.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },
  {
    slug: "adictii",
    category: "Psihic & Emoțional",
    name: "Adicții & dependențe (sprijin)",
    cardTitle: "Adicții și dependențe",
    cardDescription:
      "Obiceiuri sau substanțe care au preluat controlul. Ca sprijin alături de tratamentul de specialitate, antrenăm creierul spre autoreglare.",
    seo: {
      title: "Adicții și dependențe — sprijin prin neurofeedback | Emmanuel CliniX",
      description:
        "Neurofeedback ca sprijin în adicții și dependențe, alături de tratamentul de specialitate. Antrenăm autoreglarea pe baza qEEG. Evaluare gratuită.",
    },
    related: ["anxietate", "depresie", "burnout"],
    landing: {
      hero: {
        eyebrow: "Sprijin în adicții prin Neurofeedback",
        h1: "Dependența nu e un defect de caracter. E un tipar de recompensă care a preluat controlul în creier — și care poate fi reantrenat.",
        subtitle:
          "Fie că e vorba de un obicei (telefon, jocuri, pariuri) sau de o substanță, dependența acționează pe circuitul de recompensă al creierului. Ca sprijin alături de tratamentul de specialitate, neurofeedback-ul antrenează creierul spre mai multă autoreglare, pornind de la o hartă precisă (qEEG).",
        cta: "Află dacă te putem ajuta →",
      },
      symptoms: {
        title: "Te recunoști în asta? Semnele că un obicei sau o substanță a preluat controlul",
        items: [
          "Petreci mai mult timp (sau consumi mai mult) decât ți-ai propus",
          "Ai încercat de mai multe ori să reduci și n-ai reușit pe cont propriu",
          "Gândul revine constant chiar și când nu practici obiceiul",
          "Îl folosești ca să scapi de stres, plictiseală sau tristețe",
          "Iritabilitate sau neliniște când nu ai acces la el",
          "Cei apropiați au început să-și exprime îngrijorarea",
        ],
      },
      brain: {
        title: "Dependența este un circuit de recompensă rămas blocat",
        paragraphs: [
          "Orice adicție — comportamentală sau de substanță — acționează pe același mecanism: circuitul de recompensă al creierului, bazat pe dopamină. Cu timpul, acest circuit se recalibrează, plăcerile normale ale vieții par fade, iar creierul tratează obiceiul ca pe o necesitate. Pe Brain Map (qEEG) vedem adesea tipare de dezechilibru asociate cu impulsivitatea și cu dificultatea de a se autoregla.",
          "Ca terapie de sprijin, neurofeedback-ul antrenează creierul să-și întărească tocmai capacitatea de autoreglare și control al impulsului — „frâna” care slăbește în dependență. Este studiat ca abordare complementară și, la noi, se aplică întotdeauna alături de tratamentul de specialitate potrivit (psihoterapie, consiliere de adicție, program medical), niciodată în locul lui.",
          "Spunem deschis, de la început: neurofeedback-ul nu este un tratament de sine stătător al dependenței și nu înlocuiește sprijinul specializat, care rămâne baza. Este un sprijin complementar care, pornind de la Brain Map-ul tău, antrenează autoreglarea și controlul impulsului, în timp ce sursa reală a problemei este adresată împreună cu specialistul potrivit. Nu promitem că „scapi garantat”; rata de succes crește însă dramatic cu o abordare structurată, față de încercările solitare. Urmărim progresul obiectiv la fiecare 10 ședințe și, dacă metoda nu e potrivită pentru cazul tău, îți spunem onest. Foarte important: în cazul dependenței de alcool sau de alte substanțe, oprirea bruscă pe cont propriu poate fi periculoasă — primul pas este întotdeauna consultul medical.",
        ],
      },
      approach: {
        title: "O abordare de sprijin, alături de tratamentul de specialitate",
        steps: [
          {
            title: "Evaluare inițială gratuită",
            description:
              "Discutăm despre obiceiul sau substanța care te preocupă, despre ce ai încercat și despre contextul tău. Stabilim onest dacă și cum te putem sprijini, alături de tratamentul de specialitate.",
          },
          {
            title: "Brain Map (qEEG)",
            description:
              "Cartografiem activitatea electrică și identificăm tiparele asociate cu impulsivitatea și cu dificultatea de autoreglare.",
          },
          {
            title: "Protocol de neurofeedback personalizat",
            description:
              "Ședințe nedureroase prin care antrenăm autoreglarea și controlul impulsului, ca sprijin în paralel cu terapia sau programul de specialitate.",
          },
          {
            title: "Monitorizare și Brain Map de control",
            description:
              "Urmărim progresul la fiecare 10 ședințe și menținem legătura cu specialistul care te tratează.",
          },
        ],
      },
      testimonial: {
        quote:
          "Încercasem de ani de zile să mă opresc singur și eșuam mereu. Am combinat consilierea cu neurofeedback-ul — pentru prima dată am simțit că am o frână reală în fața impulsului. Nu a fost magie, a fost muncă, dar de data asta a ținut.",
        name: "Cătălin P.",
        detail: "dependență comportamentală — terapie de sprijin",
        isPlaceholder: true,
      },
      faq: [
        {
          question: "Neurofeedback-ul înlocuiește terapia sau programul de dezintoxicare?",
          answer:
            "Niciodată. Este strict un sprijin complementar, folosit alături de tratamentul de specialitate (psihoterapie, consiliere de adicție, program medical). Baza rămâne întotdeauna abordarea specializată, iar noi lucrăm în coordonare cu ea.",
        },
        {
          question: "Funcționează și pentru dependențe comportamentale (telefon, jocuri, pariuri)?",
          answer:
            "Da, tocmai pe acestea se aplică cel mai frecvent ca sprijin, pentru că mecanismul de recompensă din creier este același. Antrenăm autoreglarea și controlul impulsului, în timp ce sursa reală a comportamentului e adresată cu specialistul.",
        },
        {
          question: "Am o dependență de alcool sau de o substanță. Pot începe direct?",
          answer:
            "Primul pas obligatoriu este consultul medical — oprirea bruscă pe cont propriu poate fi periculoasă. Neurofeedback-ul poate interveni ca sprijin ulterior, în coordonare cu medicul și cu programul de specialitate, niciodată în locul lor.",
        },
        {
          question: "Îmi garantați că mă las?",
          answer:
            "Nu — nimeni onest nu poate garanta asta. Ce știm este că rata de succes crește dramatic cu o abordare structurată față de încercările solitare. Îți garantăm măsurarea corectă, un protocol pe baza Brain Map-ului tău și urmărirea obiectivă a progresului.",
        },
        {
          question: "Este confidențial?",
          answer:
            "Complet. Tot ce discutăm și rezultatele evaluării rămân strict confidențiale. Evaluarea inițială nu te obligă la nimic — îți oferă doar o imagine clară și pașii următori.",
        },
        {
          question: "Câte ședințe presupune un program de sprijin?",
          answer:
            "Depinde de tipul dependenței și de contextul tău, iar programul se desfășoară în ritmul stabilit împreună cu specialistul care te tratează. Repetăm Brain Map-ul de control la fiecare 10 ședințe și ajustăm protocolul în funcție de evoluție.",
        },
      ],
      relatedTitle: "Vezi și — Probleme conexe care însoțesc frecvent dependențele",
      ctaFinal: {
        title: "Vrei să afli dacă te putem sprijini să recapeți controlul?",
        text: "Programează o evaluare inițială gratuită. Discutăm situația ta, onest și confidențial, alături de tratamentul de specialitate potrivit.",
        button: "Programează evaluarea gratuită →",
      },
    },
  },
];

// ─────────────────────────────── Helpers ──────────────────────────────────

const bySlug = new Map(conditions.map((c) => [c.slug, c]));

export function getCondition(slug: string): Condition | undefined {
  return bySlug.get(slug);
}

export function allSlugs(): string[] {
  return conditions.map((c) => c.slug);
}

/** Resolve `related` slugs to full conditions, skipping any unknown slug. */
export function relatedConditions(condition: Condition): Condition[] {
  return condition.related
    .map((slug) => bySlug.get(slug))
    .filter((c): c is Condition => Boolean(c));
}
