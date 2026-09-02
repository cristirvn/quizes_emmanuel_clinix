"use client";

import { useEffect } from "react";

/**
 * The client's vanilla scripts for the BrainMap campaign LPs, ported into a
 * mount effect and scoped to the `.lp-brainmap` wrapper:
 *
 *  - the sticky bottom bar, which shows once the hero has scrolled past and
 *    hides again when the form comes into view (no point nagging someone who
 *    already reached it),
 *  - Enter/Space on the play buttons, which are divs in the source markup.
 *
 * The markup they drive is static JSX React never re-renders, so the direct DOM
 * reads are safe. Everything is torn down on unmount.
 */
export function LpBrainmapScripts({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    const cleanups: Array<() => void> = [];

    // ── Sticky bar ────────────────────────────────────────────────────────
    const bar = root.querySelector<HTMLElement>(".sticky");
    const hero = root.querySelector<HTMLElement>(".hero");
    const form = root.querySelector<HTMLElement>("#aplica");
    if (bar && hero && form) {
      const update = () => {
        const pastHero = hero.getBoundingClientRect().bottom < 0;
        const atForm = form.getBoundingClientRect().top < window.innerHeight;
        bar.classList.toggle("on", pastHero && !atForm);
      };
      window.addEventListener("scroll", update, { passive: true });
      update();
      cleanups.push(() => window.removeEventListener("scroll", update));
    }

    // ── Play buttons are divs — give them keyboard activation ──────────────
    root.querySelectorAll<HTMLElement>(".play").forEach((p) => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          p.click();
        }
      };
      p.addEventListener("keydown", handler);
      cleanups.push(() => p.removeEventListener("keydown", handler));
    });

    return () => cleanups.forEach((c) => c());
  }, [rootId]);

  return null;
}
