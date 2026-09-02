import type { Metadata } from "next";
import { LpScripts } from "@/components/lp/LpScripts";
import { LpApplyB } from "@/components/lp/LpApplyB";
import { FunnelProgressB } from "@/components/lp/FunnelProgressB";
import { GradientDefsB, HeaderB, FooterB } from "@/components/lp/FunnelChromeB";
import "../lp-somn-b.css";

export const metadata: Metadata = {
  title: "Aplică pentru BrainMap — Emmanuel CliniX",
  description: "Completează aplicația pentru evaluarea BrainMap. Lucrăm doar cu oameni potriviți și implicați.",
  robots: { index: false, follow: true },
};

const WRITTEN_TESTIMONIALS = [
  { i: "AM", n: "Andreea M.", r: "Cluj-Napoca", q: "Prima noapte întreagă din ultimii 2 ani. Am plâns de bucurie." },
  { i: "RP", n: "Radu P.", r: "București", q: "Mi-au spus DE CE nu dorm. Nimeni nu-mi spusese asta în 5 ani." },
  { i: "GV", n: "Gheorghe V.", r: "Brașov", q: "La 63 de ani credeam că e prea târziu. Nu era." },
  { i: "ID", n: "Ioana D.", r: "Timișoara", q: "Energia de dimineață s-a întors complet." },
  { i: "CB", n: "Cristian B.", r: "Iași", q: "Nu mai iau pastile de somn. Dorm natural acum." },
  { i: "MT", n: "Maria T.", r: "Constanța", q: "Ceața din minte a dispărut. Gândesc din nou clar." },
  { i: "EN", n: "Elena N.", r: "Sibiu", q: "Soțul meu mi-a zis că par alt om. Mai calmă, mai odihnită." },
  { i: "DP", n: "Dan P.", r: "Oradea", q: "Plan făcut pentru mine, nu sfaturi de pe internet." },
];

const VIDEO_TESTIMONIALS = [
  { g: "g1", len: "1:58", name: "Mihaela R.", role: "De la 3h la 6h somn" },
  { g: "g2", len: "2:22", name: "Bogdan S.", role: "Fără pastile de somn de 2 luni" },
  { g: "g3", len: "1:35", name: "Corina L.", role: "Cauza găsită la prima evaluare" },
];

export default function LpSomnBAplicatiePage() {
  return (
    <div className="lp-somn-b" id="lp-somn-b-aplicatie-root">
      <GradientDefsB />
      <HeaderB right={<span className="nav-step">Pasul 2 din 3</span>} />
      <FunnelProgressB step={2} />

      {/* ===== INTRO + VIDEO ===== */}
      <section className="section-light" style={{ paddingBottom: 40 }}>
        <div className="wrap-narrow">
          <div className="sec-head reveal" style={{ marginBottom: 28 }}>
            <span className="kicker">Ultimul pas înainte de evaluare</span>
            <h2>Aplică pentru BrainMap</h2>
            <p>
              Urmărește scurt video-ul de mai jos ca să vezi cum arată să lucrezi cu noi. Apoi completează aplicația
              — durează în jur de 3 minute.
            </p>
          </div>

          <div className="vsl reveal" style={{ maxWidth: "100%" }}>
            <div className="vsl-frame">
              <div className="vsl-caption">
                <div className="tag">Cum lucrăm împreună</div>
                <div className="len">4 min</div>
              </div>
              <div className="play-btn">
                <svg viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section style={{ padding: "0 0 20px", background: "var(--bg-alt)" }}>
        <div className="wrap" style={{ paddingTop: 44 }}>
          <div className="sec-head reveal" style={{ marginBottom: 26 }}>
            <span className="kicker">De ce merită să duci aplicația până la capăt</span>
            <h2>Oameni ca tine. Rezultate reale.</h2>
          </div>

          {/* Video testimonials carousel */}
          <div className="carousel2d reveal">
            <button className="car-btn car-prev" aria-label="Anterior">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0A2E3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="car2d-viewport car2d-viewport-video">
              <div className="car2d-track">
                {VIDEO_TESTIMONIALS.map((v) => (
                  <div key={v.name} className="v-card car2d-slide car2d-slide-video">
                    <div className={`v-thumb ${v.g}`}>
                      <div className="v-len">{v.len}</div>
                      <div className="v-play">
                        <svg viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <div className="v-meta">
                        <div className="name">{v.name}</div>
                        <div className="role">{v.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="car-btn car-next" aria-label="Următor">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0A2E3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <div className="car-dots" />
          </div>

          {/* Written reviews carousel */}
          <div className="carousel2d reveal">
            <button className="car-btn car-prev" aria-label="Anterior">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0A2E3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="car2d-viewport car2d-viewport-review">
              <div className="car2d-track">
                {WRITTEN_TESTIMONIALS.map((t) => (
                  <div key={t.n} className="t-card car2d-slide car2d-slide-review">
                    <div className="stars">★★★★★</div>
                    <p className="quote">„{t.q}”</p>
                    <div className="t-person">
                      <div className="avatar">{t.i}</div>
                      <div>
                        <div className="name">{t.n}</div>
                        <div className="role">{t.r}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="car-btn car-next" aria-label="Următor">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0A2E3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <div className="car-dots" />
          </div>
        </div>
      </section>

      {/* ===== APPLICATION FORM ===== */}
      <section className="apply">
        <div className="wrap">
          <div className="apply-box reveal">
            <h2>Aplicația ta</h2>
            <p className="apply-sub">Răspunde sincer. Ne ajută să vedem dacă te putem ajuta cu adevărat.</p>
            <LpApplyB />
          </div>
        </div>
      </section>

      <FooterB />

      <LpScripts rootId="lp-somn-b-aplicatie-root" />
    </div>
  );
}
