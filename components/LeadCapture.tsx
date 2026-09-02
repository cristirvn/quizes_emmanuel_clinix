"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { leadForm } from "@/content/site";
import { CalculatingOverlay, calcDelayMs } from "@/components/CalculatingOverlay";
import {
  isPlausibleQuestionnaireEmail,
  isPlausibleRomanianMobile,
  QUESTIONNAIRE_CONTACT_ERROR,
} from "@/lib/contact-validation";

type Gtag = (...args: unknown[]) => void;

/**
 * Report the conversion the moment the lead actually reaches `/api/lead` — NOT
 * on a page view. (It used to fire from a `ConversionTracker` mounted on
 * `/multumim` + `/rezultat/*`, which both missed the scored tests, whose result
 * renders in place with no navigation, and invented conversions for anyone who
 * merely *visited* a result page.)
 *
 * `event` is `generate_lead` for a real new lead; the result page's S12 booking
 * form passes `booking_request` instead — the same person converting a second
 * time must not be billed as a second Ads conversion.
 */
function reportConversion(event: string, sursa: string) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;

  gtag("event", event, { sursa });

  const adsId = process.env.NEXT_PUBLIC_GADS_ID;
  const label = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;
  if (event === "generate_lead" && adsId && label) {
    gtag("event", "conversion", { send_to: `${adsId}/${label}` });
  }
}

/**
 * The lead-capture fields (name + phone + honeypot) and the POST to
 * `/api/lead`. Extracted from the old TriageForm so it can be reused by:
 *  - `components/Quiz.tsx` — the final step of the evaluation funnel, where
 *    `concern` is the resolved condition and `onSuccess` redirects to the
 *    result page.
 *  - `app/contact/page.tsx` (a server component) — a plain "call me back" form
 *    that passes `redirectTo="/multumim"`.
 *
 * Provide either `onSuccess` (a callback, e.g. the quiz's dynamic redirect) or
 * `redirectTo` (a static path). The form must never be blocked by a failed
 * submit; on error we show a message and let the user retry.
 */
