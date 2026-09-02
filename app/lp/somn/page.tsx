import type { Metadata } from "next";
import { LpScripts } from "@/components/lp/LpScripts";
import { LpApply } from "@/components/lp/LpApply";
import { GradientDefsA, HeaderA, FooterA } from "@/components/lp/FunnelChromeA";
import { decodeSummary, resolveOutcome, stepsFromSummary } from "@/lib/quiz";
import "./lp-somn.css";

/**
 * Standalone campaign landing page — the client's own hand-built insomnia LP
 * (new_modifications_part4/index.html), ported into a route so its form talks to
 * the real `/api/lead` → GoHighLevel pipeline. His markup + CSS ship verbatim
 * (design decision: these paid-traffic LPs keep his look, not the site's design
 * system); the CSS is scoped under `.lp-somn` (see `lp-somn.css`) so it can't
 * leak. Renders with no site chrome — the page carries its own header + footer.
 *
 * A/B: this is variant "A". The split happens at the ad level (two ads → two LP
 * URLs); `LpApply` stamps `ab_variant` on the lead so GHL attributes the win.
 *
 * Personalization: the top block ("din răspunsurile tale…") appears ONLY for
 * visitors arriving from the adaptive quiz — gated on the `?r=` summary token,
 * exactly like `/rezultat/[slug]`. Direct/ad traffic never sees it.
 */
const AB_VARIANT = "A";

export const metadata: Metadata = {
  title: "Ai Insomnie? Află Cauza. — Emmanuel CliniX",
  description:
    "BrainMap îți arată în 20 de minute cauza reală din spatele insomniei tale — și planul ca să dormi din nou.",
  robots: { index: false, follow: true },
};

