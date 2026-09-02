import type { Metadata } from "next";
import { footer } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";

/**
 * Legal skeleton page, linked from the mandatory consent checkbox in
 * `LeadCapture`. [PLACEHOLDER] body — the clinic's actual GDPR policy needs
 * legal review before launch; `noindex` until then.
 */
export const metadata: Metadata = {
  ...buildMetadata({
    title: "Politica de Confidențialitate — Emmanuel CliniX",
    description: "Cum colectează și prelucrează Emmanuel CliniX datele cu caracter personal, conform GDPR.",
    path: "/politica-de-confidentialitate",
  }),
  robots: { index: false, follow: true },
};

export default function PoliticaConfidentialitatePage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Politica de Confidențialitate" />
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16 text-muted sm:py-20">
          <p className="rounded-xl border border-line bg-bone p-5 text-sm text-navy">
            [PLACEHOLDER] Text în lucru — va fi revizuit juridic (GDPR) înainte de lansare.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h2 className="font-heading text-lg font-semibold text-navy">1. Operatorul de date</h2>
              <p className="mt-2">
                {footer.contact.address ? `${footer.contact.address}. ` : "[PLACEHOLDER] Sediu clinică. "}
                Contact: {footer.contact.phone} · {footer.contact.email}.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-navy">2. Ce date colectăm</h2>
              <p className="mt-2">
                Nume, telefon și, opțional, e-mail, colectate prin formularele de pe site (chestionare,
                pagină de contact). [PLACEHOLDER] Detalii complete despre orice alte date colectate.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-navy">3. Scopul prelucrării</h2>
              <p className="mt-2">
                Pentru a te contacta telefonic sau prin e-mail în legătură cu rezultatul evaluării și
                pentru a-ți oferi informații despre serviciile clinicii. [PLACEHOLDER] Bază legală și
                perioadă de stocare.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-navy">4. Drepturile tale</h2>
              <p className="mt-2">
                [PLACEHOLDER] Dreptul de acces, rectificare, ștergere, opoziție și portabilitate a datelor,
                conform GDPR.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-navy">5. Contact</h2>
              <p className="mt-2">
                Pentru exercitarea drepturilor GDPR: {footer.contact.email}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
