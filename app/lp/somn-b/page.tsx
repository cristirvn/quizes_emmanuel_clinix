import type { Metadata } from "next";
import Link from "next/link";
import { LpScripts } from "@/components/lp/LpScripts";
import { GradientDefsB, HeaderB, FooterB } from "@/components/lp/FunnelChromeB";
import "./lp-somn-b.css";

/**
 * Variant B of the insomnia campaign LP — the client's 3-page "zip" funnel
 * (`new_modifications_part4/modifications/{index,aplicatie,multumim} - Copie.html`),
 * ported verbatim (his markup/CSS/copy, scoped under `.lp-somn-b`) same as
 * `/lp/somn` (variant A). Step 1 of 3: case-study hero, no application form —
 * "Aplică" sends the visitor to `/lp/somn-b/aplicatie`.
 *
 * Client's own words on this page ("Astea sunt din reclamă"): no personalization
 * block here — that ask was specifically for the standalone `/lp/somn` LP.
 * `ab_variant: "B"` is stamped on the lead by `LpApplyB` on step 2.
 */
export const metadata: Metadata = {
  title: "Emmanuel CliniX — Somn odihnitor, fără pastile | Studiu de caz real",
  description:
    "Vezi cum o femeie de 49 de ani care nu mai dormise bine de 6 ani a ajuns să se trezească odihnită — fără pastile, fără operații, fără radiații. Aplică pentru BrainMap.",
  robots: { index: false, follow: true },
};

const RUSH_1 = [
  { i: "AM", n: "Andreea M.", r: "Cluj-Napoca", q: "Dorm prima noapte întreagă din ultimii 2 ani. Nu-mi vine să cred." },
  { i: "RP", n: "Radu P.", r: "București", q: "Mi-au explicat DE CE nu dorm, nu doar ce să iau. Asta a schimbat tot." },
  { i: "ID", n: "Ioana D.", r: "Timișoara", q: "Energia de dimineață s-a întors. Familia a observat prima." },
  { i: "GV", n: "Gheorghe V.", r: "Brașov", q: "La 63 de ani credeam că e prea târziu. M-am înșelat frumos." },
];

const VIDEO_TESTIMONIALS = [
  { g: "g1", len: "1:58", name: "Mihaela R.", role: "De la 3h la 6h somn" },
  { g: "g2", len: "2:22", name: "Bogdan S.", role: "Fără pastile de somn de 2 luni" },
  { g: "g3", len: "1:35", name: "Corina L.", role: "Cauza găsită la prima evaluare" },
];

const FAQ = [
  {
    q: "Nu am un diagnostic de insomnie. E pentru mine?",
    a: "Da. Majoritatea oamenilor care aplică nu au unul. Tocmai de-asta facem evaluarea — ca să aflăm cauza.",
  },
  { q: "Îmi dați somnifere?", a: "Scopul nostru nu este să te ținem pe pastile. Găsim cauza și lucrăm la ea." },
  {
    q: "Sunt în vârstă. Mai are rost?",
    a: "Da. Vârsta nu este o piedică. Lucrăm cu oameni de toate vârstele și rezultatele apar la fel.",
  },
  { q: "E dureros sau periculos?", a: "Nu. Evaluarea BrainMap este nedureroasă, fără ace și fără radiații." },
  {
    q: "Cât durează până văd o schimbare?",
    a: "La mulți oameni, primele schimbări apar în 1–2 săptămâni. Fiecare caz este diferit, iar noi îți spunem sincer la ce să te aștepți.",
  },
];

