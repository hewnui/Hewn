import { checkWaitlistRateLimit } from "@/lib/waitlist/rate-limit";
import { resolveWaitlistRedis } from "@/lib/waitlist/redis";
import {
  WAITLIST_HASH_KEY,
  type WaitlistEntry,
  type WaitlistResult,
  type WaitlistSource,
} from "@/lib/waitlist/types";
import { validateWaitlistInput } from "@/lib/waitlist/validate";

export async function subscribeToWaitlist(input: {
  email?: unknown;
  source?: unknown;
  company?: unknown;
  ip: string;
  now?: Date;
}): Promise<WaitlistResult> {
  const validated = validateWaitlistInput(input);
  if (!validated.ok) {
    return {
      ok: false,
      code: validated.code,
      message: validated.message,
    };
  }

  // Honeypot filled — pretend success, store nothing.
  if (validated.honeypot) {
    return { ok: true, alreadyJoined: false };
  }

  const resolved = resolveWaitlistRedis();
  if (!resolved.ok) {
    return {
      ok: false,
      code: "unavailable",
      message: resolved.message,
    };
  }

  const rate = await checkWaitlistRateLimit(resolved.client, input.ip);
  if (!rate.ok) {
    return {
      ok: false,
      code: "rate_limited",
      message: rate.message,
    };
  }

  const joinedAt = (input.now ?? new Date()).toISOString();
  const entry: WaitlistEntry = {
    email: validated.email,
    joinedAt,
    source: validated.source,
  };

  const inserted = await resolved.client.hsetnx(
    WAITLIST_HASH_KEY,
    validated.email,
    JSON.stringify(entry),
  );

  return { ok: true, alreadyJoined: !inserted };
}

export async function listWaitlistEntries(): Promise<WaitlistEntry[]> {
  const resolved = resolveWaitlistRedis();
  if (!resolved.ok) {
    throw new Error(resolved.message);
  }
  const all = await resolved.client.hgetall(WAITLIST_HASH_KEY);
  if (!all) return [];

  const entries: WaitlistEntry[] = [];
  for (const [email, raw] of Object.entries(all)) {
    try {
      const parsed = JSON.parse(raw) as Partial<WaitlistEntry>;
      entries.push({
        email: typeof parsed.email === "string" ? parsed.email : email,
        joinedAt:
          typeof parsed.joinedAt === "string"
            ? parsed.joinedAt
            : new Date(0).toISOString(),
        source: normalizeListedSource(parsed.source),
      });
    } catch {
      entries.push({
        email,
        joinedAt: new Date(0).toISOString(),
        source: "unknown",
      });
    }
  }

  return entries.sort((a, b) => a.joinedAt.localeCompare(b.joinedAt));
}

function normalizeListedSource(value: unknown): WaitlistSource {
  if (value === "pro" || value === "home") return value;
  return "unknown";
}
