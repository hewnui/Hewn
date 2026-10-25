/**
 * Server-side Pro surface mode. Default stays waitlist so nothing prices
 * accidentally. Flip via `PRO_MODE=preorder` only when a real display price
 * is configured (see `checkout/config.ts`).
 */
export type ProMode = "waitlist" | "preorder";

export const PRO_MODE_ENV = "PRO_MODE";

export function getProMode(
  env: Record<string, string | undefined> = process.env,
): ProMode {
  const raw = (env[PRO_MODE_ENV] ?? "waitlist").trim().toLowerCase();
  return raw === "preorder" ? "preorder" : "waitlist";
}
