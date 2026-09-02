/**
 * Shared questionnaire-package copy only.
 *
 * The main marketing pages remain in WordPress. On a dedicated questionnaire
 * subdomain, header/footer links intentionally return the visitor to WordPress
 * instead of pointing to routes that do not exist in this package.
 */
export interface NavLink {
  label: string;
  href: string;
}

const mainSiteUrl = (process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://emmanuel-clinix.ro").replace(/\/$/, "");
const mainSitePath = (path: string) => `${mainSiteUrl}${path}`;

export const nav = {
  cta: "Începe evaluarea →",
  links: [
    { label: "Servicii", href: mainSitePath("/servicii") },
    { label: "Chestionare", href: "/chestionare" },
    { label: "Despre noi", href: mainSitePath("/despre-noi") },
    { label: "Echipă", href: mainSitePath("/echipa") },
    { label: "Contact", href: mainSitePath("/contact") },
  ] satisfies NavLink[],
};

export const whatsapp = {
  href: "https://wa.me/40790099070",
  label: "Ai întrebări?",
  aria: "Scrie-ne pe WhatsApp",
};

export const leadForm = {
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

export const footer = {
  tagline: "Longevity. Wellness. Neuro.",
  description: "Clinică de neuroștiință aplicată din București.",
  columns: [
    {
      title: "Clinică",
      links: [
        { label: "Servicii", href: mainSitePath("/servicii") },
        { label: "Chestionare", href: "/chestionare" },
        { label: "Despre noi", href: mainSitePath("/despre-noi") },
        { label: "Echipă", href: mainSitePath("/echipa") },
        { label: "Tehnologie", href: mainSitePath("/tehnologie") },
        { label: "Contact", href: mainSitePath("/contact") },
      ] satisfies NavLink[],
    },
    {
      title: "Ce tratăm",
      links: [
        { label: "Migrene cronice", href: mainSitePath("/migrene") },
        { label: "Anxietate", href: mainSitePath("/anxietate") },
        { label: "Insomnie", href: mainSitePath("/insomnie") },
        { label: "ADHD", href: mainSitePath("/adhd") },
        { label: "Burnout", href: mainSitePath("/burnout") },
        { label: "Toate cele 15 probleme →", href: mainSitePath("/afectiuni") },
      ] satisfies NavLink[],
    },
  ],
  contact: {
    address: "Str. Pictor Alexandru Romano nr. 26, 030167 București",
    phone: "+40 790 099 070",
    email: "contact@emmanuelclinix.ro",
  },
};
