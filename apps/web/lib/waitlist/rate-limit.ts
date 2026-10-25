import {
  WAITLIST_RATE_LIMIT,
  WAITLIST_RATE_PREFIX,
  WAITLIST_RATE_WINDOW_SEC,
} from "@/lib/waitlist/types";
import type { WaitlistRedis } from "@/lib/waitlist/redis";

export type RateLimitResult =
  | { ok: true }
  | { ok: false; message: string };

export async function checkWaitlistRateLimit(
  client: WaitlistRedis,
  ip: string,
  limit = WAITLIST_RATE_LIMIT,
  windowSec = WAITLIST_RATE_WINDOW_SEC,
): Promise<RateLimitResult> {
  const key = `${WAITLIST_RATE_PREFIX}${ip || "unknown"}`;
  const count = await client.incr(key);
  if (count === 1) {
    await client.expire(key, windowSec);
  }
  if (count > limit) {
    return {
      ok: false,
      message: "Too many attempts. Try again in an hour.",
    };
  }
  return { ok: true };
}

/** Best-effort client IP from common proxy headers. */
export function clientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 128);
  }
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 128);
  return "unknown";
}
