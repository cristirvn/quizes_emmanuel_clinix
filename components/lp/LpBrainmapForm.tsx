"use client";

import { useState, type FormEvent } from "react";
import type { BrainmapLp } from "@/content/campaign-lps";

type Gtag = (...args: unknown[]) => void;

function reportLead(sursa: string) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "generate_lead", { sursa });
  const adsId = process.env.NEXT_PUBLIC_GADS_ID;
  const label = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;
  if (adsId && label) gtag("event", "conversion", { send_to: `${adsId}/${label}` });
}

type Errors = {
  name?: string;
  age?: string;
  phone?: string;
  email?: string;
  consent?: string;
  form?: string;
};

/**
 * The application form on the BrainMap campaign LPs (section 11).
 *
 * The client's markup and classes verbatim; their stub script — which only
 * printed a fake success message — replaced by a real POST to `/api/lead`.
 * Both checkboxes are load-bearing and gate the submit: the price one is how
 * the client filters out people who haven't registered the 1.200 lei, the GDPR
 * one is the consent record (site-wide rule, no exceptions).
 *
 * The two selects and the free-text field are the qualifying answers the client
 * wants in front of whoever makes the call, so they ride along as GoHighLevel
 * custom fields rather than being dropped.
 */
export function LpBrainmapForm({ lp }: { lp: BrainmapLp }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "done">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [agreedPrice, setAgreedPrice] = useState(false);
  const [agreedGdpr, setAgreedGdpr] = useState(false);
  const consentOk = agreedPrice && agreedGdpr;
  const sursa = `lp-${lp.slug}`;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const age = String(fd.get("varsta") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const situatie = String(fd.get("situatie") ?? "").trim();
    const durata = String(fd.get("durata") ?? "").trim();
    const incercat = String(fd.get("incercat") ?? "").trim();
    const website = String(fd.get("website") ?? "");

    const fe: Errors = {};
    if (name.length < 2) fe.name = "Te rugăm să îți scrii numele.";
    const ageNumber = Number(age);
    if (age && (!Number.isFinite(ageNumber) || ageNumber < 16 || ageNumber > 100))
      fe.age = "Vârsta pare incorectă.";
    const digits = phone.replace(/\D/g, "");
    if (!/^[0-9+()\s-]+$/.test(phone) || digits.length < 10)
      fe.phone = "Numărul de telefon pare incorect sau incomplet.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fe.email = "Adresa de email nu pare validă.";
    if (!consentOk) fe.consent = "Bifează ambele căsuțe ca să poți trimite aplicarea.";
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
          concern: lp.concern,
          fields: {
            sursa,
            lp: lp.slug,
            consimtamant: "da",
            acord_pret: "da",
            ...(age ? { varsta: age } : {}),
            ...(situatie ? { lp_situatie: situatie } : {}),
            ...(durata ? { lp_durata: durata } : {}),
            ...(incercat ? { lp_incercat: incercat } : {}),
          },
        }),
      });
      if (!res.ok) {
        setErrors({ form: "A apărut o eroare. Te rugăm să încerci din nou." });
        setStatus("error");
        return;
      }
      reportLead(sursa);
      setStatus("done");
    } catch {
      setErrors({ form: "A apărut o eroare de conexiune. Te rugăm să încerci din nou." });
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="formcard">
        <h3>Aplicarea a fost trimisă.</h3>
        <p style={{ marginTop: "12px" }}>
          Te sunăm în cel mai scurt timp, ca să programăm. Dacă vrei să ne prinzi mai repede, ne poți
          suna la <a href="tel:+40790099070">+40 790 099 070</a>.
        </p>
      </div>
    );
  }

  const uid = lp.slug;

  return (
    <form className="formcard" onSubmit={handleSubmit} noValidate>
      <input
        className="hp"
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        placeholder="Nu completați"
      />

      <div className="field">
        <label className="lb" htmlFor={`nume-${uid}`}>
          Nume și prenume
        </label>
        <input
          type="text"
          id={`nume-${uid}`}
          name="name"
          autoComplete="name"
          placeholder="Cum să ți ne adresăm"
          required
        />
        {errors.name && <p className="fnote">{errors.name}</p>}
      </div>

      <div className="field">
        <label className="lb" htmlFor={`varsta-${uid}`}>
          Vârsta
        </label>
        <input type="number" id={`varsta-${uid}`} name="varsta" min={16} max={100} placeholder="Ex.: 47" />
        {errors.age && <p className="fnote">{errors.age}</p>}
      </div>

      <div className="field">
        <label className="lb" htmlFor={`tel-${uid}`}>
          Telefon
        </label>
        <input
          type="tel"
          id={`tel-${uid}`}
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          placeholder="Ca să te putem programa"
          required
        />
        {errors.phone && <p className="fnote">{errors.phone}</p>}
      </div>

      <div className="field">
        <label className="lb" htmlFor={`mail-${uid}`}>
          Email
        </label>
        <input
          type="email"
          id={`mail-${uid}`}
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Aici îți trimitem confirmarea"
          required
        />
        {errors.email && <p className="fnote">{errors.email}</p>}
      </div>

      <div className="field">
        <label className="lb" htmlFor={`situatie-${uid}`}>
          {lp.form.situatieLabel}
        </label>
        <select id={`situatie-${uid}`} name="situatie" defaultValue="">
          <option value="">Alege varianta apropiată</option>
          {lp.form.situatieOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
          <option>Mai multe dintre ele</option>
        </select>
      </div>

      <div className="field">
        <label className="lb" htmlFor={`durata-${uid}`}>
          {lp.form.durataLabel}
        </label>
        <select id={`durata-${uid}`} name="durata" defaultValue="">
          <option value="">Alege varianta apropiată</option>
          <option>De câteva săptămâni</option>
          <option>De 3 până la 12 luni</option>
          <option>De 1 până la 3 ani</option>
          <option>De peste 3 ani</option>
        </select>
      </div>

      <div className="field">
        <label className="lb" htmlFor={`incercat-${uid}`}>
          Ce ai încercat până acum? <i>(opțional)</i>
        </label>
        <textarea
          id={`incercat-${uid}`}
          name="incercat"
          maxLength={1000}
          placeholder={lp.form.incercatPlaceholder}
        />
      </div>

      <div className="pricenote">
        <b>Un BrainMap costă 1.200 de lei</b> și include scanarea, interpretarea pe loc, consultul
        psihologic și PDF-ul cu recomandări.
      </div>

      <label className="check">
        <input type="checkbox" checked={agreedPrice} onChange={(e) => setAgreedPrice(e.target.checked)} />
        <span>Am citit și sunt de acord cu acest preț.</span>
      </label>
      <label className="check">
        <input type="checkbox" checked={agreedGdpr} onChange={(e) => setAgreedGdpr(e.target.checked)} />
        <span>
          Sunt de acord să fiu contactat în legătură cu aplicarea mea și cu prelucrarea datelor conform{" "}
          <a href="/politica-de-confidentialitate" target="_blank" rel="noreferrer">
            politicii de confidențialitate
          </a>
          .
        </span>
      </label>
      {errors.consent && <p className="fnote">{errors.consent}</p>}

      <button type="submit" className="btn btn-block btn-lg" disabled={status === "submitting" || !consentOk}>
        {status === "submitting" ? "Se trimite…" : "Trimite aplicarea →"}
      </button>
      <p className="fnote">Te sunăm noi, în cel mai scurt timp.</p>
      <p className="fconf">Datele tale sunt confidențiale.</p>
      {errors.form && <p className="fnote">{errors.form}</p>}
    </form>
  );
}
