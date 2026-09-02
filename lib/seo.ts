/**
 * Site-wide constants + a metadata helper used by `generateMetadata`
 * across pages. Kept tiny in Phase 0; pages flesh out their own meta later.
 */
import type { Metadata } from "next";

export const SITE = {
  name: "Emmanuel CliniX",
  /** Final domain TBD with client (guide examples use emmanuelclinix.ro). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://emmanuelclinix.ro",
  description:
    "Clinică de neuroștiință aplicată din București. Neurofeedback și brain mapping (qEEG) pentru anxietate, insomnie, ADHD, migrene și recuperare neurologică.",
} as const;

/**
 * Build per-page metadata with sensible brand defaults + canonical URL.
 *
 * The root layout adds a `%s — Emmanuel CliniX` title template, so most pages
 * pass a brand-free `title`. The condition landings, however, carry SEO titles
 * that already include the brand (tuned to ≤60 chars) — pass `branded: true`
 * for those so the title is treated as absolute and the suffix isn't doubled.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  branded = false,
}: {
  title: string;
  description: string;
  path?: string;
  branded?: boolean;
}): Metadata {
  const url = new URL(path, SITE.url).toString();
  return {
    title: branded ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: branded ? title : `${title} — ${SITE.name}`,
      description,
      url,
      type: "website",
      locale: "ro_RO",
      siteName: SITE.name,
    },
  };
}
