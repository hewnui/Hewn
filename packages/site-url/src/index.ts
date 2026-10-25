/**
 * Canonical public site / registry origin.
 *
 * Change `DEFAULT_SITE_URL` when a real domain is live, then regenerate
 * (`pnpm generate`) and run `pnpm check:site-url`. That is the one-line swap.
 *
 * Overrides (do not change the default for local/preview work):
 * - `HEWN_SITE_URL` — docs-metadata / llms.txt generation (legacy
 *   `KOMPONENTS_SITE_URL` is still honoured as a fallback)
 * - `NEXT_PUBLIC_SITE_URL` — Next.js metadata, sitemap, robots
 * - `HEWN_REGISTRY_URL` — CLI registry fetch base
 * - `hewn.json` `registry` — per-project CLI override
 */
export const DEFAULT_SITE_URL = "https://hewnui.dev";

/** Secondary brand domain — should 308-redirect to `DEFAULT_SITE_URL` (see apps/web/next.config). */
export const SECONDARY_SITE_URL = "https://hewnui.com";

/**
 * Pre-rename Vercel production host. Still serves the site; point
 * `NEXT_PUBLIC_SITE_URL` / `HEWN_SITE_URL` here until hewnui.dev DNS is live.
 */
export const LEGACY_VERCEL_SITE_URL = "https://komponents-dev.vercel.app";

/** Hostnames that must never be used as the canonical site or registry default. */
export const FORBIDDEN_SITE_HOSTS = ["komponents.dev"] as const;

export function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

export function hostnameOf(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

export function isForbiddenSiteHost(host: string): boolean {
  const normalized = host.toLowerCase().replace(/\.$/, "");
  return (FORBIDDEN_SITE_HOSTS as readonly string[]).includes(normalized);
}

export type SiteUrlEnv = {
  HEWN_SITE_URL?: string | undefined;
  /** @deprecated pre-rename name; use `HEWN_SITE_URL`. */
  KOMPONENTS_SITE_URL?: string | undefined;
  NEXT_PUBLIC_SITE_URL?: string | undefined;
};

/**
 * Resolve the canonical site origin for docs generation and metadata fallbacks.
 * Does not consider Vercel preview hosts — callers that need those compose separately.
 */
export function resolveCanonicalSiteUrl(
  env: SiteUrlEnv = process.env as SiteUrlEnv,
): string {
  const explicit = env.HEWN_SITE_URL ?? env.KOMPONENTS_SITE_URL ?? env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return stripTrailingSlash(explicit);
  return DEFAULT_SITE_URL;
}