export default function LpSomnBPage() {
  return (
    <div className="lp-somn-b has-sticky" id="lp-somn-b-root">
      <GradientDefsB />
      <HeaderB
        right={
          <Link href="/lp/somn-b/aplicatie" className="btn btn-primary nav-cta">
            Aplică pentru BrainMap
          </Link>
        }
      />

      {/* ===== HERO — case study ===== */}
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow reveal">Studiu de caz real · Insomnie</span>
          <h1 className="reveal">
            Dormi din nou adânc și trezește-te <em>plin de energie</em>
          </h1>
          <p className="sub reveal">
            Fără pastile. Fără operații. Fără radiații.
            <br />
            <strong>Vezi cum a reușit o femeie de 49 de ani</strong> care nu mai dormise bine de 6 ani.
          </p>

          <div className="vsl reveal">
            <div className="vsl-frame">
              <div className="vsl-caption">
                <div className="tag">Studiu de caz · Emmanuel CliniX</div>
                <div className="len">Povestea ei · 7 min</div>
              </div>
              <div className="play-btn">
                <svg viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <p className="vsl-note reveal">7 minute. Vezi de unde a pornit, prin ce a trecut și cum arată viața ei acum.</p>

          <Link href="/lp/somn-b/aplicatie" className="btn btn-primary btn-lg reveal">
            Aplică pentru BrainMap →
          </Link>
          <div className="btn-sub btn-sub-light reveal">Locuri limitate în fiecare lună · Aplicarea este gratuită</div>

          <div className="hero-stats reveal">
            <div className="stat">
              <div className="num">6 ani</div>
              <div className="label">de insomnie, rezolvați</div>
            </div>
            <div className="stat">
              <div className="num">2 săpt.</div>
              <div className="label">până la primele nopți bune</div>
            </div>
            <div className="stat">
              <div className="num">Fără</div>
              <div className="label">pastile de somn</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ASTA E CE FACEM ===== */}
      <section className="section-light">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">Asta e ce facem noi</span>
            <h2>Nu îți dăm încă o pastilă. Găsim cauza reală.</h2>
            <p>
              Insomnia nu vine „din senin&quot;. De cele mai multe ori, cauza este în felul în care lucrează creierul
              tău noaptea. BrainMap ne arată exact unde este dezechilibrul — și abia apoi facem un plan doar pentru
              tine.
            </p>
          </div>

          <div className="benefits-grid">
            {[
              "Adormi mai ușor, seara",
              "Te trezești mai rar noaptea",
              "Dimineți cu energie, nu cu ceață",
              "Minte limpede toată ziua",
              "Stare de spirit mai calmă",
              "Control asupra somnului, nu noroc",
            ].map((b) => (
              <div className="benefit-item reveal" key={b}>
                <div className="benefit-check">✓</div>
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POVESTEA (before/after) ===== */}
      <section className="section-light section-alt section-divider">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">Povestea ei, pe scurt</span>
            <h2>A încercat totul, 6 ani. Nimic n-a ținut.</h2>
          </div>

          <div className="story reveal" style={{ marginBottom: 34 }}>
            <p className="lead">
              La 49 de ani, după o infecție care i-a lăsat urme, nu mai putea dormi. Nopți albe, ceață în minte,
              epuizare permanentă.
            </p>
            <p>
              A fost de la un specialist la altul. A ținut diete. A încercat meditații, perfuzii, consultații peste
              consultații. Fiecare i-a spus altceva. Niciunul nu i-a spus de ce. Se obișnuise cu gândul că „așa va
              rămâne&quot;.
            </p>
          </div>

          <div className="ba-grid reveal">
            <div className="ba-card ba-before">
              <div className="ba-tag">Înainte</div>
              <ul className="ba-list">
                <li>
                  <span className="ic">✕</span> Nopți întregi fără somn
                </li>
                <li>
                  <span className="ic">✕</span> Ceață mentală, fără concentrare
                </li>
                <li>
                  <span className="ic">✕</span> Epuizată din prima oră a zilei
                </li>
                <li>
                  <span className="ic">✕</span> Nervi la orice lucru mic
                </li>
                <li>
                  <span className="ic">✕</span> Nu mai putea munci ca înainte
                </li>
              </ul>
            </div>
            <div className="ba-card ba-after">
              <div className="ba-tag">După 2 săptămâni</div>
              <ul className="ba-list">
                <li>
                  <span className="ic">✓</span> Doarme și se trezește odihnită
                </li>
                <li>
                  <span className="ic">✓</span> Ceața mentală a dispărut
                </li>
                <li>
                  <span className="ic">✓</span> Energie și entuziasm din nou
                </li>
                <li>
                  <span className="ic">✓</span> Calmă, stabilă emoțional
                </li>
                <li>
                  <span className="ic">✓</span> A început proiecte noi. Scrie o carte.
                </li>
              </ul>
            </div>
          </div>

          <div className="story reveal" style={{ marginTop: 34, textAlign: "center" }}>
            <p className="lead" style={{ marginBottom: 0 }}>
              Prima oară în 6 ani, se simte ea însăși.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CE E BRAINMAP =====
          Moved here (right after the story, before testimonials) per client
          feedback: the reader who just identified with the story has exactly
          one question — "what did they actually do to her?" — answering it
          two sections later loses the moment. */}
      <section className="section-dark">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker" style={{ color: "var(--teal-bright)" }}>
              Ce este BrainMap
            </span>
            <h2>O hartă clară a creierului tău. În 20 de minute.</h2>
            <p>
              Fără durere. Fără ace. Fără radiații. Doar o citire a activității creierului tău, ca să vedem de ce nu
              dormi — și ce se poate face.
            </p>
          </div>
          <div className="steps4">
            {[
              ["1", "Aplici", "Ne spui pe scurt despre somnul tău. Durează 3 minute."],
              ["2", "Evaluare BrainMap", "Citim activitatea creierului tău. 20 de minute, în clinică."],
              ["3", "Discuție 1-la-1", "Îți arătăm ce am găsit, pe înțelesul tău."],
              ["4", "Plan personal", "Pași clari, făcuți pentru cazul tău. Nimic generic."],
            ].map(([n, t, p]) => (
              <div className="step-card reveal" key={n}>
                <div className="step-num">{n}</div>
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
          <div className="mid-cta reveal">
            <Link href="/lp/somn-b/aplicatie" className="btn btn-primary btn-lg">
              Aplică pentru BrainMap →
            </Link>
            <div className="btn-sub btn-sub-light">Aplicarea durează 3 minute și nu te obligă la nimic.</div>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section className="section-light">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">Nu e un caz singular</span>
            <h2>Ce spun oamenii care au trecut prin asta</h2>
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
                {RUSH_1.map((t) => (
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

      {/* ===== PENTRU CINE NU E =====
          Draft copy, pending the client's own text (he offered to write it —
          see STATUS.md). Placeholder ships live so the section isn't a stub,
          swap wholesale once his version lands. */}
      <section className="section-light section-alt section-divider">
        <div className="wrap-narrow">
          <div className="sec-head reveal">
            <span className="kicker">Ca să fim onești</span>
            <h2>Pentru cine NU e BrainMap</h2>
          </div>
          <ul className="not-for-list reveal">
            <li>Nu aplica dacă cauți doar o rețetă pentru somnifere — noi nu prescriem tratament fără evaluare.</li>
            <li>Nu aplica dacă nu poți veni la o evaluare de 20 de minute, în clinică, în București.</li>
            <li>
              Nu aplica dacă nu ești dispus să urmezi un plan minim 4-6 săptămâni — schimbările reale au nevoie de
              timp.
            </li>
            <li>Nu aplica dacă vrei doar o părere, fără să faci ceva concret cu ea.</li>
            <li>Nu aplica dacă bugetul pentru evaluare e o problemă chiar acum — mai bine aștepți momentul potrivit.</li>
          </ul>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-light">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">Întrebări frecvente</span>
            <h2>Poate te întrebi și tu asta</h2>
          </div>
          <div className="acc-wrap">
            {FAQ.map((item, i) => (
              <div className={`acc-item reveal${i === 0 ? " open" : ""}`} key={item.q}>
                <div className="acc-q">
                  <span>{item.q}</span>
                  <div className="acc-icon">+</div>
                </div>
                <div className="acc-a">
                  <div className="acc-a-inner">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mid-cta reveal">
            <Link href="/lp/somn-b/aplicatie" className="btn btn-primary btn-lg">
              Aplică pentru BrainMap →
            </Link>
            <div className="btn-sub">Locuri limitate în fiecare lună.</div>
          </div>
        </div>
      </section>

      <FooterB showPageLinks />

      <div className="sticky-cta">
        <Link href="/lp/somn-b/aplicatie" className="btn btn-primary btn-block">
          Aplică pentru BrainMap →
        </Link>
      </div>

      <LpScripts rootId="lp-somn-b-root" />
    </div>
  );
}
