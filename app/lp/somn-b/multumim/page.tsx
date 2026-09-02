import type { Metadata } from "next";
import Link from "next/link";
import { LpScripts } from "@/components/lp/LpScripts";
import { FunnelProgressB } from "@/components/lp/FunnelProgressB";
import { GradientDefsB, HeaderB, FooterB } from "@/components/lp/FunnelChromeB";
import "../lp-somn-b.css";

export const metadata: Metadata = {
  title: "Am primit aplicația ta — Emmanuel CliniX",
  description: "Felicitări! Am primit aplicația ta pentru BrainMap. Iată ce urmează.",
  robots: { index: false, follow: true },
};

export default function LpSomnBMultumimPage() {
  return (
    <div className="lp-somn-b" id="lp-somn-b-multumim-root">
      <GradientDefsB />
      <HeaderB right={<span className="nav-step">Pasul 3 din 3</span>} />
      <FunnelProgressB step={3} />

      {/* ===== HERO — confirmare ===== */}
      <section className="hero" style={{ padding: "56px 0 52px" }}>
        <div className="wrap">
          <div className="confirm-icon reveal">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2FE0F0" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <span className="eyebrow reveal">Aplicație primită</span>
          <h1 className="reveal">Felicitări! Am primit aplicația ta.</h1>
          <p className="sub reveal">
            Ai făcut primul pas real spre nopți odihnitoare. <br />
            <strong>Iată exact ce urmează</strong> — și ce poți face acum ca să fii pe lista scurtă.
          </p>
        </div>
      </section>

      {/* ===== SCRISOARE ===== */}
      <section className="section-light">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">Un cuvânt de la noi</span>
            <h2>De ce citim fiecare aplicație personal</h2>
          </div>

          <div className="letter reveal">
            <p>Salut și îți mulțumesc din suflet că ai avut curajul să aplici.</p>
            <p>
              Știu cum e. Ai mai auzit promisiuni. Ai încercat lucruri care n-au ținut. Poate o parte din tine se
              întreabă dacă merită să mai speri încă o dată. Te înțeleg — și de-asta nu tratăm pe nimeni „la
              grămadă&quot;.
            </p>
            <p>
              Rezultatul pe care l-ai văzut în studiul de caz este real. Dar la fel de important e cine merge cu
              tine pe drumul ăsta. Noi vrem să fim siguri că te putem ajuta cu adevărat înainte să-ți promitem ceva.
              De-asta citim fiecare aplicație cu atenție, cu mâna noastră, nu cu un robot.
            </p>
            <p>
              Dacă suntem potriviți unul pentru celălalt, o să-ți dăm tot ce avem mai bun. Iar dacă vezi mai jos,
              îți spun exact ce urmează și ce poți face chiar acum.
            </p>
            <div className="signoff">
              <div className="n">Echipa Emmanuel CliniX</div>
              <div className="r">Longevity · Wellness · Neuro</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CE URMEAZĂ + TEMĂ ===== */}
      <section className="section-light section-alt section-divider">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">Ce urmează</span>
            <h2>Următorii pași, pas cu pas</h2>
          </div>

          <ul className="hw-list">
            <li className="hw-item reveal">
              <div className="hw-num">1</div>
              <div>
                <h3>Îți verificăm aplicația (în 24 de ore)</h3>
                <p>
                  Un specialist din echipă citește ce ne-ai scris și vede dacă evaluarea BrainMap este potrivită
                  pentru situația ta.
                </p>
              </div>
            </li>
            <li className="hw-item reveal">
              <div className="hw-num">2</div>
              <div>
                <h3>Vorbim la telefon</h3>
                <p>
                  Te sunăm ca să ne cunoaștem, să-ți răspundem la întrebări și să stabilim împreună când vii la
                  evaluare. Fără presiune, fără obligații.
                </p>
              </div>
            </li>
            <li className="hw-item reveal">
              <div className="hw-num">3</div>
              <div>
                <h3>Faci evaluarea BrainMap (20 de minute)</h3>
                <p>
                  În clinică. Nedureros, fără ace, fără radiații. La final știi cauza reală și primești un plan
                  făcut pentru tine.
                </p>
              </div>
            </li>
          </ul>

          <div className="sec-head reveal" style={{ marginTop: 64 }}>
            <span className="kicker">Tema ta până vorbim</span>
            <h2>Două lucruri mici, dar importante</h2>
            <p>Oamenii care fac asta înainte de apel ajung mult mai repede la rezultate.</p>
          </div>
          <ul className="hw-list">
            <li className="hw-item reveal">
              <div className="hw-num">✎</div>
              <div>
                <h3>Scrie pe o foaie cum ți-ar schimba viața un somn bun</h3>
                <p>
                  Ce ai face cu energia pe care o câștigi? Cu mintea limpede? Notează — o să conteze în discuția
                  noastră.
                </p>
              </div>
            </li>
            <li className="hw-item reveal">
              <div className="hw-num">▶</div>
              <div>
                <h3>Mai vezi o dată studiul de caz</h3>
                <p>
                  Uită-te încă o dată la povestea din prima pagină. Notează ce ți se pare cel mai asemănător cu
                  situația ta.
                </p>
                <p style={{ marginTop: 10 }}>
                  <Link href="/lp/somn-b" style={{ color: "var(--teal-deep)", fontWeight: 700 }}>
                    → Vezi mai multe studii de caz asemănătoare
                  </Link>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SUNĂ ACUM ===== */}
      <section className="section-light">
        <div className="wrap">
          <div className="call-box reveal">
            <span className="eyebrow" style={{ marginBottom: 16 }}>
              Vrei mai repede?
            </span>
            <h2>Sună-ne tu și treci pe lista scurtă</h2>
            <p>
              Locurile pentru evaluare sunt limitate în fiecare lună. Cine ne sună primul, e văzut primul. Dacă nu
              ne suni, nu-i nimic — te sunăm noi în 24 de ore.
            </p>
            <div className="call-num">+40 790 099 070</div>
            <a href="tel:+40790099070" className="btn btn-gold btn-lg" style={{ marginTop: 16 }}>
              Sună acum →
            </a>
            <div className="btn-sub btn-sub-light" style={{ marginTop: 16 }}>
              Program: Luni–Vineri, 09:00–18:00
            </div>
          </div>

          <div className="trust reveal" style={{ marginTop: 44 }}>
            <div className="trust-item">
              <span className="ic">✓</span> Aplicație verificată de un specialist
            </div>
            <div className="trust-item">
              <span className="ic">✓</span> Fără obligații
            </div>
            <div className="trust-item">
              <span className="ic">✓</span> Datele tale, confidențiale
            </div>
          </div>
        </div>
      </section>

      <FooterB />

      <LpScripts rootId="lp-somn-b-multumim-root" />
    </div>
  );
}
