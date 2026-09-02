"use client";

import { useEffect } from "react";

/**
 * Full-screen "Calculăm răspunsurile tale…" popup (client ask, part 4): a dimmed
 * backdrop covers the page and a centered card shows a spinner + message while
 * the personalized result loads. Replaces the old in-place swap so the moment
 * reads as a deliberate "we're computing your answer" beat.
 *
 * Timing is randomised 5–10s by `calcDelayMs()` (client: "aleatoriu între 5-10
 * secunde") — the caller holds for that long, then reveals the result.
 */
export function calcDelayMs(): number {
  return 5000 + Math.floor(Math.random() * 5000); // 5000–9999 ms
}

export function CalculatingOverlay({ message }: { message: string }) {
  // Lock body scroll while the overlay is up so the dimmed page can't be moved.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-navy/70 px-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-live="polite"
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-2xl bg-white px-8 py-10 text-center shadow-2xl">
        <span
          className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-blue"
          aria-hidden
        />
        <p className="font-heading text-lg font-semibold leading-snug text-navy">{message}</p>
      </div>
    </div>
  );
}
