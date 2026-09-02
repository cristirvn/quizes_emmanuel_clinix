import Link from "next/link";
import { SITE } from "@/lib/seo";
import { footer } from "@/content/site";

/**
 * Footer — brand line, nav columns and contact details from `content/site.ts`.
 * Contact details are [PLACEHOLDER] until the client provides them.
 */
export function Footer() {
  return (
    <footer className="border-t border-line bg-cloud">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-heading text-lg font-semibold text-navy">{SITE.name}</p>
            <p className="mt-1 text-sm font-medium uppercase tracking-wide text-teal-700">
              {footer.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted">{footer.description}</p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="font-heading text-sm font-semibold text-navy">{col.title}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-muted transition-colors hover:text-navy">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-heading text-sm font-semibold text-navy">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>{footer.contact.address}</li>
              <li>{footer.contact.phone}</li>
              <li>{footer.contact.email}</li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-xs text-muted">
          © {new Date().getFullYear()} {SITE.name}. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}
