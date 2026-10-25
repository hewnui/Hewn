/**
 * Export Pro waitlist emails from Upstash Redis as CSV to stdout.
 * Usage: `pnpm waitlist:export`
 *
 * Requires KV_REST_API_URL + KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_*).
 * No public admin endpoint — run locally / in a trusted shell only.
 */
import { Redis } from "@upstash/redis";

const HASH_KEY = "waitlist:pro";

function readEnv(): { url: string; token: string } {
  const url =
    process.env.KV_REST_API_URL?.trim() ||
    process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token =
    process.env.KV_REST_API_TOKEN?.trim() ||
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) {
    throw new Error(
      "Set KV_REST_API_URL/KV_REST_API_TOKEN or UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN",
    );
  }
  return { url, token };
}

function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

async function main() {
  const { url, token } = readEnv();
  const redis = new Redis({ url, token, automaticDeserialization: false });
  const all = await redis.hgetall<Record<string, string>>(HASH_KEY);

  const rows: Array<{ email: string; joinedAt: string; source: string }> = [];
  for (const [email, raw] of Object.entries(all ?? {})) {
    try {
      const parsed = JSON.parse(raw) as {
        email?: string;
        joinedAt?: string;
        source?: string;
      };
      rows.push({
        email: parsed.email ?? email,
        joinedAt: parsed.joinedAt ?? "",
        source: parsed.source ?? "unknown",
      });
    } catch {
      rows.push({ email, joinedAt: "", source: "unknown" });
    }
  }

  rows.sort((a, b) => a.joinedAt.localeCompare(b.joinedAt));

  process.stdout.write("email,joinedAt,source\n");
  for (const row of rows) {
    process.stdout.write(
      `${csvEscape(row.email)},${csvEscape(row.joinedAt)},${csvEscape(row.source)}\n`,
    );
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
