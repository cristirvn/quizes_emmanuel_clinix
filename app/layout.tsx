import type { Metadata } from "next";
import {
  Inter,
  Manrope,
  Fraunces,
  Playfair_Display,
  Montserrat,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { Analytics } from "@/components/Analytics";
import { SITE } from "@/lib/seo";

// Self-hosted at build time by next/font for speed (no external font fetch).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"], // latin-ext covers Romanian diacritics
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Modern serif for display headings (design evolution): premium + mature, still
// contemporary. latin-ext carries the Romanian diacritics (ă â î ș ț).
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600"],
});

// Quiz-only fonts (client ask 2026-08-23: pixel-match the live WordPress
// site's quiz design — emmanuel-clinix.ro/chestionare/*). Scoped to
// Quiz.tsx / ScoredQuiz.tsx / /chestionare via --font-quiz-* in globals.css;
// the rest of the site keeps Fraunces/Manrope.
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["600"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["800"],
});

// The BrainMap campaign LPs' only font (`/lp/*`, client's own design). Their
// source HTML pulls it from Google Fonts at runtime; self-hosting it here keeps
// the render-blocking request off a paid-traffic landing page. Scoped via `--f`
// on the `.lp-brainmap` wrapper — nothing else on the site uses it.
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: SITE.name,
    url: SITE.url,
    title: SITE.name,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${inter.variable} ${manrope.variable} ${fraunces.variable} ${playfairDisplay.variable} ${montserrat.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-navy">
        {/* Fail-safe: if JS never runs, Reveal content must still be visible. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
