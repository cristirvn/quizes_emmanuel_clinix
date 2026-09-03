import type { Metadata } from "next";
import { LpScripts } from "@/components/lp/LpScripts";
import { LpEmsellaApply } from "@/components/lp/LpEmsellaApply";
import { GradientDefsA, HeaderA, FooterA } from "@/components/lp/FunnelChromeA";
import "./lp-emsella.css";

/**
 * EmSella product LP — same section skeleton as `/lp/somn` (Cristi's call),
 * copy ported from the client's own mockup (`lp-emsella.html`, 2026-08-23:
 * "nu lua documentul, ia doar textele... mă refer strict la structură").
 * Still `noindex` — not yet client-approved as final, this is for review.
 *
 * Structural difference from `/lp/somn`: the calendar sits *after* the
 * contact form (step 2 of `LpEmsellaApply`), with a "prefer telefon"
 * checkbox that lets a visitor skip picking a slot.
 */
export const metadata: Metadata = {
  title: "Pierderi de Urină la Efort? Nu e Vârsta. — Emmanuel CliniX",
  description:
    "EmSella întărește planșeul pelvin în 28 de minute pe scaun, cu hainele pe tine — fără ace, fără recuperare.",
  robots: { index: false, follow: false },
};

export default function LpEmsellaPage() {
  return (
    <div className="lp-emsella" id="lp-emsella-root">
      <GradientDefsA />
      <HeaderA
        right={
          <a href="#aplica" className="btn btn-primary nav-cta">
            Aplică pentru EmSella
          </a>
        }
      />

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="wrap">
          <h1 className="reveal">
            Pierzi urină la strănut, la tuse sau când ridici ceva greu. <em>Nu e vârsta.</em>
          </h1>
          <p className="sub reveal">
            E planșeul pelvin, un mușchi care s-a slăbit. Un mușchi se antrenează. 28 de minute pe scaun, cu
            hainele pe tine.
          </p>

          <div className="vsl reveal">
            <div className="vsl-frame">
              <div className="vsl-caption">
                <div className="tag">VSL · Emmanuel CliniX</div>
                <div className="len">4:30 min</div>
              </div>
              <div className="play-btn">
                <svg viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <p className="vsl-note reveal">4 minute. Vezi exact ce face scaunul, pentru cine e și ce probleme rezolvă.</p>

          <a href="#aplica" className="btn btn-primary reveal">
            Aplică pentru o ședință EmSella →
          </a>
          <div className="btn-sub reveal">Completezi un formular scurt. Te sunăm noi.</div>

          <div className="hero-facts reveal">
            <div className="hero-fact">
              <i>✓</i>O ședință durează 28 de minute
            </div>
            <div className="hero-fact">
              <i>✓</i>Nu te dezbraci, nu te atinge nimeni
            </div>
            <div className="hero-fact">
              <i>✓</i>Fără ace, fără anestezie, fără radiații
            </div>
            <div className="hero-fact">
              <i>✓</i>Fără perioadă de recuperare
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEMNELE ===== */}
      <section className="section-light" id="semnele">
        <div className="wrap">
          <div
            className="sec-head reveal"
            style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
          >
            <span className="kicker">Semnele</span>
            <h2>Trei semne că planșeul pelvin s-a slăbit</h2>
          </div>
          <div className="problem-grid">
            <div className="problem-card reveal">
              <span className="tag">La efort</span>
              <p>
                Pierderi de urină la strănut, la tuse, la râs sau când ridici ceva greu. Apar fără avertisment, iar
                cu timpul se întâmplă tot mai des.
              </p>
            </div>
            <div className="problem-card reveal">
              <span className="tag">Urgența</span>
              <p>
                Senzația vine brusc și lasă puțin timp până la baie. Drumurile prin oraș ajung să se planifice în
                funcție de unde există o toaletă.
              </p>
            </div>
            <div className="problem-card reveal">
              <span className="tag">Noaptea</span>
              <p>
                Două sau trei treziri pe noapte. Somnul adânc se întrerupe de fiecare dată, iar dimineața vine fără
                energie, după opt ore în pat.
              </p>
            </div>
          </div>
          <p className="pull-quote reveal">Absorbantul rezolvă efectul. Mușchiul rămâne la fel de slab.</p>
        </div>
      </section>

      {/* ===== CAUZA ===== */}
      <section className="section-light section-alt section-divider" id="cauza">
        <div className="wrap-narrow">
          <span className="kicker reveal">Cauza</span>
          <h2 className="reveal">Nu e vârsta. E un mușchi.</h2>
          <p className="narrative-first reveal">
            Planșeul pelvin e un grup de mușchi așezați în partea de jos a bazinului, ca un hamac întins de la un os
            la altul. Ei susțin vezica și organele din zona respectivă. Tot ei țin închise supapele prin care iese
            urina.
          </p>
          <p className="reveal">
            Când hamacul ăsta slăbește, supapele nu mai țin la fel de bine. De acolo vin pierderile la strănut,
            urgența bruscă și trezirile de noapte.
          </p>
          <p className="narrative-highlight reveal">Se slăbește din cauze obișnuite. Și se antrenează la loc.</p>
          <p className="reveal">
            Sarcina îl întinde luni de zile. Nașterea îl întinde brusc și puternic, iar efectul rămâne zeci de ani.
            Menopauza îl subțiază. La bărbați, statul jos multe ore pe zi și operația de prostată fac același
            lucru. La toți se adaugă kilogramele, tusea, ridicatul greutăților și trecerea anilor.
          </p>
          <p className="reveal">
            De aici vin renunțările: alergatul, săriturile, sportul, drumurile mai lungi. Și obiceiul de a ști din
            timp unde e cea mai apropiată toaletă.
          </p>
          <p className="reveal">Toate astea, pentru un mușchi care se poate antrena.</p>
        </div>
      </section>

      {/* ===== MECANISMUL ===== */}
      <section className="section-light" id="mecanismul">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">Mecanismul</span>
            <h2>Tu nu faci nimic. Scaunul face antrenamentul.</h2>
          </div>
          <div className="mech-steps">
            <div className="mech-step reveal">
              <div className="mech-label">28 de minute</div>
              <div>
                <h3>Te așezi pe scaun</h3>
                <p>Cu hainele pe tine. Nu te dezbraci, nu te atinge nimeni, nu îți intră nimic în corp.</p>
              </div>
            </div>
            <div className="mech-step reveal">
              <div className="mech-label">11.000 contracții</div>
              <div>
                <h3>Scaunul lucrează mușchiul</h3>
                <p>
                  Emite un câmp electromagnetic care ajunge direct la planșeul pelvin. Acolo, mușchii se contractă
                  la intensitate maximă — inclusiv fibrele profunde, pe care nu le poți controla conștient, oricât
                  ai încerca.
                </p>
              </div>
            </div>
            <div className="mech-step reveal">
              <div className="mech-label">Aproape un an</div>
              <div>
                <h3>Cât ți-ar lua altfel</h3>
                <p>
                  Dacă ai face 30 de exerciții Kegel în fiecare zi, corect executate, fără să sari nicio zi, ți-ar
                  trebui aproape un an ca să ajungi la ce se întâmplă într-o singură ședință pe acest scaun.
                </p>
              </div>
            </div>
          </div>
          <p className="mech-note reveal">
            Nu doare. Simți contracțiile puternic, dar nu e o senzație dureroasă, iar intensitatea se reglează
            pentru fiecare persoană în parte. Nu există perioadă de recuperare. Te ridici de pe scaun și îți
            continui ziua exact cum ai plănuit-o: poți conduce, poți merge la muncă, îți reiei activitatea.
          </p>
        </div>
      </section>

      {/* ===== UN SINGUR MUȘCHI (la femei / la bărbați) ===== */}
      <section className="section-light section-alt section-divider" id="acelasi-muschi">
        <div className="wrap">
          <div
            className="sec-head reveal"
            style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
          >
            <span className="kicker">Ce mai ține de el</span>
            <h2>Un singur mușchi. Mai multe lucruri decât crezi.</h2>
          </div>
          <div className="gender-grid">
            <div className="gender-col reveal">
              <h3>La femei</h3>
              <p>
                Prima problemă care apare sunt pierderile de urină la efort. La strănut, la râs, la tuse sau la
                ridicatul unei greutăți.
              </p>
              <p>De la același mușchi vine senzația bruscă de urgență, când trebuie să ajungi la baie imediat.</p>
              <p>Tot de la el vin trezirile de noapte, care îți întrerup somnul adânc.</p>
              <p>Și tot el influențează senzația în intimitate, pentru că e același grup muscular implicat.</p>
            </div>
            <div className="gender-col reveal">
              <h3>La bărbați</h3>
              <p>
                Semnul cel mai frecvent e scurgerea după mișcare. Te ridici de la toaletă, pleci, și după câteva
                secunde simți umezeala.
              </p>
              <p>Urmează trezirile de noapte, de două sau trei ori, și senzația bruscă de urgență.</p>
              <p>
                Aceiași mușchi sunt implicați și în menținerea erecției, pentru că ei presează la bază și țin
                sângele înăuntru.
              </p>
              <p>
                La bărbați, planșeul pelvin slăbește odată cu vârsta, de la kilograme, de la statul jos multe ore
                pe zi și cel mai accentuat după o operație de prostată.
              </p>
            </div>
          </div>
          <p className="gender-note reveal">
            Toate au aceeași cauză și se lucrează în același fel: prin întărirea mușchiului.
          </p>
        </div>
      </section>

      {/* ===== CE SE ÎNTÂMPLĂ DUPĂ CE APLICI ===== */}
      <section className="section-light" id="asteptari">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">Proces</span>
            <h2>Ce se întâmplă după ce aplici</h2>
          </div>
          <div className="steps4">
            <div className="step-card reveal">
              <div className="step-num">01</div>
              <h3>Completezi formularul</h3>
              <p>Un minut. Ne spui care e situația ta.</p>
            </div>
            <div className="step-card reveal">
              <div className="step-num">02</div>
              <h3>Te sunăm noi</h3>
              <p>Verificăm câteva lucruri și facem programarea la telefon.</p>
            </div>
            <div className="step-card reveal">
              <div className="step-num">03</div>
              <h3>Vii la prima ședință</h3>
              <p>28 de minute pe scaun, în clinică, în București.</p>
            </div>
            <div className="step-card reveal">
              <div className="step-num">04</div>
              <h3>Simți dacă mușchiul răspunde</h3>
              <p>Chiar acolo, pe scaun. Nu aștepți săptămâni ca să afli.</p>
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
              <div className="benefit-check">✓</div>Nu mai pierzi urină la strănut sau tuse
            </div>
            <div className="benefit-item reveal">
              <div className="benefit-check">✓</div>Nu mai cauți toaleta din priviri
            </div>
            <div className="benefit-item reveal">
              <div className="benefit-check">✓</div>Dormi fără treziri de la vezică
            </div>
            <div className="benefit-item reveal">
              <div className="benefit-check">✓</div>Mușchiul se întărește, nu doar ascunzi simptomul
            </div>
            <div className="benefit-item reveal">
              <div className="benefit-check">✓</div>Fără ace, fără anestezie, fără recuperare
            </div>
            <div className="benefit-item reveal">
              <div className="benefit-check">✓</div>Simți diferența chiar din prima ședință
            </div>
          </div>

          <div className="mid-cta reveal">
            <a href="#aplica" className="btn btn-primary">
              Aplică pentru o ședință EmSella →
            </a>
          </div>
        </div>
      </section>

      {/* ===== CE PRIMEȘTI ===== */}
      <section className="section-light" id="ce-primesti">
        <div className="wrap-narrow">
          <div
            className="sec-head reveal"
            style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
          >
            <span className="kicker">Ce primești</span>
            <h2>28 de minute. Cu hainele pe tine.</h2>
          </div>
          <ul className="fit-list reveal">
            <li>
              <b>Ședință de 28 de minute.</b> Stai pe scaun, complet echipat. Nu te dezbraci și nu te atinge nimeni.
            </li>
            <li>
              <b>Peste 11.000 de contracții.</b> La intensitate maximă, inclusiv în fibrele profunde.
            </li>
            <li>
              <b>Intensitate reglată pentru tine.</b> Se ajustează la fiecare ședință, după cum răspunzi.
            </li>
            <li>
              <b>Fără perioadă de recuperare.</b> Te ridici și îți continui ziua imediat.
            </li>
          </ul>
          <div className="price-stack reveal">
            <div className="price-row">
              <div className="price-cell">
                <span className="lbl">O ședință</span>
                <span className="num">250 lei</span>
              </div>
              <div className="price-cell">
                <span className="lbl">Pachet 5 ședințe</span>
                <span className="num">1.150 lei</span>
              </div>
              <div className="price-cell">
                <span className="lbl">Pachet 10 ședințe</span>
                <span className="num">2.000 lei</span>
              </div>
            </div>
          </div>
          <p className="qual-note reveal">
            De obicei e nevoie de mai multe ședințe, pentru că vorbim despre antrenament muscular, nu despre o
            intervenție. Un mușchi nu se întărește dintr-o dată. Recomandăm cel puțin 10 ședințe ca antrenamentul
            să aibă efect.
          </p>
          <p className="qual-note reveal">
            Nu trebuie să iei pachetul de 10 din prima. Poți începe cu o ședință, poți lua pachetul de 5 și îl
            continui după, sau poți merge direct pe 10.
          </p>
          <div className="mid-cta reveal">
            <a href="#aplica" className="btn btn-primary">
              Aplică pentru o ședință EmSella →
            </a>
          </div>
        </div>
      </section>

      {/* ===== DOVADA ===== */}
      <section className="section-light section-alt section-divider" id="rezultate">
        <div className="wrap">
          <div
            className="sec-head reveal"
            style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
          >
            <span className="kicker">Dovezi</span>
            <h2>Ascultă-o pe doamna Paulina</h2>
            <p className="reveal" style={{ maxWidth: 560, margin: "14px auto 0" }}>
              A trecut prin exact acest proces la noi în clinică. Sub video ai testimonialul ei complet.
            </p>
          </div>

          <div className="single-video-wrap reveal">
            <div className="v-card">
              <div className="v-thumb g1">
                <div className="v-len">2:40</div>
                <div className="v-play">
                  <svg viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="v-meta">
                  <div className="name">Paulina</div>
                  <div className="role">Testimonial complet</div>
                </div>
              </div>
            </div>
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
            <h2>Pentru cine e și cine NU poate face EmSella</h2>
          </div>
          <div className="qual-grid">
            <div className="qual-col reveal">
              <h3>E pentru tine dacă</h3>
              <ul className="fit-list">
                <li>Pierzi urină la strănut, tuse, râs sau ridicat de greutăți</li>
                <li>Senzația vine brusc și abia ajungi la baie</li>
                <li>Te trezești noaptea de două sau trei ori</li>
                <li>Ai născut cândva, ai trecut de menopauză sau ai avut o operație de prostată</li>
                <li>Ai încercat exerciții Kegel și n-ai ținut ritmul zilnic</li>
              </ul>
            </div>
            <div className="qual-col reveal">
              <h3>Nu poți face EmSella dacă</h3>
              <ul className="not-for-list">
                <li>Ești însărcinată</li>
                <li>Ai stimulator cardiac</li>
                <li>Ai implanturi metalice în zona pelvină</li>
                <li>Ai sterilet de cupru</li>
              </ul>
            </div>
          </div>
          <p className="qual-note reveal">
            Verificăm toate astea la telefon, înainte de programare. Dacă ai orice altă situație medicală,
            spune-ne atunci.
          </p>
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
              <b>Nu îți promitem că se rezolvă totul după prima ședință.</b> Îți promitem că te ridici de pe scaun
              știind dacă mușchiul tău răspunde. Pentru că o simți chiar acolo, în timp ce stai pe scaun.
            </p>
          </div>
          <div className="promise-row reveal">
            <div className="promise-icon">◈</div>
            <p>
              <b>Dacă vedem că nu ți se potrivește, îți spunem la telefon.</b> Înainte să plătești ceva și înainte
              să vii la clinică.
            </p>
          </div>
          <div className="mid-cta reveal">
            <a href="#aplica" className="btn btn-primary">
              Aplică pentru o ședință EmSella →
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
              { q: "Cât durează o ședință?", a: "28 de minute. Nu ai nevoie de timp în plus înainte sau după.", open: true },
              {
                q: "Cât costă?",
                a: "250 de lei o ședință. Pachetul de 5 ședințe costă 1.150 de lei, iar pachetul de 10 ședințe costă 2.000 de lei. Nu ești obligat să iei un pachet din prima.",
              },
              { q: "Trebuie să mă dezbrac?", a: "Nu. Stai pe scaun cu hainele pe tine. Nu te atinge nimeni." },
              {
                q: "Doare?",
                a: "Nu. Simți contracțiile puternic, dar nu e o senzație dureroasă. Intensitatea se reglează după cum răspunzi.",
              },
              {
                q: "De câte ședințe am nevoie?",
                a: "Recomandăm cel puțin 10, pentru că e antrenament muscular. Un mușchi nu se întărește dintr-o dată.",
              },
              { q: "E și pentru bărbați?", a: "Da. Planșeul pelvin slăbește și la bărbați, cel mai accentuat după o operație de prostată." },
              {
                q: "Am problema asta de mulți ani. Mai are rost acum?",
                a: "Mușchiul răspunde la antrenament indiferent de cât timp a trecut de când s-a slăbit. Diferența o face numărul de ședințe, nu vechimea problemei.",
              },
              {
                q: "Am peste 70 de ani. Există o limită de vârstă?",
                a: "Nu. Contează contraindicațiile, nu vârsta. Le verificăm la telefon înainte de programare.",
              },
              { q: "Pot conduce după ședință?", a: "Da. Nu există perioadă de recuperare. Îți continui ziua exact cum ai plănuit-o." },
              { q: "Am nevoie de trimitere de la medicul de familie?", a: "Nu." },
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
              Aplică pentru o ședință EmSella →
            </a>
          </div>
        </div>
      </section>

      {/* ===== APPLICATION FORM + PROGRAMARE ===== */}
      <section className="apply" id="aplica">
        <div className="wrap">
          <div className="apply-box reveal">
            <h2>Fă primul pas. Restul se simte pe scaun.</h2>
            <p className="apply-sub">Apasă pe buton și completează formularul. Te sunăm noi în cel mai scurt timp, ca să programăm.</p>
            <LpEmsellaApply />
            <div className="apply-note">Datele tale sunt confidențiale.</div>
          </div>
        </div>
      </section>

      <FooterA disclaimer="EmSella nu constituie diagnostic medical. Rezultatele pot varia de la o persoană la alta. Există contraindicații: sarcină, stimulator cardiac, implanturi metalice în zona pelvină, sterilet de cupru. Pentru simptome severe, recomandăm consultarea unui medic specialist." />

      {/* ===== STICKY MOBILE CTA ===== */}
      <div className="sticky-cta">
        <a href="#aplica" className="btn btn-primary btn-block">
          Aplică pentru o ședință EmSella →
        </a>
      </div>

      <LpScripts rootId="lp-emsella-root" />
    </div>
  );
}
