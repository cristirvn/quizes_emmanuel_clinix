"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Gtag = (...args: unknown[]) => void;

/**
 * Application form for `/lp/somn-b` (the client's "zip" 3-page funnel —
 * `new_modifications_part4/modifications/aplicatie - Copie.html`). A much
 * heavier qualifier than `LpApply` (variant A): age, duration, what they've
 * tried, spend-to-date, monthly spend, willingness to invest, desired outcome,
 * 9-month vision, why they're a fit, and decisiveness — all forwarded as GHL
 * `fields` so the team can triage applications before calling back.
 *
 * Required selects/textareas/radio rely on native HTML5 validation (this form
 * has no `noValidate`, matching the source markup); only name/phone/email get
 * the site's custom regex + inline error message.
 */
function reportLead(sursa: string) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "generate_lead", { sursa });
  const adsId = process.env.NEXT_PUBLIC_GADS_ID;
  const label = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;
  if (adsId && label) gtag("event", "conversion", { send_to: `${adsId}/${label}` });
}

export function LpApplyB() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string; consent?: string; form?: string }>(
    {},
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (key: string) => String(fd.get(key) ?? "").trim();

    const name = get("nume");
    const phone = get("telefon");
    const email = get("email");
    const website = get("website");

    const fe: { name?: string; phone?: string; email?: string; consent?: string } = {};
    if (name.length < 2) fe.name = "Te rugăm să îți scrii numele.";
    const digits = phone.replace(/\D/g, "");
    if (!/^[0-9+()\s-]+$/.test(phone) || digits.length < 10)
      fe.phone = "Numărul de telefon pare incorect sau incomplet.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fe.email = "Adresa de email nu pare validă.";
    if (!consent) fe.consent = "Trebuie să bifezi acordul de a fi contactat ca să poți trimite formularul.";
    if (Object.keys(fe).length > 0) {
      setErrors(fe);
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          website,
          concern: "insomnie",
          fields: {
            sursa: "lp-somn-b",
            ab_variant: "B",
            varsta: get("varsta"),
            durata: get("durata"),
            incercat: get("incercat"),
            cheltuit_total: get("cheltuit_total"),
            cheltuit_lunar: get("cheltuit_lunar"),
            investi: get("investi"),
            succes: get("succes"),
            viziune_9luni: get("noua_luni"),
            potrivit: get("potrivit"),
            hotarare: get("hotarare"),
            consimtamant: "da",
          },
        }),
      });
      if (!res.ok) {
        setErrors({ form: "A apărut o eroare. Te rugăm să încerci din nou." });
        setStatus("error");
        return;
      }
      reportLead("lp-somn-b");
      router.push("/lp/somn-b/multumim");
    } catch {
      setErrors({ form: "A apărut o eroare de conexiune. Te rugăm să încerci din nou." });
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="hp" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="website-b">Nu completați</label>
        <input id="website-b" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* 1 · Contact */}
      <div className="form-group-title">1 · Datele tale de contact</div>
      <div className="field">
        <label htmlFor="nume">Nume complet</label>
        <input type="text" id="nume" name="nume" placeholder="Ex: Maria Popescu" autoComplete="name" required />
        {errors.name && <p className="field-err">{errors.name}</p>}
      </div>
      <div className="field">
        <label htmlFor="telefon">Număr de telefon</label>
        <input
          type="tel"
          id="telefon"
          name="telefon"
          placeholder="07xx xxx xxx"
          autoComplete="tel"
          inputMode="tel"
          required
        />
        {errors.phone && <p className="field-err">{errors.phone}</p>}
      </div>
      <div className="field">
        <label htmlFor="email">Adresă de email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="nume@exemplu.com"
          autoComplete="email"
          inputMode="email"
          required
        />
        {errors.email && <p className="field-err">{errors.email}</p>}
      </div>
      <div className="field">
        <label htmlFor="varsta">Vârsta</label>
        <input type="number" id="varsta" name="varsta" min={18} max={100} placeholder="Ex: 58" required />
      </div>

      {/* 2 · Situația cu somnul */}
      <div className="form-group-title">2 · Situația ta cu somnul</div>
      <div className="field">
        <label htmlFor="durata">De cât timp ai probleme cu somnul?</label>
        <select id="durata" name="durata" defaultValue="" required>
          <option value="" disabled>
            Alege...
          </option>
          <option>Sub 3 luni</option>
          <option>3 – 12 luni</option>
          <option>1 – 3 ani</option>
          <option>3 – 6 ani</option>
          <option>Peste 6 ani</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="incercat">
          Ce ai încercat deja ca să rezolvi problema?
          <span className="hint">Pastile, ceaiuri, specialiști, diete, aplicații… scrie tot ce-ți vine.</span>
        </label>
        <textarea
          id="incercat"
          name="incercat"
          placeholder="Ex: somnifere de la farmacie, două consultații, meditații pe telefon..."
        />
      </div>

      {/* 3 · Investiția */}
      <div className="form-group-title">3 · Cât te-a costat până acum problema asta</div>
      <div className="field">
        <label htmlFor="cheltuit_total">Cât ai cheltuit până acum, în total, încercând să rezolvi problema?</label>
        <select id="cheltuit_total" name="cheltuit_total" defaultValue="" required>
          <option value="" disabled>
            Alege...
          </option>
          <option>Sub 500 lei</option>
          <option>500 – 2.000 lei</option>
          <option>2.000 – 5.000 lei</option>
          <option>5.000 – 10.000 lei</option>
          <option>Peste 10.000 lei</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="cheltuit_lunar">
          Cât cheltui în prezent, în fiecare lună, pentru problema asta?
          <span className="hint">Pastile, tratamente, consultații etc.</span>
        </label>
        <select id="cheltuit_lunar" name="cheltuit_lunar" defaultValue="" required>
          <option value="" disabled>
            Alege...
          </option>
          <option>Aproape nimic</option>
          <option>Sub 200 lei / lună</option>
          <option>200 – 500 lei / lună</option>
          <option>500 – 1.000 lei / lună</option>
          <option>Peste 1.000 lei / lună</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="investi">
          Dacă am găsi cauza reală și ți-am da un plan care funcționează, cât ai fi dispus să investești ca să
          rezolvi definitiv problema?
        </label>
        <select id="investi" name="investi" defaultValue="" required>
          <option value="" disabled>
            Alege...
          </option>
          <option>Prefer să discutăm la telefon</option>
          <option>Până în 3.000 lei</option>
          <option>3.000 – 6.000 lei</option>
          <option>6.000 – 10.000 lei</option>
          <option>Fac tot ce e nevoie ca să rezolv</option>
        </select>
      </div>

      {/* 4 · Cum arată succesul */}
      <div className="form-group-title">4 · Cum arată succesul pentru tine</div>
      <div className="field">
        <label htmlFor="succes">
          Ce rezultat ar trebui să-ți aducă acest serviciu ca să spui că a fost un succes?
          <span className="hint">Fii cât mai concret. Ex: „să dorm 7 ore fără trezire".</span>
        </label>
        <textarea id="succes" name="succes" placeholder="Scrie aici..." required />
      </div>
      <div className="field">
        <label htmlFor="noua_luni">
          Dacă am avea discuția asta peste 9 luni și te-ai uita înapoi — ce ar trebui să se fi întâmplat în acest
          timp ca să fii mulțumit de progres?
        </label>
        <textarea id="noua_luni" name="noua_luni" placeholder="Scrie aici..." required />
      </div>

      {/* 5 · Potrivire */}
      <div className="form-group-title">5 · De ce ești tu persoana potrivită</div>
      <div className="callout">
        Vrem să lucrăm doar cu oameni 100% potriviți și implicați. Alături de ei dăm cele mai bune rezultate — și
        de-asta îi alegem cu grijă.
      </div>
      <div className="field">
        <label htmlFor="potrivit">De ce crezi că ești o persoană potrivită pentru acest serviciu?</label>
        <textarea id="potrivit" name="potrivit" placeholder="Scrie aici..." required />
      </div>
      <div className="q-highlight">
        <span className="q-label">
          Cât de hotărât ești să rezolvi problema asta acum?
          <span className="hint">Alege varianta care ți se potrivește cel mai bine.</span>
        </span>
        <div className="choice-group">
          <label className="choice">
            <input type="radio" name="hotarare" value="acum" required />
            <span className="mark" />
            <span className="txt">Vreau să rezolv problema acum, cât mai repede</span>
          </label>
          <label className="choice">
            <input type="radio" name="hotarare" value="viitor" />
            <span className="mark" />
            <span className="txt">Vreau să rezolv cândva problema, în viitorul apropiat</span>
          </label>
          <label className="choice">
            <input type="radio" name="hotarare" value="informare" />
            <span className="mark" />
            <span className="txt">Doar mă informez, nu vreau să rezolv problema acum</span>
          </label>
        </div>
      </div>

      <label className="consent-check">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>Sunt de acord să fiu contactat în legătură cu aplicarea mea.</span>
      </label>
      {errors.consent && <p className="field-err">{errors.consent}</p>}

      {errors.form && <p className="field-err">{errors.form}</p>}

      <button
        type="submit"
        className="btn btn-primary btn-block btn-lg"
        disabled={status === "submitting" || !consent}
        style={{ marginTop: 10 }}
      >
        {status === "submitting" ? "Se trimite…" : "Trimite aplicația →"}
      </button>
      <div className="apply-note">Datele tale sunt confidențiale și nu sunt date nimănui. Îți răspundem în maximum 24 de ore.</div>
    </form>
  );
}
