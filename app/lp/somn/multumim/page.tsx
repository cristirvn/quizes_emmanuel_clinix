import type { Metadata } from "next";
import { LpScripts } from "@/components/lp/LpScripts";
import { GradientDefsA, HeaderA, FooterA } from "@/components/lp/FunnelChromeA";
import "../lp-somn.css";

/**
 * Dedicated thank-you page for `/lp/somn`'s application form — copy verbatim
 * from `Formular_Aplicare_EmmanuelCliniX_1.docx` §5 ("ecranul de mulțumire").
 * Kept off the shared `/multumim` route (used by every other funnel on the
 * site) so this exact copy doesn't leak onto flows it wasn't written for —
 * same reasoning as `/lp/somn-b/multumim`.
 */
export const metadata: Metadata = {
  title: "Am primit aplicarea ta — Emmanuel CliniX",
  robots: { index: false, follow: false },
};

export default function LpSomnMultumimPage() {
  return (
    <div className="lp-somn" id="lp-somn-multumim-root">
      <GradientDefsA />
      <HeaderA right={null} />

      <section className="hero" style={{ padding: "56px 0 60px" }}>
        <div className="wrap-narrow">
          <span
            className="reveal"
            style={{
              display: "flex",
              width: 56,
              height: 56,
              margin: "0 auto 20px",
              borderRadius: "50%",
              background: "rgba(47,224,240,0.15)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#2FE0F0" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>
          <h1 className="reveal">Am primit-o. Mulțumim că ne-ai scris.</h1>
          <p className="sub reveal">
            Un om din echipă îți citește aplicarea personal și îți răspunde în cel mult 24 de ore. Până atunci nu
            trebuie să faci nimic.
          </p>
          <p className="sub reveal" style={{ marginTop: 14 }}>
            Dacă din ce ne-ai scris reiese că nu suntem noi răspunsul potrivit, îți spunem și asta, direct, și îți
            spunem încotro să te uiți.
          </p>
        </div>
      </section>

      <section className="section-light">
        <div className="wrap-narrow" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--muted)", fontSize: 15 }}>
            Dacă vrei să ne întrebi ceva între timp:{" "}
            <a href="mailto:contact@emmanuelclinix.ro" style={{ color: "var(--teal-deep)", fontWeight: 700 }}>
              contact@emmanuelclinix.ro
            </a>{" "}
            sau{" "}
            <a href="tel:+40790099070" style={{ color: "var(--teal-deep)", fontWeight: 700 }}>
              +40 790 099 070
            </a>
            .
          </p>
        </div>
      </section>

      <FooterA />
      <LpScripts rootId="lp-somn-multumim-root" />
    </div>
  );
}
