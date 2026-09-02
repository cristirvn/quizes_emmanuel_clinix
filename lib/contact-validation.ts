/**
 * Plausibility checks for the questionnaire contact gate.
 *
 * These checks deliberately do not claim to prove ownership of a phone number
 * or inbox (that would require an SMS/email verification flow). They reject
 * obviously invented data before a visitor can see a quiz result.
 */

const PLACEHOLDER_EMAIL_LOCAL_PART = /^(?:test|testing|demo|fake|asdf|qwerty|example|email|none|nume|aaa|abc|xxx|admin)(?:[._-]?\d*)$/i;
const SUPPORTED_EMAIL_DOMAINS = new Set(["gmail.com", "yahoo.com", "yahoo.ro"]);

/** Convert accepted Romanian mobile formats to the local 07xxxxxxxx form. */
function normalizeRomanianMobile(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("0040")) return `0${digits.slice(4)}`;
  if (digits.startsWith("40")) return `0${digits.slice(2)}`;
  return digits;
}

/** A plausible Romanian mobile number: 10 digits, starts 07, no test pattern. */
export function isPlausibleRomanianMobile(value: string): boolean {
  if (!/^[0-9+()\s-]+$/.test(value.trim())) return false;
  const phone = normalizeRomanianMobile(value);
  if (!phone || !/^07\d{8}$/.test(phone)) return false;

  const subscriber = phone.slice(2);
  // Reject the patterns people commonly type only to pass a form. This keeps
  // valid ordinary numbers untouched while filtering 0700000000, 0711111111,
  // 0712345678 and their descending equivalent.
  if (/^(\d)\1{7}$/.test(subscriber)) return false;
  if (subscriber === "12345678" || subscriber === "87654321") return false;
  return true;
}

/** A plausible personal Gmail/Yahoo address, excluding obvious placeholders. */
export function isPlausibleQuestionnaireEmail(value: string): boolean {
  const email = value.trim().toLowerCase();
  const match = /^([a-z0-9](?:[a-z0-9._-]{0,62}[a-z0-9])?)@([a-z0-9.-]+)$/.exec(email);
  if (!match) return false;

  const [, localPart, domain] = match;
  if (!SUPPORTED_EMAIL_DOMAINS.has(domain)) return false;
  if (!/[a-z]/.test(localPart) || PLACEHOLDER_EMAIL_LOCAL_PART.test(localPart)) return false;
  // "aaaa@gmail.com" and long repeated-character variants are not useful
  // contact details. A normal doubled letter (e.g. anna) still passes.
  if (/(.)\1{3,}/.test(localPart)) return false;
  return true;
}

export const QUESTIONNAIRE_CONTACT_ERROR = {
  phone: "Introdu un număr de mobil românesc real: 10 cifre, care începe cu 07.",
  email: "Introdu o adresă personală Gmail sau Yahoo validă (nu una de test).",
} as const;
