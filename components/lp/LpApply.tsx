"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Gtag = (...args: unknown[]) => void;

/**
 * Application form for the standalone campaign LP (`/lp/somn`). Field set,
 * copy, error messages and price disclosure all come from the client's
 * `Formular_Aplicare_EmmanuelCliniX_1.docx` spec (2026-08-22) — the canonical
 * form schema, to be reused for future `/lp/*` pages. Variant B (`LpApplyB`)
 * keeps its own heavier qualifier form; this spec was scoped to `/lp/somn`
 * only (Cristi's call).
 *
 * `abVariant` is stamped on every lead (GHL custom field `ab_variant`) so the
 * A/B test between landing pages is attributed in the CRM — the split itself is
 * done at the ad level (two ads → two LP URLs), this just tells GHL which page
 * a lead saw.
 */
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
  situatie?: string;
  durata?: string;
  pretOk?: string;
  consent?: string;
  form?: string;
};

export function LpApply({ abVariant }: { abVariant: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [consent, setConsent] = useState(false);
  const [pretOk, setPretOk] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const age = String(fd.get("age") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const situatie = String(fd.get("situatie") ?? "").trim();
    const durata = String(fd.get("durata") ?? "").trim();
    const incercat = String(fd.get("incercat") ?? "").trim();
    const website = String(fd.get("website") ?? "");

    const fe: Errors = {};
    if (name.length < 2) fe.name = "Scrie-ne numele, ca să știm cum să ți ne adresăm.";
    if (!age) fe.age = "Scrie-ne și vârsta. Contează pentru cum citim evaluarea.";
    else if (!/^\d{1,3}$/.test(age) || Number(age) < 10 || Number(age) > 110)
      fe.age = "Scrie vârsta în cifre, te rugăm.";
    const digits = phone.replace(/\D/g, "");
    if (!/^[0-9+()\s-]+$/.test(phone) || digits.length < 10)
      fe.phone = "Avem nevoie de un număr valid, altfel nu te putem programa.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      fe.email = "Verifică adresa — pare să lipsească ceva.";
    if (!situatie) fe.situatie = "Alege varianta care se potrivește cel mai bine.";
    if (!durata) fe.durata = "Alege de cât timp durează, ca să știm de unde pornim.";
    if (!pretOk) fe.pretOk = "Trebuie să confirmi că ești de acord cu prețul ca să poți trimite formularul.";
    if (!consent) fe.consent = "Fără bifa asta nu avem voie să îți răspundem.";
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
            sursa: "lp-somn",
            ab_variant: abVariant,
            varsta: age,
            situatie,
            i3_durata: durata,
            pret_confirmat: "da",
            consimtamant: "da",
            ...(incercat ? { incercat } : {}),
          },
        }),
      });
      if (!res.ok) {
        setErrors({
          form: "Ceva n-a mers la trimitere. Mai încearcă o dată, iar dacă nu merge nici acum, scrie-ne la contact@emmanuelclinix.ro.",
        });
        setStatus("error");
        return;
      }
      reportLead("lp-somn");
      router.push("/lp/somn/multumim");
    } catch {
      setErrors({
        form: "Ceva n-a mers la trimitere. Mai încearcă o dată, iar dacă nu merge nici acum, scrie-ne la contact@emmanuelclinix.ro.",
      });
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="hp" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="website">Nu completați</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label htmlFor="nume">Nume și prenume</label>
        <input type="text" id="nume" name="name" placeholder="Cum să ți ne adresăm" autoComplete="name" required />
        {errors.name && <p className="field-err">{errors.name}</p>}
      </div>
      <div className="field">
        <label htmlFor="varsta">Vârsta</label>
        <input
          type="number"
          id="varsta"
          name="age"
          placeholder="Ex.: 47"
          min={10}
          max={110}
          inputMode="numeric"
          required
        />
        {errors.age && <p className="field-err">{errors.age}</p>}
      </div>
      <div className="field">
        <label htmlFor="telefon">Telefon</label>
        <input
          type="tel"
          id="telefon"
          name="phone"
          placeholder="Ca să te putem programa"
          autoComplete="tel"
          inputMode="tel"
          required
        />
        {errors.phone && <p className="field-err">{errors.phone}</p>}
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Aici îți trimitem răspunsul scris"
          autoComplete="email"
          inputMode="email"
          required
        />
        {errors.email && <p className="field-err">{errors.email}</p>}
      </div>
      <div className="field">
        <label htmlFor="situatie">Care e situația ta?</label>
        <select id="situatie" name="situatie" defaultValue="">
          <option value="" disabled>
            Alege varianta apropiată
          </option>
          <option value="nu-adorm">Nu pot adormi seara</option>
          <option value="trezire-noapte">Mă trezesc noaptea și nu mai adorm</option>
          <option value="energie-scazuta">Dorm destul, dar mă trezesc fără energie</option>
          <option value="mai-multe">Mai multe dintre ele</option>
        </select>
        {errors.situatie && <p className="field-err">{errors.situatie}</p>}
      </div>
      <div className="field">
        <label htmlFor="problema">De cât timp nu dormi bine?</label>
        <select id="problema" name="durata" defaultValue="">
          <option value="" disabled>
            Alege varianta apropiată
          </option>
          <option value="cateva-saptamani">De câteva săptămâni</option>
          <option value="3-12-luni">De 3 până la 12 luni</option>
          <option value="1-3-ani">De 1 până la 3 ani</option>
          <option value="peste-3-ani">De peste 3 ani</option>
        </select>
        {errors.durata && <p className="field-err">{errors.durata}</p>}
      </div>
      <div className="field">
        <label htmlFor="incercat">
          Ce ai încercat până acum? <span style={{ fontWeight: 400 }}>(opțional)</span>
        </label>
        <textarea
          id="incercat"
          name="incercat"
          maxLength={1000}
          placeholder="Somnifere, suplimente, medici, terapie... scrie pe scurt. Ne ajută să știm de unde pornim."
        />
      </div>

      <p className="price-note">
        Evaluarea costă 1.200 de lei și include scanarea, interpretarea pe loc, consultul psihologic și PDF-ul cu
        recomandări. Dacă începi tratamentul cu noi, suma se scade integral.
      </p>

      <label className="consent-check">
        <input type="checkbox" checked={pretOk} onChange={(e) => setPretOk(e.target.checked)} />
        <span>Am citit și sunt de acord cu acest preț.</span>
      </label>
      {errors.pretOk && <p className="field-err">{errors.pretOk}</p>}

      <label className="consent-check">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>Sunt de acord să fiu contactat în legătură cu aplicarea mea.</span>
      </label>
      {errors.consent && <p className="field-err">{errors.consent}</p>}

      {errors.form && <p className="field-err">{errors.form}</p>}
      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={status === "submitting" || !consent || !pretOk}
      >
        {status === "submitting" ? "Se trimite…" : "Trimite aplicarea →"}
      </button>
      <p className="apply-microcopy">
        Îți răspunde un om din echipă, nu un robot. Dacă vedem că nu suntem noi răspunsul potrivit pentru tine, îți
        spunem direct.
      </p>
    </form>
  );
}
