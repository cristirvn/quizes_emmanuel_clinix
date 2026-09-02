"use client";

import { useState, type FormEvent } from "react";

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
  situatie?: string;
  durata?: string;
  contraindicatii?: string;
  pretOk?: string;
  consent?: string;
  form?: string;
};
type Contact = { name: string; phone: string; email: string };

/**
 * Application form for `/lp/emsella`. Two steps — contact form (real lead
 * submit) then a calendar step with a "prefer telefon" opt-out toggle, per
 * client ask (2026-08-22). Copy/fields ported from the client's own mockup
 * (`lp-emsella.html`, 2026-08-23): situație + durată qualifiers, mandatory
 * contraindication confirm (pregnancy/pacemaker/pelvic implants/copper IUD —
 * these are real EmSella contraindications, not just lead-quality filtering),
 * and the 250 / 1.150 / 2.000 lei pricing.
 */
export function LpEmsellaApply() {
  const [step, setStep] = useState<"form" | "programare">("form");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [consent, setConsent] = useState(false);
  const [contraindicatii, setContraindicatii] = useState(false);
  const [pretOk, setPretOk] = useState(false);
  const [contact, setContact] = useState<Contact | null>(null);
  const [preferPhone, setPreferPhone] = useState(false);
  const [phonePrefSent, setPhonePrefSent] = useState(false);

  const bookingUrl = process.env.NEXT_PUBLIC_GHL_BOOKING_URL;

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
    if (name.length < 2) fe.name = "Te rugăm să îți scrii numele.";
    if (!age) fe.age = "Scrie-ne și vârsta.";
    else if (!/^\d{1,3}$/.test(age) || Number(age) < 18 || Number(age) > 100) fe.age = "Scrie vârsta în cifre, te rugăm.";
    const digits = phone.replace(/\D/g, "");
    if (!/^[0-9+()\s-]+$/.test(phone) || digits.length < 10)
      fe.phone = "Numărul de telefon pare incorect sau incomplet.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fe.email = "Adresa de email nu pare validă.";
    if (!situatie) fe.situatie = "Alege varianta care se potrivește cel mai bine.";
    if (!durata) fe.durata = "Alege de cât timp ai problema asta.";
    if (!contraindicatii)
      fe.contraindicatii =
        "Trebuie să confirmi că nu ai contraindicații ca să poți trimite formularul.";
    if (!pretOk) fe.pretOk = "Trebuie să confirmi că ești de acord cu aceste prețuri ca să poți trimite formularul.";
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
          concern: "emsella",
          fields: {
            sursa: "lp-emsella",
            varsta: age,
            situatie,
            durata,
            fara_contraindicatii: "da",
            pret_confirmat: "da",
            consimtamant: "da",
            ...(incercat ? { incercat } : {}),
          },
        }),
      });
      if (!res.ok) {
        setErrors({ form: "A apărut o eroare. Te rugăm să încerci din nou." });
        setStatus("error");
        return;
      }
      reportLead("lp-emsella");
      setStatus("idle");
      setContact({ name, phone, email });
      setStep("programare");
    } catch {
      setErrors({ form: "A apărut o eroare de conexiune. Te rugăm să încerci din nou." });
      setStatus("error");
    }
  }

  async function handlePreferPhone(checked: boolean) {
    setPreferPhone(checked);
    if (!checked || phonePrefSent || !contact) return;
    setPhonePrefSent(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          concern: "emsella",
          fields: { sursa: "lp-emsella", consimtamant: "da", programare_telefonica: "da" },
        }),
      });
    } catch {
      // Best-effort — the lead already landed at step 1, this is a follow-up note.
    }
  }

  if (step === "programare") {
    return (
      <div className="apply-divider">
        <h3>Alege o oră pentru ședință</h3>
        <p className="apply-divider-sub">Sau bifează mai jos și te sunăm noi ca să stabilim.</p>

        {bookingUrl ? (
          <div className={`booking-frame-wrap${preferPhone ? " is-disabled" : ""}`}>
            <iframe src={bookingUrl} className="booking-frame" scrolling="no" title="Calendar programări EmSella" />
          </div>
        ) : (
          <div className={`booking-frame-wrap${preferPhone ? " is-disabled" : ""}`}>
            <div className="booking-frame booking-frame-demo">
              [Placeholder — aici apare calendarul GHL, setează NEXT_PUBLIC_GHL_BOOKING_URL]
            </div>
          </div>
        )}

        <label className={`prefer-phone-toggle${preferPhone ? " is-checked" : ""}`}>
          <input type="checkbox" checked={preferPhone} onChange={(e) => handlePreferPhone(e.target.checked)} />
          <span className="prefer-phone-icon">📞</span>
          <span>Prefer să stabilim la telefon data și ora ședinței</span>
        </label>
        {preferPhone && <p className="prefer-phone-confirm">Notat! Te sunăm noi ca să stabilim ora.</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="hp" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="website-emsella">Nu completați</label>
        <input id="website-emsella" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label htmlFor="nume-emsella">Nume și prenume</label>
        <input
          type="text"
          id="nume-emsella"
          name="name"
          placeholder="Cum să ți ne adresăm"
          autoComplete="name"
          required
        />
        {errors.name && <p className="field-err">{errors.name}</p>}
      </div>
      <div className="field">
        <label htmlFor="varsta-emsella">Vârsta</label>
        <input
          type="number"
          id="varsta-emsella"
          name="age"
          placeholder="Ex.: 64"
          min={18}
          max={100}
          inputMode="numeric"
          required
        />
        {errors.age && <p className="field-err">{errors.age}</p>}
      </div>
      <div className="field">
        <label htmlFor="telefon-emsella">Telefon</label>
        <input
          type="tel"
          id="telefon-emsella"
          name="phone"
          placeholder="Ca să te putem programa"
          autoComplete="tel"
          inputMode="tel"
          required
        />
        {errors.phone && <p className="field-err">{errors.phone}</p>}
      </div>
      <div className="field">
        <label htmlFor="email-emsella">Email</label>
        <input
          type="email"
          id="email-emsella"
          name="email"
          placeholder="Aici îți trimitem confirmarea"
          autoComplete="email"
          inputMode="email"
          required
        />
        {errors.email && <p className="field-err">{errors.email}</p>}
      </div>
      <div className="field">
        <label htmlFor="situatie-emsella">Care e situația ta?</label>
        <select id="situatie-emsella" name="situatie" defaultValue="">
          <option value="" disabled>
            Alege varianta apropiată
          </option>
          <option value="strănut-tuse-efort">Pierd urină la strănut, tuse sau efort</option>
          <option value="urgenta">Îmi vine brusc și abia ajung la baie</option>
          <option value="treziri-noapte">Mă trezesc noaptea de mai multe ori</option>
          <option value="mai-multe">Mai multe dintre ele</option>
        </select>
        {errors.situatie && <p className="field-err">{errors.situatie}</p>}
      </div>
      <div className="field">
        <label htmlFor="durata-emsella">De cât timp?</label>
        <select id="durata-emsella" name="durata" defaultValue="">
          <option value="" disabled>
            Alege varianta apropiată
          </option>
          <option value="cateva-luni">De câteva luni</option>
          <option value="1-3-ani">De 1 până la 3 ani</option>
          <option value="3-10-ani">De 3 până la 10 ani</option>
          <option value="peste-10-ani">De peste 10 ani</option>
        </select>
        {errors.durata && <p className="field-err">{errors.durata}</p>}
      </div>
      <div className="field">
        <label htmlFor="detalii-emsella">
          Ce ai încercat până acum? <span style={{ fontWeight: 400 }}>(opțional)</span>
        </label>
        <textarea
          id="detalii-emsella"
          name="incercat"
          maxLength={1000}
          placeholder="Exerciții Kegel, absorbante, control de specialitate… scrie pe scurt."
        />
      </div>

      <div className="contra-check">
        <label>
          <input
            type="checkbox"
            checked={contraindicatii}
            onChange={(e) => setContraindicatii(e.target.checked)}
          />
          <span>
            Confirm că nu sunt însărcinată, nu am stimulator cardiac, nu am implanturi metalice în zona pelvină și
            nu am sterilet de cupru.
          </span>
        </label>
      </div>
      {errors.contraindicatii && <p className="field-err">{errors.contraindicatii}</p>}

      <p className="price-note">
        250 de lei o ședință. 1.150 de lei pachetul de 5 ședințe. 2.000 de lei pachetul de 10 ședințe. Poți începe
        cu o singură ședință și decizi după.
      </p>

      <label className="consent-check">
        <input type="checkbox" checked={pretOk} onChange={(e) => setPretOk(e.target.checked)} />
        <span>Am citit și sunt de acord cu aceste prețuri.</span>
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
        disabled={status === "submitting" || !consent || !contraindicatii || !pretOk}
      >
        {status === "submitting" ? "Se trimite…" : "Trimite aplicarea →"}
      </button>
      <p className="apply-microcopy">Te sunăm noi, în cel mai scurt timp.</p>
    </form>
  );
}
