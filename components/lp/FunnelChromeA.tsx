import type { ReactNode } from "react";

/**
 * Shared header/footer chrome for `/lp/somn` (variant A) — factored out so
 * `/lp/somn/multumim` can reuse the same logo/nav/footer without duplicating
 * the markup a third time (mirrors `FunnelChromeB`'s pattern for variant B).
 */
export function LogoMarkA({ size = 30 }: { size?: number }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 120 120" fill="none">
      <path d="M24 22 L64 60" stroke="url(#cyanGrad)" strokeWidth="15" strokeLinecap="round" />
      <path d="M24 98 L64 60" stroke="url(#cyanGrad)" strokeWidth="15" strokeLinecap="round" />
      <path d="M64 60 L98 94" stroke="#1C5F8C" strokeWidth="15" strokeLinecap="round" />
      <path d="M14 60 L42 60" stroke="#1C7FAE" strokeWidth="13" strokeLinecap="round" />
    </svg>
  );
}

export function GradientDefsA() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="cyanGrad" x1="10" y1="10" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2FE0F0" />
          <stop offset="1" stopColor="#0EA5BE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Clickable phone number in the header — the 45–65 audience calls more than
 * it fills forms, and `.nav-cta` is hidden below 900px (see lp-somn.css), so
 * without this the header has no action at all on mobile. */
export function HeaderA({ right }: { right: ReactNode }) {
  return (
    <header>
      <div className="nav wrap">
        <div className="logo">
          <LogoMarkA />
          <span className="logo-text">Emmanuel CliniX</span>
        </div>
        <div className="nav-right">
          <a href="tel:+40790099070" className="nav-phone" aria-label="Sună-ne">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>+40 790 099 070</span>
          </a>
          {right}
        </div>
      </div>
    </header>
  );
}

export function FooterA({ disclaimer }: { disclaimer?: string } = {}) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-logo-lockup">
            <LogoMarkA size={38} />
            <div className="foot-logo-text">
              <span className="l1">Emmanuel</span>
              <span className="l2">CliniX</span>
              <div className="tag">Longevity · Wellness · Neuro</div>
            </div>
          </div>
          <div className="foot-links">
            <div className="foot-col">
              <h4>PAGINĂ</h4>
              <a href="#rezultate">Rezultate</a>
              <a href="#faq">FAQ</a>
              <a href="#aplica">Aplică acum</a>
            </div>
            <div className="foot-col">
              <h4>CONTACT</h4>
              <a href="mailto:contact@emmanuelclinix.ro">contact@emmanuelclinix.ro</a>
              <a href="tel:+40790099070">+40 790 099 070</a>
            </div>
          </div>
        </div>
        <p className="disclaimer">
          {disclaimer ??
            "BrainMap este un instrument de evaluare inițială și nu constituie diagnostic medical. Rezultatele pot varia. Pentru simptome severe, recomandăm consultarea unui medic specialist."}
        </p>
        <div className="foot-bottom">
          <span>© 2026 Emmanuel CliniX. Toate drepturile rezervate.</span>
          <span>Politica de confidențialitate · Termeni și condiții</span>
        </div>
      </div>
    </footer>
  );
}
