/**
 * Quiz engine for the single adaptive evaluation (`content/quiz.ts`).
 *
 * Pure and UI-agnostic — `components/Quiz.tsx` drives the screens, this module
 * only answers: "given this answer, what comes next?", "which landing page is
 * the outcome?" and "what do we forward to GoHighLevel?".
 *
 * Routing is deterministic (not weighted scoring): options carry an explicit
 * `next` for navigation and an optional `slug` for the outcome. The LAST
 * answered option that carries a `slug` wins, so a later deciding question can
 * override an earlier provisional assignment (sleep/exhaustion decide at Î2, the
 * child branch at Î4 with an Î2 fallback). See the deck's routing map.
 */
import { quiz, type QuizOption, type QuizQuestion, type Urgency } from "@/content/quiz";
import { getCondition } from "@/content/conditions";

export interface Outcome {
  slug: string;
  name: string;
}

/** A single answered step, in order. */
export interface AnsweredStep {
  id: string;
  optionIndex: number;
}

/** Safe outcome if routing somehow yields nothing (defensive; unreachable). */
const FALLBACK_SLUG = "anxietate";

export function getQuestion(id: string): QuizQuestion {
  const q = quiz.questions[id];
  if (!q) throw new Error(`unknown quiz question: ${id}`);
  return q;
}

/** The chosen option for an answered step (or `null` if it can't be resolved). */
function optionFor(step: AnsweredStep): QuizOption | null {
  return quiz.questions[step.id]?.options[step.optionIndex] ?? null;
}

/**
 * Resolve a Chestionare deep-link `?topic=` into a pre-answered first step.
 * Pre-selecting a domain records that Î1 was answered with the matching option
 * and jumps straight to its branch question. Because Î1 options can carry a
 * `slug`/`branch`, that seeded step is kept in the stack so routing and GHL
 * tagging still see it. Returns `null` for an unknown/missing topic.
 */
export function startFromTopic(
  topic: string | undefined | null,
): { questionId: string; optionIndex: number; next: string } | null {
  if (!topic) return null;
  const start = quiz.questions[quiz.start];
  const optionIndex = start.options.findIndex((o) => o.topic === topic);
  if (optionIndex < 0) return null;
  const next = start.options[optionIndex].next;
  if (!next) return null;
  return { questionId: quiz.start, optionIndex, next };
}

/**
 * The next question id after answering `current` with `option`. An explicit
 * `option.next` wins; otherwise we walk the shared `tail` (skipping already
 * visited questions). Returns `null` when the quiz is finished.
 *
 * @param visited Ids already shown, INCLUDING `current`.
 */
export function nextQuestionId(
  current: QuizQuestion,
  option: QuizOption,
  visited: ReadonlySet<string>,
): string | null {
  if (option.next) return option.next;
  for (const id of quiz.tail) {
    if (!visited.has(id)) return id;
  }
  return null;
}

/** Highest-priority slug from the answered path (last `slug` assignment wins). */
export function resolveOutcome(steps: ReadonlyArray<AnsweredStep>): Outcome {
  let slug: string | null = null;
  for (const step of steps) {
    const opt = optionFor(step);
    if (opt?.slug) slug = opt.slug;
  }
  const finalSlug = slug ?? FALLBACK_SLUG;
  return { slug: finalSlug, name: getCondition(finalSlug)?.name ?? finalSlug };
}

/** The branch (A–F) chosen at Î1, or `null` before triage is answered. */
export function branchOf(steps: ReadonlyArray<AnsweredStep>): string | null {
  for (const step of steps) {
    const opt = optionFor(step);
    if (opt?.branch) return opt.branch;
  }
  return null;
}

/** The urgency tier chosen at the shared Î5, or `null` if not answered yet. */
export function urgencyOf(steps: ReadonlyArray<AnsweredStep>): Urgency | null {
  for (const step of steps) {
    const opt = optionFor(step);
    if (opt?.urgency) return opt.urgency;
  }
  return null;
}

// ── GoHighLevel field mapping ───────────────────────────────────────────────

/**
 * Slugify a label into a stable value (diacritics folded) — used when an option
 * has no explicit `key`.
 */
function slugifyValue(label: string): string {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

/**
 * Build the GHL custom-field payload from the answered path: `sursa`, `ramura`,
 * the per-question `field` values (i2_manifestare, i3_durata, i4_istoric, …) and
 * `i5_urgenta`. Values come from each option's `key`, falling back to a
 * slugified label. Fed to `/api/lead` (hidden fields) so the CRM contact lands
 * pre-tagged and drops into the branch pipeline.
 *
 * `sursa` says which funnel produced the lead. The scored self-tests send
 * `sursa: "test-<slug>"` (+ an inferred `i5_urgenta`), so a single GHL workflow
 * can route every lead while still telling the two funnels apart.
 */
export function extractLeadFields(steps: ReadonlyArray<AnsweredStep>): Record<string, string> {
  const fields: Record<string, string> = { sursa: "chestionar-adaptiv" };

  const branch = branchOf(steps);
  if (branch) fields.ramura = branch;

  for (const step of steps) {
    const question = quiz.questions[step.id];
    const opt = question?.options[step.optionIndex];
    if (!question?.field || !opt) continue;
    fields[question.field] = opt.key ?? slugifyValue(opt.label);
  }

  return fields;
}

// ── Answer summary (passed to the result page via the redirect URL) ─────────

/**
 * A compact record of what the visitor answered: `{ questionId → optionIndex }`
 * plus their name. Encoded into the `?r=` token on the `/rezultat/[slug]`
 * redirect so the result page can render a server-side "mirror" of the actual
 * answers — no sessionStorage, no PII stored, no hydration flash. Option
 * indices (not free text) keep the URL small; labels are reconstructed on the
 * server via `getQuestion(qid).options[i].label`.
 */
export interface AnswerSummary {
  answers: Record<string, number>;
  /** Ordered question ids as answered — lets the page mirror them in sequence. */
  order: string[];
  name: string;
}

/** Build the summary from the quiz's answered steps. */
export function summarizeAnswers(
  steps: ReadonlyArray<AnsweredStep>,
  name: string,
): AnswerSummary {
  const answers: Record<string, number> = {};
  const order: string[] = [];
  for (const step of steps) {
    answers[step.id] = step.optionIndex;
    order.push(step.id);
  }
  return { answers, order, name };
}

/** Reconstruct ordered answered steps from a decoded summary (for the result page). */
export function stepsFromSummary(summary: AnswerSummary): AnsweredStep[] {
  return summary.order
    .filter((id) => id in summary.answers)
    .map((id) => ({ id, optionIndex: summary.answers[id] }));
}

/** base64url-encode a summary (isomorphic — btoa/TextEncoder work in both envs). */
export function encodeSummary(summary: AnswerSummary): string {
  const bytes = new TextEncoder().encode(JSON.stringify(summary));
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Decode a `?r=` token back into a summary, or `null` if missing/malformed. */
export function decodeSummary(token: string | undefined | null): AnswerSummary | null {
  if (!token) return null;
  try {
    const b64 = token.replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const parsed = JSON.parse(new TextDecoder().decode(bytes));
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof parsed.name === "string" &&
      parsed.answers &&
      typeof parsed.answers === "object"
    ) {
      // `order` was added later — tolerate tokens without it.
      if (!Array.isArray(parsed.order)) parsed.order = Object.keys(parsed.answers);
      return parsed as AnswerSummary;
    }
    return null;
  } catch {
    return null;
  }
}
