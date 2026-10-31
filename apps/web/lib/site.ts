import { DEFAULT_SITE_URL } from "./default-site-url";

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * Canonical origin for absolute URLs (metadata, sitemap, robots, OG images).
 *
 * Resolution order:
 * 1. `NEXT_PUBLIC_SITE_URL`
 * 2. Vercel deployment URL (previews / production project URL)
 * 3. Generated `DEFAULT_SITE_URL` from `@hewnui/site-url` (via `pnpm sync:site-url`)
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return stripTrailingSlash(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;

  return DEFAULT_SITE_URL;
}

export const siteUrl = resolveSiteUrl();

/** Hostname only — for display in OG cards and similar chrome (no scheme). */
export const siteHost = new URL(siteUrl).host;

export const siteName = "Hewn UI";

/** Homepage document + OG/Twitter title (≤60 chars). Other pages use the `%s · Hewn UI` template. */
export const siteTitle =
  "Hewn UI: Accessible React Aria, Tailwind v4 & Motion";

export const siteDescription =
  "Accessible React components built on React Aria, Tailwind v4 and Motion — curated themes, tinted glass, and accessibility that ships with the control.";
