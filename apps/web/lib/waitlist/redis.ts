import { Redis } from "@upstash/redis";

export type WaitlistRedis = {
  hget: (key: string, field: string) => Promise<string | null>;
  hsetnx: (key: string, field: string, value: string) => Promise<boolean>;
  hgetall: (key: string) => Promise<Record<string, string> | null>;
  incr: (key: string) => Promise<number>;
  expire: (key: string, seconds: number) => Promise<boolean>;
};

type MemoryRow = { value: string; exp?: number };

const memoryHashes = new Map<string, Map<string, string>>();
const memoryKeys = new Map<string, MemoryRow>();

function allowMemoryStore(): boolean {
  const env = process.env.NODE_ENV;
  if (env === "development" || env === "test") return true;
  // Explicit opt-in for Playwright / local prod smoke without Upstash.
  // Never set on Vercel — production must fail closed without Redis.
  return (
    process.env.HEWN_WAITLIST_MEMORY === "1" ||
    process.env.KOMPONENTS_WAITLIST_MEMORY === "1"
  );
}

export function readRedisEnv(
  env: Record<string, string | undefined> = process.env,
): { url: string; token: string } | null {
  const url =
    env.KV_REST_API_URL?.trim() || env.UPSTASH_REDIS_REST_URL?.trim();
  const token =
    env.KV_REST_API_TOKEN?.trim() || env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return { url, token };
}

function memoryStore(): WaitlistRedis {
  return {
    async hget(key, field) {
      return memoryHashes.get(key)?.get(field) ?? null;
    },
    async hsetnx(key, field, value) {
      let hash = memoryHashes.get(key);
      if (!hash) {
        hash = new Map();
        memoryHashes.set(key, hash);
      }
      if (hash.has(field)) return false;
      hash.set(field, value);
      return true;
    },
    async hgetall(key) {
      const hash = memoryHashes.get(key);
      if (!hash || hash.size === 0) return null;
      return Object.fromEntries(hash.entries());
    },
    async incr(key) {
      const row = memoryKeys.get(key);
      if (row?.exp && row.exp < Date.now()) memoryKeys.delete(key);
      const current = Number(memoryKeys.get(key)?.value ?? "0");
      const next = current + 1;
      const prev = memoryKeys.get(key);
      memoryKeys.set(key, {
        value: String(next),
        ...(prev?.exp ? { exp: prev.exp } : {}),
      });
      return next;
    },
    async expire(key, seconds) {
      const row = memoryKeys.get(key);
      if (!row) return false;
      memoryKeys.set(key, {
        value: row.value,
        exp: Date.now() + seconds * 1000,
      });
      return true;
    },
  };
}

function upstashStore(url: string, token: string): WaitlistRedis {
  const redis = new Redis({
    url,
    token,
    automaticDeserialization: false,
  });

  return {
    async hget(key, field) {
      const value = await redis.hget<string>(key, field);
      return value ?? null;
    },
    async hsetnx(key, field, value) {
      const result = await redis.hsetnx(key, field, value);
      return result === 1;
    },
    async hgetall(key) {
      const raw = await redis.hgetall<Record<string, string>>(key);
      if (!raw || Object.keys(raw).length === 0) return null;
      return raw;
    },
    async incr(key) {
      return redis.incr(key);
    },
    async expire(key, seconds) {
      const result = await redis.expire(key, seconds);
      return result === 1;
    },
  };
}

let cached: WaitlistRedis | undefined;
let cachedKind: "memory" | "upstash" | "unavailable" | undefined;

/** Test helper — clears memoized client and in-memory maps. */
export function resetWaitlistRedis(): void {
  cached = undefined;
  cachedKind = undefined;
  memoryHashes.clear();
  memoryKeys.clear();
}

export type WaitlistRedisResolution =
  | { ok: true; client: WaitlistRedis; kind: "memory" | "upstash" }
  | { ok: false; kind: "unavailable"; message: string };

/**
 * Resolve waitlist storage.
 * - Upstash when env present (KV_* or UPSTASH_*).
 * - In-memory in development/test without env.
 * - Fail closed in production without env (never filesystem).
 */
export function resolveWaitlistRedis(
  env: Record<string, string | undefined> = process.env,
): WaitlistRedisResolution {
  if (cached && cachedKind === "memory") {
    return { ok: true, client: cached, kind: "memory" };
  }
  if (cached && cachedKind === "upstash") {
    return { ok: true, client: cached, kind: "upstash" };
  }

  const creds = readRedisEnv(env);
  if (creds) {
    cached = upstashStore(creds.url, creds.token);
    cachedKind = "upstash";
    return { ok: true, client: cached, kind: "upstash" };
  }

  if (allowMemoryStore()) {
    cached = memoryStore();
    cachedKind = "memory";
    return { ok: true, client: cached, kind: "memory" };
  }

  cachedKind = "unavailable";
  return {
    ok: false,
    kind: "unavailable",
    message: "Waitlist temporarily unavailable.",
  };
}
