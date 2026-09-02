import { NextResponse } from "next/server";
import { z } from "zod";
import { isPlausibleQuestionnaireEmail, isPlausibleRomanianMobile } from "@/lib/contact-validation";

/**
 * Lead intake (build plan / guide §14). Validates with zod, drops honeypot
 * hits, and forwards the lead to the GoHighLevel inbound webhook server-side
 * (the URL stays hidden, enabling spam filtering later).
 *
 * Demo mode: if GHL_WEBHOOK_URL is unset, validation still runs and we return
 * { ok: true } without forwarding — so the funnel is fully clickable without
 * credentials. Real CRM delivery starts automatically once the env var is set.
 */
const leadSchema = z.object({
  name: z.string().trim().min(2, "Nume prea scurt").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Telefon invalid")
    .max(30)
    .regex(/^[0-9+()\s-]+$/, "Telefon invalid"),
  concern: z.string().trim().max(60).optional().or(z.literal("")),
  // Email — captured by the scored self-assessment quizzes (results are emailed).
  email: z.string().trim().email("Email invalid").max(120).optional().or(z.literal("")),
  // GoHighLevel custom fields. Most are short quiz-derived slug tokens (ramura,
  // i2_manifestare, i5_urgenta, …), but the `/lp/somn-b` application funnel also
  // forwards free-text qualifying answers (what they've tried, 9-month vision,
  // …) — capped generously so a tampered payload still can't bloat the CRM call.
  fields: z.record(z.string().max(40), z.string().max(1000)).optional(),
  // Honeypot — must be empty for a real human.
  website: z.string().optional(),
});

/**
 * Best-effort in-memory rate limit: max 5 submissions per IP per 10 minutes.
 * On serverless this resets per cold start / instance, so it only blunts naive
 * floods — durable protection (GHL/Cloudflare) lives in front of the webhook.
 */
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

/** Content spam heuristics — links/markup don't belong in a name or concern. */
function looksLikeSpam(name: string, concern?: string): boolean {
  const blob = `${name} ${concern ?? ""}`.toLowerCase();
  return /https?:\/\/|www\.|<a\s|\[url|\bhref=/.test(blob);
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 422 });
  }

  const { website, fields, ...lead } = parsed.data;

  // Bot caught by honeypot or spammy content — pretend success, forward nothing.
  if ((website && website.length > 0) || looksLikeSpam(lead.name, lead.concern)) {
    return NextResponse.json({ ok: true });
  }

  // Questionnaires reveal a result immediately after this endpoint accepts the
  // lead. Validate the exact gate server-side too, so an edited browser request
  // cannot use a made-up number or a placeholder email to unlock it.
  const isQuestionnaire =
    fields?.sursa === "chestionar-adaptiv" || fields?.sursa?.startsWith("test-");
  if (
    isQuestionnaire &&
    (!isPlausibleRomanianMobile(lead.phone) || !lead.email || !isPlausibleQuestionnaireEmail(lead.email))
  ) {
    return NextResponse.json({ ok: false, error: "implausible_contact" }, { status: 422 });
  }

  // No consent, no lead. Every form on the site gates its submit button on the
  // consent checkboxes, but a button is not a control: a direct POST bypasses it
  // entirely. The questionnaires collect health answers — Art. 9 special-category
  // data whose lawful basis is consent — so this is enforced where the record is
  // actually created, matching the client's own WordPress handler, which rejects
  // the same way. Unlike the honeypot above this answers honestly, because a
  // rejection here means our own form is broken, not that a bot was caught.
  if (fields?.consimtamant !== "da") {
    return NextResponse.json({ ok: false, error: "missing_consent" }, { status: 422 });
  }

  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    // Demo mode — no CRM configured yet.
    console.info("[lead] demo mode (no GHL_WEBHOOK_URL); lead:", { ...lead, ...fields });
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        // Quiz-derived custom fields flattened to top level so GHL maps each to
        // its custom field by key (ramura, i2_manifestare, i5_urgenta, …).
        ...fields,
        source: "website",
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (err) {
    console.error("[lead] webhook forward failed:", err);
    return NextResponse.json({ ok: false, error: "forward_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
