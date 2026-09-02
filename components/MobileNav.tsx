import Link from "next/link";
import { nav } from "@/content/site";
import { CtaButton } from "@/components/CtaButton";

/**
 * Mobile menu panel — the full-site nav plus one primary CTA into the quiz,
 * matching the desktop header.
 */
export function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden">
      <nav className="mx-auto max-w-6xl px-5 py-4" aria-label="Navigare mobilă">
        <ul className="divide-y divide-line">
          {nav.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onNavigate}
                className="block py-3 text-lg font-medium text-navy"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <CtaButton onClick={onNavigate} className="mt-5 w-full px-6 py-3.5 text-base">
          {nav.cta}
        </CtaButton>
      </nav>
    </div>
  );
}
