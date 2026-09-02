import { SITE } from "@/lib/seo";
import { footer } from "@/content/site";

/**
 * Minimal funnel footer (S13) for `/evaluare` + `/rezultat/*`. Just brand,
 * address, phone and a confidentiality line — NO nav columns and NO condition
 * links (those are the conversion leaks the full-site `Footer` carries for SEO).
 * The only footer link is the phone, which is still a conversion action.
 */
export function FunnelFooter() {
  const phone = footer.contact.phone;
  const tel = phone.replace(/[^\d+]/g, "");

  return (
    <footer className="border-t border-line bg-cloud">
      <div className="mx-auto max-w-4xl px-5 py-8 text-center">
        <p className="font-heading text-base font-semibold text-navy">{SITE.name}</p>
        <p className="mt-1 text-sm text-muted">{footer.contact.address}</p>
        <a
          href={`tel:${tel}`}
          className="mt-2 inline-block text-sm font-medium text-navy transition-colors hover:text-blue"
        >
          {phone}
        </a>
        <p className="mt-4 text-xs text-muted">
          Datele tale sunt confidențiale. © {new Date().getFullYear()} {SITE.name}.
        </p>
      </div>
    </footer>
  );
}
