import "server-only";

import type { StartProjectDraft } from "@/lib/start-project";

// Humans need at least a few seconds to fill the form; scripted posts arrive almost instantly.
const minFillTimeMs = 3_000;
// Ignore stale timestamps so a captured payload cannot be replayed indefinitely.
const maxFillTimeMs = 24 * 60 * 60 * 1_000;

export type SpamSignals = {
  honeypot: unknown;
  startedAt: unknown;
};

// A word with several capitals scattered mid-word ("FXWiBPiNmYeAsojHnohi") is a random token, not language.
// Real brand casing like "iPhone", "GitHub" or "McDonald" has at most one or two interior capitals.
function looksLikeRandomToken(word: string) {
  if (word.length < 10 || !/^[A-Za-z]+$/.test(word)) return false;
  const interiorCapitals = word.slice(1).replace(/[^A-Z]/g, "").length;
  return interiorCapitals >= 3 && interiorCapitals / word.length >= 0.3;
}

function containsRandomToken(value: string) {
  return value.split(/\s+/).some(looksLikeRandomToken);
}

// Returns a reason string when the submission looks automated, or null when it looks human.
// Reasons are for server logs only — callers should never reveal them to the client.
export function detectSpamSubmission(
  submission: StartProjectDraft,
  { honeypot, startedAt }: SpamSignals,
): string | null {
  // The hidden field is invisible to people, so any value means a bot auto-filled it.
  if (typeof honeypot === "string" && honeypot.trim() !== "") return "honeypot";

  // Direct API posts skip the modal entirely and never send a start timestamp.
  if (typeof startedAt !== "number" || !Number.isFinite(startedAt)) return "missing-timestamp";
  const elapsed = Date.now() - startedAt;
  if (elapsed < minFillTimeMs) return "too-fast";
  if (elapsed > maxFillTimeMs) return "stale-timestamp";

  if (containsRandomToken(submission.name) || containsRandomToken(submission.notes)) {
    return "random-token";
  }

  return null;
}
