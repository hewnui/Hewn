import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resetWaitlistRedis } from "@/lib/waitlist/redis";
import {
  listWaitlistEntries,
  subscribeToWaitlist,
} from "@/lib/waitlist/subscribe";
import { WAITLIST_RATE_LIMIT } from "@/lib/waitlist/types";

describe("subscribeToWaitlist", () => {
  const prevNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    resetWaitlistRedis();
    vi.stubEnv("NODE_ENV", "test");
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  afterEach(() => {
    resetWaitlistRedis();
    vi.unstubAllEnvs();
    vi.stubEnv("NODE_ENV", prevNodeEnv ?? "test");
  });

  it("stores lowercase email with timestamp and source", async () => {
    const now = new Date("2026-10-23T12:00:00.000Z");
    const result = await subscribeToWaitlist({
      email: "  Pat@Example.com ",
      source: "pro",
      ip: "1.1.1.1",
      now,
    });
    expect(result).toEqual({ ok: true, alreadyJoined: false });

    const entries = await listWaitlistEntries();
    expect(entries).toEqual([
      {
        email: "pat@example.com",
        joinedAt: "2026-10-23T12:00:00.000Z",
        source: "pro",
      },
    ]);
  });

  it("dedupes idempotently", async () => {
    const first = await subscribeToWaitlist({
      email: "same@example.com",
      source: "home",
      ip: "2.2.2.2",
    });
    const second = await subscribeToWaitlist({
      email: "SAME@example.com",
      source: "pro",
      ip: "2.2.2.2",
    });
    expect(first).toEqual({ ok: true, alreadyJoined: false });
    expect(second).toEqual({ ok: true, alreadyJoined: true });
    expect(await listWaitlistEntries()).toHaveLength(1);
  });

  it("silently accepts honeypot without storing", async () => {
    const result = await subscribeToWaitlist({
      email: "bot@example.com",
      company: "Spam Inc",
      ip: "3.3.3.3",
    });
    expect(result).toEqual({ ok: true, alreadyJoined: false });
    expect(await listWaitlistEntries()).toHaveLength(0);
  });

  it("rate-limits per IP", async () => {
    for (let i = 0; i < WAITLIST_RATE_LIMIT; i += 1) {
      const result = await subscribeToWaitlist({
        email: `user${i}@example.com`,
        ip: "9.9.9.9",
      });
      expect(result.ok).toBe(true);
    }
    const blocked = await subscribeToWaitlist({
      email: "extra@example.com",
      ip: "9.9.9.9",
    });
    expect(blocked).toMatchObject({ ok: false, code: "rate_limited" });
  });

  it("fails closed in production without Redis env", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("HEWN_WAITLIST_MEMORY", "");
    resetWaitlistRedis();
    const result = await subscribeToWaitlist({
      email: "prod@example.com",
      ip: "8.8.8.8",
    });
    expect(result).toMatchObject({
      ok: false,
      code: "unavailable",
      message: "Waitlist temporarily unavailable.",
    });
  });

  it("allows explicit memory opt-in in production for e2e", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("HEWN_WAITLIST_MEMORY", "1");
    resetWaitlistRedis();
    const result = await subscribeToWaitlist({
      email: "e2e@example.com",
      ip: "7.7.7.7",
    });
    expect(result).toEqual({ ok: true, alreadyJoined: false });
  });
});