export function LeadCapture({
  concern,
  fields,
  onSuccess,
  redirectTo,
  submitLabel = leadForm.submit,
  defaultName,
  callInterval = false,
  collectEmail = false,
  conversionEvent = "generate_lead",
  loadingMessage,
  requireConsent = true,
}: {
  /** Sent as the lead's `concern` (the resolved condition name, when known). */
  concern?: string;
  /**
   * GoHighLevel custom fields derived from the quiz answers (ramura,
   * i2_manifestare, i3_durata, i4_istoric, i5_urgenta, …). Forwarded to
   * `/api/lead` so the CRM contact lands pre-tagged in the branch pipeline.
   */
  fields?: Record<string, string>;
  /**
   * Called after a successful submit — typically a router redirect. Receives
   * the submitted name so the quiz can carry it into the result-page mirror.
   */
  onSuccess?: (data: { name: string }) => void;
  /** Static path to navigate to on success (alternative to `onSuccess`). */
  redirectTo?: string;
  submitLabel?: string;
  /** Pre-fills the name field — used by the result page's S12 intent form,
   * where the visitor's name is already known from the quiz. */
  defaultName?: string;
  /** Renders the "interval preferat pentru apel" dropdown (S12 booking intent);
   * the choice is forwarded to the CRM as the `i6_interval` custom field. */
  callInterval?: boolean;
  /** Renders a required email field — used by both questionnaires (the result is
   * emailed, and the v1 GHL form spec wants "Prenume, Telefon, Email vizibile").
   * Forwarded to `/api/lead` as `email`. */
  collectEmail?: boolean;
  /** GA4 event fired on a successful submit. `generate_lead` (default) is a new
   * lead and also reports the Google Ads conversion; the result page's S12
   * booking form passes `booking_request`, because that visitor already
   * converted in the quiz and must not be counted twice. */
  conversionEvent?: "generate_lead" | "booking_request";
  /** When set, a ~5s "calculating your result" screen replaces the form after a
   * successful submit, before `onSuccess`/`redirectTo` fires. Used by the
   * questionnaires so the visitor sees "Calculăm răspunsurile tale…" while the
   * personalized landing page loads. Plain contact/booking forms leave it unset. */
  loadingMessage?: string;
  /** Renders the two mandatory GDPR checkboxes (terms + contact consent) and
   * keeps the submit button disabled until both are checked (client ask: "până
   * nu bifează omul ambele, nu poate să meargă mai departe" — extended
   * 2026-08-22 to every form on the site, no exceptions: "the user should
   * check the box to be contacted every time before submitting"). Defaults to
   * `true`; only pass `false` for a deliberate, explicit exception. */
  requireConsent?: boolean;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "loading" | "error">("idle");
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentContact, setConsentContact] = useState(false);
  const consentOk = !requireConsent || (consentTerms && consentContact);
  // Field-level validation messages so the visitor knows *why* it failed
  // (client ask: "spune de ce nu e bine — telefon incorect / email invalid").
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    form?: string;
  }>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consentOk) {
      setErrors({ form: "Trebuie să bifezi acordul de a fi contactat ca să poți trimite formularul." });
      return;
    }

    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = {
      name: String(fd.get("name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      website: String(fd.get("website") ?? ""),
    };
    if (concern) payload.concern = concern;
    if (collectEmail) payload.email = String(fd.get("email") ?? "").trim();

    // ── Client-side validation with specific, human messages ──────────────
    const fieldErrors: { name?: string; phone?: string; email?: string } = {};
    if (payload.name.length < 2) {
      fieldErrors.name = "Te rugăm să îți scrii numele.";
    }
    if (!isPlausibleRomanianMobile(payload.phone)) {
      fieldErrors.phone = QUESTIONNAIRE_CONTACT_ERROR.phone;
    }
    if (collectEmail && !isPlausibleQuestionnaireEmail(payload.email ?? "")) {
      fieldErrors.email = QUESTIONNAIRE_CONTACT_ERROR.email;
    }
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("submitting");

    // Merge the quiz-derived fields with the optional call-interval choice.
    const interval = callInterval ? String(fd.get("call_interval") ?? "") : "";
    const mergedFields: Record<string, string> = {
      ...(fields ?? {}),
      ...(interval ? { i6_interval: interval } : {}),
      // Record the consent, don't just gate on it. The questionnaires collect
      // health answers — Art. 9 special-category data, whose lawful basis is
      // consent, and consent you cannot evidence is consent you don't have. The
      // `/lp/*` forms already send this; without it here, the two funnels that
      // ask the most sensitive questions were the only ones leaving no trace.
      ...(requireConsent ? { consimtamant: "da", consimtamant_la: new Date().toISOString() } : {}),
    };
    const hasFields = Object.keys(mergedFields).length > 0;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hasFields ? { ...payload, fields: mergedFields } : payload),
      });
      if (!res.ok) {
        // Map the server's answer to a message the visitor can act on.
        if (res.status === 422) {
          setErrors({ form: "Verifică numărul de telefon și adresa de email — ceva nu e valid." });
        } else if (res.status === 429) {
          setErrors({ form: "Prea multe încercări. Te rugăm să reîncerci peste câteva minute." });
        } else {
          setErrors({ form: "A apărut o eroare. Te rugăm să încerci din nou." });
        }
        setStatus("error");
        return;
      }
      reportConversion(conversionEvent, mergedFields.sursa ?? "formular-contact");
      if (loadingMessage) {
        // "Calculăm răspunsurile tale…" — full-screen popup, held a random
        // 5–10s (client ask), then reveal the result.
        setStatus("loading");
        await new Promise((r) => setTimeout(r, calcDelayMs()));
      }
      if (onSuccess) onSuccess({ name: payload.name });
      else if (redirectTo) router.push(redirectTo);
    } catch {
      setErrors({ form: "A apărut o eroare de conexiune. Te rugăm să încerci din nou." });
      setStatus("error");
    }
  }

  // ── "Calculăm răspunsurile tale…" popup (questionnaires) ──────────────────
  // Full-screen dimmed overlay over the whole page (client ask), held a random
  // 5–10s by the submit handler before the result is revealed.
  if (status === "loading" && loadingMessage) {
    return <CalculatingOverlay message={loadingMessage} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from humans, catches bots */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Nu completați acest câmp</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block font-medium text-navy">
          {leadForm.fields.name.label} <span className="text-blue">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={defaultName}
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 text-base text-navy placeholder:text-muted outline-none focus:ring-2 ${
            errors.name
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
              : "border-line focus:border-blue focus:ring-blue/20"
          }`}
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block font-medium text-navy">
          {leadForm.fields.phone.label} <span className="text-blue">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          pattern="(?:07[0-9]{8}|(?:\\+40|0040)7[0-9]{8})"
          title="Număr de mobil românesc: 07xxxxxxxx, +407xxxxxxxx sau 00407xxxxxxxx"
          aria-invalid={errors.phone ? true : undefined}
          className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 text-base text-navy placeholder:text-muted outline-none focus:ring-2 ${
            errors.phone
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
              : "border-line focus:border-blue focus:ring-blue/20"
          }`}
        />
        {errors.phone && (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      {collectEmail && (
        <div>
          <label htmlFor="email" className="block font-medium text-navy">
            Email <span className="text-blue">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            pattern="[A-Za-z0-9._%+-]+@(gmail\\.com|yahoo\\.com|yahoo\\.ro)"
            title="Folosește o adresă Gmail sau Yahoo validă."
            aria-invalid={errors.email ? true : undefined}
            className={`mt-2 w-full rounded-lg border bg-white px-4 py-3 text-base text-navy placeholder:text-muted outline-none focus:ring-2 ${
              errors.email
                ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                : "border-line focus:border-blue focus:ring-blue/20"
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      )}

      {callInterval && (
        <div>
          <label htmlFor="call_interval" className="block font-medium text-navy">
            Interval preferat pentru apel
          </label>
          <select
            id="call_interval"
            name="call_interval"
            defaultValue="oricand"
            className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 text-base text-navy placeholder:text-muted outline-none focus:border-blue focus:ring-2 focus:ring-blue/20"
          >
            <option value="oricand">Oricând vă e mai ușor</option>
            <option value="dimineata">Dimineața (9–12)</option>
            <option value="pranz">La prânz (12–17)</option>
            <option value="seara">Seara (17–20)</option>
          </select>
        </div>
      )}

      {requireConsent && (
        <div className="space-y-3">
          <label className="flex items-start gap-3 text-sm text-navy">
            <input
              type="checkbox"
              checked={consentTerms}
              onChange={(e) => setConsentTerms(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-blue focus:ring-2 focus:ring-blue/20"
            />
            <span>
              Am citit și sunt de acord cu{" "}
              <a href="/termeni-si-conditii" target="_blank" className="underline underline-offset-2 hover:text-blue">
                Termenii, Condițiile
              </a>{" "}
              și{" "}
              <a href="/politica-de-confidentialitate" target="_blank" className="underline underline-offset-2 hover:text-blue">
                Politica de Confidențialitate
              </a>
              . <span className="text-blue">*</span>
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm text-navy">
            <input
              type="checkbox"
              checked={consentContact}
              onChange={(e) => setConsentContact(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-blue focus:ring-2 focus:ring-blue/20"
            />
            <span>
              Sunt de acord să fiu contactat telefonic sau prin e-mail pentru a discuta rezultatele
              și a primi comunicări promoționale. <span className="text-blue">*</span>
            </span>
          </label>
        </div>
      )}

      {errors.form && (
        <p className="text-sm text-red-600" role="alert">
          {errors.form}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || !consentOk}
        className="w-full rounded-2xl bg-navy px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue disabled:opacity-60"
      >
        {status === "submitting" ? "Se trimite…" : submitLabel}
      </button>

      <p className="text-center text-sm text-muted">{leadForm.note}</p>
    </form>
  );
}
