import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrainmapLp } from "@/content/campaign-lps";
import { LpBrainmapTemplate } from "@/components/lp/LpBrainmapTemplate";

/**
 * The client's BrainMap campaign LP for this condition. Copy lives in
 * `content/campaign-lps/panica.ts` (generated — see the importer); the shared
 * page structure is `LpBrainmapTemplate`. Paid traffic only, so `noindex`.
 */
const lp = getBrainmapLp("panica");

export const metadata: Metadata = {
  // The client's title already carries the brand, so bypass the layout template.
  title: { absolute: lp?.seo.title ?? "Emmanuel CliniX" },
  robots: { index: false, follow: true },
};

export default function LpPanicaPage() {
  if (!lp) notFound();
  return <LpBrainmapTemplate lp={lp} />;
}
