"use client";

import { useEffect } from "react";

/**
 * The client's own vanilla scripts for the standalone LP (`/lp/somn`), ported
 * verbatim into a mount effect: Reveal-on-scroll, the FAQ accordion, and his
 * clone-based infinite testimonial carousels. The markup they drive is static
 * JSX that React never re-renders, so their direct DOM manipulation (cloneNode,
 * classList, inline transforms) is safe.
 *
 * Scoped to `root` (the `.lp-somn` wrapper) so nothing touches the rest of the
 * app — though on the `/lp/*` routes there is no site chrome anyway.
 */
export function LpScripts({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    // ── Reveal on scroll ──────────────────────────────────────────────────
    const revealEls = root.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealEls.forEach((el) => io.observe(el));

    // ── FAQ accordion ─────────────────────────────────────────────────────
    const accHandlers: Array<[Element, () => void]> = [];
    root.querySelectorAll(".acc-item").forEach((item) => {
      const q = item.querySelector(".acc-q");
      if (!q) return;
      const handler = () => item.classList.toggle("open");
      q.addEventListener("click", handler);
      accHandlers.push([q, handler]);
    });

    // ── Carousels (clone-based infinite filmstrip) ────────────────────────
    const cleanups: Array<() => void> = [];
    function initCarousel2D(carRoot: Element) {
      const track = carRoot.querySelector<HTMLElement>(".car2d-track");
      const viewport = carRoot.querySelector<HTMLElement>(".car2d-viewport");
      if (!track || !viewport) return;
      const realSlides = Array.from(track.children) as HTMLElement[];
      const n = realSlides.length;
      if (!n) return;

      const firstClone = realSlides[0].cloneNode(true) as HTMLElement;
      const lastClone = realSlides[n - 1].cloneNode(true) as HTMLElement;
      firstClone.setAttribute("aria-hidden", "true");
      lastClone.setAttribute("aria-hidden", "true");
      firstClone.tabIndex = -1;
      lastClone.tabIndex = -1;
      track.insertBefore(lastClone, realSlides[0]);
      track.appendChild(firstClone);

      const slides = Array.from(track.children) as HTMLElement[];
      let current = 1;
      let transitioning = false;
      let cardWidth = 0;
      let slot = 0;

      const dotsWrap = carRoot.querySelector<HTMLElement>(".car-dots");
      if (!dotsWrap) return;
      dotsWrap.innerHTML = realSlides
        .map(
          (_, i) =>
            `<button type="button" class="car-dot" data-i="${i}" aria-label="Testimonial ${i + 1}"></button>`,
        )
        .join("");
      const dots = Array.from(dotsWrap.querySelectorAll(".car-dot"));

      function measure() {
        cardWidth = slides[1].getBoundingClientRect().width;
        const gap =
          parseFloat(getComputedStyle(track!).columnGap || getComputedStyle(track!).gap) || 24;
        slot = cardWidth + gap;
      }
      function applyOpacity() {
        slides.forEach((slide, i) => {
          const abs = Math.abs(i - current);
          const opacity = abs === 0 ? 1 : abs === 1 ? 0.32 : 0;
          slide.style.opacity = String(opacity);
          slide.style.pointerEvents = abs === 0 ? "auto" : "none";
        });
      }
      function updateDots() {
        const realIndex = (((current - 1) % n) + n) % n;
        dots.forEach((d, i) => d.classList.toggle("active", i === realIndex));
      }
      function moveTo(index: number, animate: boolean) {
        if (!animate) track!.classList.add("notransition");
        const vw = viewport!.clientWidth;
        track!.style.transform = `translateX(${vw / 2 - cardWidth / 2 - index * slot}px)`;
        if (!animate) {
          void track!.offsetHeight;
          track!.classList.remove("notransition");
        }
        applyOpacity();
        updateDots();
      }
      function onTransitionEnd(e: TransitionEvent) {
        if (e.target !== track || e.propertyName !== "transform") return;
        if (current === n + 1) {
          current = 1;
          moveTo(current, false);
        } else if (current === 0) {
          current = n;
          moveTo(current, false);
        }
        transitioning = false;
      }
      function step(dir: number) {
        if (transitioning) return;
        transitioning = true;
        current += dir;
        moveTo(current, true);
      }
      track.addEventListener("transitionend", onTransitionEnd as EventListener);
      const prevBtn = carRoot.querySelector(".car-prev");
      const nextBtn = carRoot.querySelector(".car-next");
      const onPrev = () => step(-1);
      const onNext = () => step(1);
      prevBtn?.addEventListener("click", onPrev);
      nextBtn?.addEventListener("click", onNext);
      dots.forEach((d, i) =>
        d.addEventListener("click", () => {
          if (transitioning || i + 1 === current) return;
          transitioning = true;
          current = i + 1;
          moveTo(current, true);
        }),
      );

      let startX: number | null = null;
      const onDown = (e: PointerEvent) => {
        startX = e.clientX;
      };
      const onUp = (e: PointerEvent) => {
        if (startX === null) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
        startX = null;
      };
      viewport.addEventListener("pointerdown", onDown);
      viewport.addEventListener("pointerup", onUp);

      const onResize = () => {
        measure();
        moveTo(current, false);
      };
      window.addEventListener("resize", onResize);

      measure();
      moveTo(current, false);

      cleanups.push(() => {
        track.removeEventListener("transitionend", onTransitionEnd as EventListener);
        prevBtn?.removeEventListener("click", onPrev);
        nextBtn?.removeEventListener("click", onNext);
        viewport.removeEventListener("pointerdown", onDown);
        viewport.removeEventListener("pointerup", onUp);
        window.removeEventListener("resize", onResize);
      });
    }
    root.querySelectorAll(".carousel2d").forEach(initCarousel2D);

    return () => {
      io.disconnect();
      accHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      cleanups.forEach((c) => c());
    };
  }, [rootId]);

  return null;
}
