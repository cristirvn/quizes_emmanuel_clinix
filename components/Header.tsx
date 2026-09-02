"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { nav } from "@/content/site";
import { CtaButton } from "@/components/CtaButton";
import { MobileNav } from "@/components/MobileNav";

/**
 * Sticky header — logo + the full-site nav (Servicii / Chestionare / Despre noi
 * / Echipă / Contact) + one primary CTA into the quiz. The CTA points at the
 * SAME funnel action as the rest of the site, so it reinforces rather than
 * competes with the in-page CTAs.
 */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Emmanuel CliniX — acasă">
          <Image
            src="/logo.svg"
            alt="Emmanuel CliniX"
            width={966}
            height={258}
            priority
            unoptimized // SVG — already vector; skip the optimizer (no 2048px raster)
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Navigare principală"
          className="hidden items-center gap-7 lg:flex"
        >
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 text-base font-medium text-navy transition-colors hover:text-blue"
            >
              {link.label}
            </Link>
          ))}
          <CtaButton className="px-5 py-2.5 text-sm">{nav.cta}</CtaButton>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Închide meniul" : "Deschide meniul"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-navy lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" aria-hidden="true">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6 6 18" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && <MobileNav onNavigate={() => setMobileOpen(false)} />}
    </header>
  );
}
