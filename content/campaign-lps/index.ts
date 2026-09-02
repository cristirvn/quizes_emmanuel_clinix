/**
 * The client's BrainMap campaign landing pages (`/lp/*`) — types + registry.
 *
 * Eight pages, one per condition, authored by the client as standalone HTML and
 * imported into `content/campaign-lps/<slug>.ts` by
 * `scripts/import-brainmap-lps.mjs`. This module owns only the SHAPE — never
 * the copy.
 *
 * Their own header comment splits each page into `[FIX]` blocks (identical
 * everywhere: the VSL, the mechanism, what the visit includes, the proof, the
 * promise, the last five FAQ entries, the footer, the sticky bar) and `[NIȘAT]`
 * blocks (rewritten per condition). Only the NIȘAT copy is modelled here; the
 * FIX structure is `components/lp/LpBrainmapTemplate.tsx`. That split is the
 * client's, not ours — keep it, because it is what makes a ninth page cheap.
 *
 * These pages are paid-traffic LPs and deliberately do NOT use the site's own
 * design system: they ship as the client built them, scoped under
 * `.lp-brainmap` (see `components/lp/lp-brainmap.css`).
 */

import { ANXIETATE_LP } from "@/content/campaign-lps/anxietate";
import { PANICA_LP } from "@/content/campaign-lps/panica";
import { BURNOUT_LP } from "@/content/campaign-lps/burnout";
import { FOCUS_LP } from "@/content/campaign-lps/focus";
import { DISPOZITIE_LP } from "@/content/campaign-lps/dispozitie";
import { MIGRENE_LP } from "@/content/campaign-lps/migrene";
import { STRES_LP } from "@/content/campaign-lps/stres";
import { ADICTII_LP } from "@/content/campaign-lps/adictii";

/** One of the three identification cards (section 2). */
export interface IdentificationCard {
  /** The moment or context — "Luni dimineața", "La birou", "În criză". */
  tag: string;
  text: string;
}

export interface BrainmapFaq {
  q: string;
  a: string;
}

export interface BrainmapLp {
  slug: string;
  /** Route under `/lp/<route>`. */
  route: string;
  /** Sent to GoHighLevel as the lead's `concern` — a `content/conditions.ts` slug. */
  concern: string;
  seo: { title: string };
  hero: {
    /** Contains an `<em>` the client uses to tint two to four words. */
    titleHtml: string;
    lede: string;
  };
  identificare: {
    cards: IdentificationCard[];
    /** The pivot line that hands over to the next section. */
    pull: string;
  };
  /** Section 3, in the client's mandated order, around the fixed kicker. */
  why: {
    /** What they've already tried, as a concrete list. */
    tried: string;
    /** Why it didn't hold: assumptions, not measurements. */
    assumption: string;
    /** What standing still costs — no medical fear. */
    cost: string;
    /** Closes the heart / blood-test / brain analogy. */
    analogy: string;
  };
  /** Section 5, step 2 — the one sentence naming this condition. */
  mapSentence: string;
  qualify: {
    /** The first three "e pentru tine dacă" rows; the last two are fixed. */
    fits: string[];
    /**
     * An extra "nu aplica dacă" row for conditions that need a safety
     * carve-out (panic → rule out cardiac causes first; migraine → sudden or
     * new headaches; addiction → physical withdrawal; mood → self-harm).
     * `null` where the client didn't add one.
     */
    extraExclusion: string | null;
  };
  /** The two niched FAQ entries; the rest of the list is fixed. */
  faq: BrainmapFaq[];
  form: {
    title: string;
    situatieLabel: string;
    /** Three condition-specific options; "Mai multe dintre ele" is appended. */
    situatieOptions: string[];
    durataLabel: string;
    incercatPlaceholder: string;
  };
  /** The footer's medical disclaimer — several pages add a condition-specific warning. */
  legal: string;
}

/** All BrainMap LPs, keyed by route slug. */
export const brainmapLps: Record<string, BrainmapLp> = {
  anxietate: ANXIETATE_LP,
  panica: PANICA_LP,
  burnout: BURNOUT_LP,
  focus: FOCUS_LP,
  dispozitie: DISPOZITIE_LP,
  migrene: MIGRENE_LP,
  stres: STRES_LP,
  adictii: ADICTII_LP,
};

export const brainmapLpList: BrainmapLp[] = Object.values(brainmapLps);

export function getBrainmapLp(slug: string): BrainmapLp | null {
  return brainmapLps[slug] ?? null;
}