export default async function LpSomnPage({
  searchParams,
}: {
  searchParams: Promise<{ r?: string }>;
}) {
  const { r } = await searchParams;
  const summary = decodeSummary(r);
  const perso = summary
    ? {
        name: summary.name,
        condition: resolveOutcome(stepsFromSummary(summary)).name,
      }
    : null;

  return (
    <div className="lp-somn" id="lp-somn-root">
      <GradientDefsA />
      <HeaderA
        right={
          <a href="#aplica" className="btn btn-primary nav-cta">
            Aplică pentru BrainMap
          </a>
        }
      />

      {/* ===== PERSONALIZAT (quiz arrivals only) ===== */}
      {perso && (
        <section className="lp-perso">
          <div className="wrap">
            <div className="perso-kicker">Personalizat pentru tine</div>
            <h2>
              {perso.name}, din ce ne-ai spus, pare că te confrunți cu {perso.condition.toLowerCase()}.
            </h2>
            <p>
              Am pregătit pașii de mai jos ținând cont exact de răspunsurile tale. Vezi mai jos ce
              putem face — și aplică pentru un BrainMap ca să găsim cauza reală.
            </p>
          </div>
        </section>
      )}

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="wrap">
          <h1 className="reveal">
            Dormi opt ore și te trezești <em>ca și cum n-ai fi dormit deloc</em>
          </h1>
          <p className="sub reveal">
            Somnul tău prost se vede pe o hartă a activității creierului tău. Într-o oră afli exact de unde pleacă.
          </p>

          <div className="vsl reveal">
            <div className="vsl-frame">
              <div className="vsl-caption">
                <div className="tag">VSL · Emmanuel CliniX</div>
                <div className="len">9:14 min</div>
              </div>
              <div className="play-btn">
                <svg viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <p className="vsl-note reveal">
            9 minute. Vezi de ce nimic din ce ai încercat n-a ținut — și ce măsurăm noi înainte să spunem ceva.
          </p>

          <a href="#aplica" className="btn btn-primary reveal">
            Aplică pentru BrainMap →
          </a>
          <div className="btn-sub reveal">Completezi un formular scurt. Te sunăm noi.</div>

          <div className="hero-facts reveal">
            <div className="hero-fact">
              <i>✓</i>30 de minute scanarea
            </div>
            <div className="hero-fact">
              <i>✓</i>Fără radiații, fără ace
            </div>
            <div className="hero-fact">
              <i>✓</i>Interpretare în aceeași vizită
            </div>
            <div className="hero-fact">
              <i>✓</i>Fără trimitere de la medicul de familie
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEMA (recunoști situația) ===== */}
      <section className="section-light" id="problema">
        <div className="wrap">
          <div
            className="sec-head reveal"
            style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
          >
            <span className="kicker">Situația de acum</span>
            <h2>Recunoști una dintre situațiile astea?</h2>
          </div>
          <div className="problem-grid">
            <div className="problem-card reveal">
              <span className="tag">Seara</span>
              <p>Stai în pat cu ochii în tavan. Ore în șir. Corpul e frânt, dar capul nu se oprește.</p>
            </div>
            <div className="problem-card reveal">
              <span className="tag">La trei noaptea</span>
              <p>Adormi repede. Și la trei noaptea ești treaz. Nu te mai ia somnul, orice ai face.</p>
            </div>
            <div className="problem-card reveal">
              <span className="tag">Dimineața</span>
              <p>Dormi opt ore și te trezești fără pic de energie. Ca și cum ai tras de tine toată noaptea.</p>
            </div>
          </div>
          <p className="pull-quote reveal">
            Trei situații diferite. Aceeași întrebare la toți: de ce tocmai la mine?
          </p>
        </div>
      </section>

      {/* ===== DE CE NIMIC NU A ȚINUT ===== */}
      <section className="section-light section-alt section-divider" id="de-ce-nu-a-tinut">
        <div className="wrap-narrow">
          <span className="kicker reveal">De ce nimic nu a ținut</span>
          <h2 className="reveal">Ai încercat. Și tot acolo ești.</h2>
          <p className="narrative-first reveal">
            Ceaiuri. Melatonină. Telefonul scos din dormitor. Aplicații de respirație. Ora fixă de culcare. Poate a
            mers o săptămână. Poate deloc.
          </p>
          <p className="reveal">Toate au fost presupuneri. Soluții generale pentru o problemă care nu e generală.</p>
          <p className="narrative-highlight reveal">Nimeni nu ți-a arătat, concret, ce se întâmplă.</p>
          <p className="reveal">
            Inima ți-o verifici. Analizele de sânge ți le faci an de an. Creierul — niciodată. Deși el decide dacă
            dormi sau nu.
          </p>
          <p className="reveal">E greu să repari ceva ce n-ai văzut niciodată cum arată.</p>
        </div>
      </section>

      {/* ===== MECANISMUL ===== */}
      <section className="section-light" id="mecanismul">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">Mecanismul</span>
            <h2>Nu pornim de la simptom. Pornim de la măsurătoare.</h2>
          </div>
          <div className="mech-steps">
            <div className="mech-step reveal">
              <div className="mech-label">30 min</div>
              <div>
                <h3>Scanarea</h3>
                <p>
                  Îți punem o cască cu senzori. Stai pe scaun, cu hainele pe tine, cu ochii închiși și apoi
                  deschiși. Senzorii citesc activitatea electrică pe care creierul tău o produce oricum, în fiecare
                  secundă. Ca un microfon care ascultă creierul vorbind.
                </p>
              </div>
            </div>
            <div className="mech-step reveal">
              <div className="mech-label">Pe ecran</div>
              <div>
                <h3>Harta activității creierului tău</h3>
                <p>
                  Vezi ce zone sunt prea active, care sunt prea lente și unde exact se întrerupe somnul adânc. În
                  cazul tău, nu în general.
                </p>
              </div>
            </div>
            <div className="mech-step reveal">
              <div className="mech-label">Aceeași zi</div>
              <div>
                <h3>Interpretarea, pe loc</h3>
                <p>Îți explicăm harta pe înțelesul tău, în aceeași vizită. Pleci știind care e situația și ce urmează.</p>
              </div>
            </div>
          </div>
          <p className="mech-note reveal">
            Nu îți intră nimic în corp. Nu ți se administrează nimic. Fără radiații, fără ace, fără durere. Te
            ridici de pe scaun și îți continui ziua exact cum ai plănuit-o.
          </p>
        </div>
      </section>

      {/* ===== LA CE SA TE ASTEPTI ===== */}
      <section className="section-light" id="asteptari">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">Proces</span>
            <h2>La ce să te aștepți de la noi</h2>
          </div>
          <div className="steps4">
            <div className="step-card reveal">
              <div className="step-num">01</div>
              <h3>Completezi formularul</h3>
              <p>Un minut. Ne spui cum arată nopțile tale.</p>
            </div>
            <div className="step-card reveal">
              <div className="step-num">02</div>
              <h3>Te sunăm noi</h3>
              <p>Vorbim despre situația ta și facem programarea la telefon.</p>
            </div>
            <div className="step-card reveal">
              <div className="step-num">03</div>
              <h3>Vii la evaluare</h3>
              <p>O oră în clinică: scanare, interpretare, consult psihologic.</p>
            </div>
            <div className="step-card reveal">
              <div className="step-num">04</div>
              <h3>Pleci cu harta ta</h3>
              <p>Plus un PDF cu interpretarea și recomandările tale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BENEFICII ===== */}
      <section className="section-light section-alt section-divider" id="beneficii">
        <div className="wrap">
          <div
            className="sec-head reveal"
            style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
          >
            <span className="kicker">Rezultat</span>
            <h2>Ce beneficii o să vezi</h2>
          </div>
          <div className="benefits-grid">
            <div className="benefit-item reveal">
              <div className="benefit-check">✓</div>Adormi mai ușor
            </div>
            <div className="benefit-item reveal">
              <div className="benefit-check">✓</div>Te trezești mai rar noaptea
            </div>
            <div className="benefit-item reveal">
              <div className="benefit-check">✓</div>Energie constantă toată ziua
            </div>
            <div className="benefit-item reveal">
              <div className="benefit-check">✓</div>Minte limpede, fără ceață
            </div>
            <div className="benefit-item reveal">
              <div className="benefit-check">✓</div>Stare de spirit mai stabilă
            </div>
            <div className="benefit-item reveal">
              <div className="benefit-check">✓</div>Control, nu noroc
            </div>
          </div>

          <div className="mid-cta reveal">
            <a href="#aplica" className="btn btn-primary">
              Aplică pentru BrainMap →
            </a>
          </div>
        </div>
      </section>

      {/* ===== CE INCLUDE VIZITA ===== */}
      <section className="section-light" id="ce-include">
        <div className="wrap-narrow">
          <div
            className="sec-head reveal"
            style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
          >
            <span className="kicker">Ce include vizita</span>
            <h2>O oră în total. Atât.</h2>
          </div>
          <ul className="fit-list reveal">
            <li>
              <b>Scanarea BrainMap.</b> Stai pe scaun, 30 de minute, cu hainele pe tine.
            </li>
            <li>
              <b>Interpretarea hărții, pe loc.</b> În cuvinte pe care le înțelegi, nu în termeni medicali.
            </li>
            <li>
              <b>Consult psihologic, în aceeași vizită.</b> Fără o a doua programare.
            </li>
            <li>
              <b>PDF pe mail sau pe WhatsApp.</b> Interpretarea completă și recomandări personalizate pe care le
              poți aplica acasă, pe cont propriu, fără costuri în plus.
            </li>
          </ul>
          <div className="price-stack reveal">
            <div className="price-row">
              <div className="price-cell">
                <span className="lbl">Tot ce e mai sus, într-o singură vizită</span>
                <span className="num">1.200 lei</span>
              </div>
            </div>
          </div>
          <p className="qual-note reveal">Harta și PDF-ul rămân ale tale, indiferent ce alegi să faci mai departe.</p>
          <div className="mid-cta reveal">
            <a href="#aplica" className="btn btn-primary">
              Aplică pentru BrainMap →
            </a>
          </div>
        </div>
      </section>

      {/* ===== REZULTATE / TESTIMONIALE ===== */}
      <section className="section-light" id="rezultate">
        <div className="wrap">
          <div
            className="sec-head reveal"
            style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
          >
            <span className="kicker">Dovezi</span>
            <h2>Ce rezultate au avut alte persoane</h2>
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
                {[
                  { g: "g1", len: "2:14", name: "Mihai T.", role: "De la 4h la 7h somn" },
                  { g: "g2", len: "1:47", name: "Simona V.", role: "Cauza găsită în 20 min" },
                  { g: "g3", len: "3:02", name: "Cristian B.", role: "Fără somnifere acum" },
                ].map((v) => (
                  <div key={v.name} className="v-card car2d-slide">
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
                {[
                  {
                    q: "Credeam că sunt condamnată la nopți albe. Acum dorm prima noapte întreagă din ultimii 2 ani.",
                    av: "AM",
                    name: "Andreea M.",
                    role: "34 ani, Cluj-Napoca",
                  },
                  {
                    q: "BrainMap mi-a explicat DE CE nu dorm, nu doar ce să fac. Plan pentru mine, nu generic.",
                    av: "RP",
                    name: "Radu P.",
                    role: "41 ani, București",
                  },
                  {
                    q: "Energia mea de dimineață s-a schimbat complet. Colegii mi-au zis primii că arăt altfel.",
                    av: "ID",
                    name: "Ioana D.",
                    role: "29 ani, Timișoara",
                  },
                ].map((t) => (
                  <div key={t.name} className="t-card car2d-slide">
                    <div className="stars">★★★★★</div>
                    <p className="quote">„{t.q}”</p>
                    <div className="t-person">
                      <div className="avatar">{t.av}</div>
                      <div>
                        <div className="name">{t.name}</div>
                        <div className="role">{t.role}</div>
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

      {/* ===== PENTRU CINE E / NU E ===== */}
      <section className="section-light" id="pentru-cine-nu-e">
        <div className="wrap">
          <div
            className="sec-head reveal"
            style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
          >
            <span className="kicker">Ca să fim onești</span>
            <h2>Pentru cine e și pentru cine NU e BrainMap</h2>
          </div>
          <div className="qual-grid">
            <div className="qual-col reveal">
              <h3>E pentru tine dacă</h3>
              <ul className="fit-list">
                <li>Nu poți adormi seara, deși ești frânt</li>
                <li>Te trezești noaptea și nu mai adormi</li>
                <li>Dormi destul și te trezești fără energie</li>
                <li>Ai încercat deja mai multe lucruri și niciunul n-a ținut</li>
                <li>Vrei să vezi date despre tine, nu sfaturi generale</li>
              </ul>
            </div>
            <div className="qual-col reveal">
              <h3>Nu aplica dacă</h3>
              <ul className="not-for-list">
                <li>Cauți o rețetă rapidă și atât</li>
                <li>Vrei garanția că totul se rezolvă după o singură vizită</li>
                <li>Nu poți veni la o evaluare de o oră, în clinică, în București</li>
                <li>Bugetul pentru evaluare e o problemă chiar acum</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CE ÎȚI PROMITEM ȘI CE NU ===== */}
      <section className="promise">
        <div className="wrap">
          <div className="sec-head reveal" style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
            <span className="kicker">Înainte să aplici</span>
            <h2>Ce îți promitem și ce nu</h2>
          </div>
          <div className="promise-row reveal">
            <div className="promise-icon">◈</div>
            <p>
              <b>Nu îți promitem că se rezolvă totul după o vizită.</b> Îți promitem că pleci de la noi știind clar
              care e problema și ce urmează.
            </p>
          </div>
          <div className="promise-row reveal">
            <div className="promise-icon">◈</div>
            <p>
              <b>Dacă vedem că nu te putem ajuta, îți spunem la telefon.</b> Înainte să plătești ceva și înainte să
              vii la clinică. Nu programăm pe cineva doar ca să programăm.
            </p>
          </div>
          <div className="mid-cta reveal">
            <a href="#aplica" className="btn btn-primary">
              Aplică pentru BrainMap →
            </a>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-light section-alt section-divider" id="faq">
        <div className="wrap">
          <div
            className="sec-head reveal"
            style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
          >
            <span className="kicker">Întrebări</span>
            <h2>FAQ</h2>
          </div>
          <div className="acc-wrap">
            {[
              {
                q: "Nu am diagnostic de insomnie. E pentru mine?",
                a: "Da. Majoritatea aplicanților nu au unul. De-asta facem evaluarea.",
                open: true,
              },
              { q: "Îmi dați somnifere?", a: "Nu. Găsim cauza. Nu prescriem pastile." },
              {
                q: "Cât durează, în total?",
                a: "O oră. 30 de minute scanarea, restul interpretarea hărții și consultul psihologic.",
              },
              {
                q: "Doare? E periculos?",
                a: "Nu. Senzorii doar citesc activitatea pe care creierul o produce oricum. Nu se administrează nimic, nu intră nimic în corp, nu există radiații și nu există perioadă de recuperare.",
              },
              { q: "Cât durează până văd rezultate?", a: "De obicei 1-2 săptămâni." },
              {
                q: "Cât costă?",
                a: "Evaluarea costă 1.200 de lei și include scanarea, interpretarea pe loc, consultul psihologic și PDF-ul cu recomandări. Dacă începi tratamentul cu noi, suma se scade integral.",
              },
              { q: "Am nevoie de trimitere de la medicul de familie?", a: "Nu." },
              {
                q: "Iau deja medicamente pentru somn. Le opresc înainte?",
                a: "Nu opri nimic pe cont propriu. Discuți asta cu medicul care ți le-a prescris. Ne spui la telefon ce iei, ca să ținem cont la interpretare.",
              },
              {
                q: "Cu ce plec acasă?",
                a: "Harta activității creierului tău și un PDF cu interpretarea completă și recomandări personalizate. Rămân ale tale.",
              },
              {
                q: "Ce se întâmplă după scanare?",
                a: "Discutăm ce arată harta și ce opțiuni ai mai departe. Decizi tu. Nu ești obligat la nimic.",
              },
              {
                q: "Cât se așteaptă pentru o programare?",
                a: "Depinde de intervalele libere. Te sunăm în cel mai scurt timp și găsim împreună o oră care ți se potrivește.",
              },
              {
                q: "Ce se întâmplă cu datele mele?",
                a: "Rămân confidențiale. Sunt folosite doar pentru evaluarea ta și nu se transmit mai departe.",
              },
              { q: "Dacă aplic și nu sunt un fit?", a: "Îți spunem direct. Nu plătești nimic." },
            ].map((f) => (
              <div key={f.q} className={`acc-item reveal${f.open ? " open" : ""}`}>
                <div className="acc-q">
                  <span>{f.q}</span>
                  <div className="acc-icon">+</div>
                </div>
                <div className="acc-a">
                  <div className="acc-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mid-cta reveal">
            <a href="#aplica" className="btn btn-primary">
              Aplică pentru BrainMap →
            </a>
          </div>
        </div>
      </section>

      {/* ===== APPLICATION FORM ===== */}
      <section className="apply" id="aplica">
        <div className="wrap">
          <div className="apply-box reveal">
            <h2>Spune-ne cum arată nopțile tale</h2>
            <p className="apply-sub">Un minut. Îți răspunde un om din echipă, în 24 de ore.</p>
            <LpApply abVariant={AB_VARIANT} />
            <div className="apply-note">Datele tale sunt confidențiale.</div>
          </div>
        </div>
      </section>

      <FooterA />

      {/* ===== STICKY MOBILE CTA ===== */}
      <div className="sticky-cta">
        <a href="#aplica" className="btn btn-primary btn-block">
          Aplică pentru BrainMap →
        </a>
      </div>

      <LpScripts rootId="lp-somn-root" />
    </div>
  );
}
