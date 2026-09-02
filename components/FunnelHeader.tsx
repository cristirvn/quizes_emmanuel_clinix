import Image from "next/image";
import Link from "next/link";
import { footer } from "@/content/site";

/**
 * Minimal funnel topbar (S0) for `/evaluare` + `/rezultat/*`. Logo + clinic
 * phone + one optional CTA — deliberately NO nav. On a conversion funnel every
 * nav link is a leak (client deck is explicit), so the only ways off the page
 * are the two things that still push toward the goal: calling, or the CTA.
 *
 * Uses the real clinic phone from `content/site` (not the LP `[PLACEHOLDER]`).
 * `cta.href` starting with `#` scrolls within the current page (used on the
 * result page to jump to the offer); anything else is a normal link.
 */
export function FunnelHeader({ cta }: { cta?: { label: string; href: string } }) {
  const phone = footer.contact.phone;
  const tel = phone.replace(/[^\d+]/g, "");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Emmanuel CliniX — acasă">
          <Image
            src="/logo.svg"
            alt="Emmanuel CliniX"
            width={966}
            height={258}
            priority
            unoptimized
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${tel}`}
            className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-navy transition-colors hover:text-blue"
            aria-label={`Sună la ${phone}`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" aria-hidden>
              <path
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">{phone}</span>
          </a>

          {cta && (
            <a
              href={cta.href}
              className="inline-flex items-center justify-center rounded-2xl bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue"
            >
              {cta.label}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
