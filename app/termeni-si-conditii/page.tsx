import type { Metadata } from "next";
import { footer } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";

/**
 * Legal skeleton page, linked from the mandatory consent checkbox in
 * `LeadCapture`. [PLACEHOLDER] body — the clinic's actual terms need legal
 * review before launch; `noindex` until then.
 */
export const metadata: Metadata = {
  ...buildMetadata({
    title: "Termeni și Condiții — Emmanuel CliniX",
    description: "Termenii și condițiile de utilizare a site-ului și serviciilor Emmanuel CliniX.",
    path: "/termeni-si-conditii",
  }),
  robots: { index: false, follow: true },
};

export default function TermeniPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Termeni și Condiții" />
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16 text-muted sm:py-20">
          <p className="rounded-xl border border-line bg-bone p-5 text-sm text-navy">
            [PLACEHOLDER] Text în lucru — va fi revizuit juridic înainte de lansare.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h2 className="font-heading text-lg font-semibold text-navy">1. Furnizorul serviciului</h2>
              <p className="mt-2">
                {footer.contact.address ? `${footer.contact.address}. ` : "[PLACEHOLDER] Sediu clinică. "}
                Contact: {footer.contact.phone} · {footer.contact.email}.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-navy">2. Utilizarea site-ului</h2>
              <p className="mt-2">
                [PLACEHOLDER] Condiții de acces și utilizare a informațiilor publicate pe site.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-navy">3. Programări și servicii medicale</h2>
              <p className="mt-2">
                [PLACEHOLDER] Natura evaluării BrainMap, caracterul orientativ al rezultatelor și condițiile de
                programare/anulare.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-navy">4. Limitarea răspunderii</h2>
              <p className="mt-2">[PLACEHOLDER] Clauze standard de limitare a răspunderii.</p>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-navy">5. Contact</h2>
              <p className="mt-2">
                Pentru întrebări legate de acești termeni: {footer.contact.email}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
