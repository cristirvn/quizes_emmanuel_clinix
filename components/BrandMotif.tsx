/**
 * Signature brand texture (design evolution) — soft topographic "contour" lines
 * evoking a qEEG brain map. Purely decorative, static (no animation — respects
 * the one-`Reveal` animation budget), and low-opacity so it adds premium texture
 * without competing with the copy. Ties the visual language to the actual product.
 *
 * Rendered as an absolutely-positioned, aria-hidden layer; the parent must be
 * `relative` (and usually `overflow-hidden`). Teal is used here — this is one of
 * the few places the brand accent shows up at scale.
 */
export function BrandMotif({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="var(--color-teal)" strokeWidth="1.25" opacity="0.14">
          {/* Nested, gently-offset contour lines — like an EEG topography map. */}
          <path d="M-40 150 C 220 60, 480 240, 760 150 S 1240 40, 1300 150" />
          <path d="M-40 210 C 240 120, 500 300, 780 210 S 1240 110, 1300 210" />
          <path d="M-40 270 C 200 190, 520 360, 800 270 S 1240 190, 1300 270" />
          <path d="M-40 330 C 260 250, 480 420, 760 330 S 1240 250, 1300 330" />
          <path d="M-40 390 C 220 310, 540 470, 820 390 S 1240 320, 1300 390" />
          <path d="M-40 450 C 240 380, 500 520, 780 450 S 1240 390, 1300 450" />
        </g>
      </svg>
    </div>
  );
}
