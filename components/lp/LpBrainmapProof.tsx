"use client";

import { useCallback, useRef, useState } from "react";

/** [PLACEHOLDER] Names and runtimes from the client's markup; videos pending. */
const TESTIMONIALS = [
  { name: "Ernesto", len: "2:14" },
  { name: "Gabriela", len: "1:47" },
  { name: "Paulina", len: "3:02" },
];

/**
 * Section 7 of the BrainMap LPs — the three testimonial frames.
 *
 * On desktop the client's CSS lays them out as a plain three-column grid and
 * hides the controls. Under 960px the same markup becomes a horizontal
 * scroll-snap track with arrows and dots, which is what this component drives:
 * the arrows scroll the track, and the track's own scroll position decides the
 * active dot (so a swipe and an arrow press stay in sync).
 *
 * The client shipped this as DOM-level script; it lives in React instead
 * because the controls are stateful UI, and wiring listeners by hand onto
 * server-rendered nodes was silently failing to bind.
 *
 * The play buttons are inert until the client sends the videos.
 */
export function LpBrainmapProof() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /** Which card sits nearest the track's centre. */
  const nearest = useCallback((track: HTMLDivElement) => {
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".vid"));
    const centre = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let min = Infinity;
    cards.forEach((el, i) => {
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
      if (d < min) {
        min = d;
        best = i;
      }
    });
    return best;
  }, []);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".vid"));
    const i = Math.max(0, Math.min(cards.length - 1, index));
    const card = cards[i];
    if (!card) return;
    // `behavior: "instant"`, deliberately. The track is a `scroll-snap-type: x
    // mandatory` container, and Chrome cancels any programmatic SMOOTH scroll
    // on one — the snap springs it straight back to where it started, so the
    // arrows and dots would visibly do nothing. Verified both ways in the
    // browser: instant lands and snaps, smooth returns 0. Swiping is untouched
    // and still animates natively. `block: "nearest"` keeps the page still.
    card.scrollIntoView({ behavior: "instant", inline: "center", block: "nearest" });
    setActive(i);
  }, []);

  return (
    <>
      <div
        className="vids"
        ref={trackRef}
        tabIndex={0}
        onScroll={(e) => setActive(nearest(e.currentTarget))}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(active + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(active - 1);
          }
        }}
      >
        {TESTIMONIALS.map((t) => (
          <div className="vid" key={t.name}>
            <span className="dur">{t.len}</span>
            <div className="play" role="button" tabIndex={0} aria-label={`Pornește testimonialul: ${t.name}`}>
              <svg width="15" height="18" viewBox="0 0 22 26" aria-hidden="true">
                <path d="M0 0 L22 13 L0 26 Z" fill="#fff" />
              </svg>
            </div>
            <div className="cap">
              <b>{t.name}</b>
              <span>Testimonial complet</span>
            </div>
          </div>
        ))}
      </div>

      <div className="vnav">
        <button
          className="varrow"
          type="button"
          aria-label="Testimonialul anterior"
          disabled={active === 0}
          onClick={() => goTo(active - 1)}
        >
          <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden="true">
            <path
              d="M7.5 1 L1.5 7 L7.5 13"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="vdots" aria-label="Navighează printre testimoniale">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Testimonialul ${i + 1}`}
              aria-current={i === active ? "true" : "false"}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button
          className="varrow"
          type="button"
          aria-label="Testimonialul următor"
          disabled={active === TESTIMONIALS.length - 1}
          onClick={() => goTo(active + 1)}
        >
          <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden="true">
            <path
              d="M1.5 1 L7.5 7 L1.5 13"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
