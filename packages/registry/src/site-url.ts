import {
  DEFAULT_SITE_URL,
  stripTrailingSlash,
} from "../../site-url/src/index";

/**
 * Resolve the public site origin for generated registry metadata.
 * Prefer explicit env overrides; never bake a stale host into docs UI —
 * apps/web should render URLs via `siteUrl` from `@/lib/site`.
 * Fallback is `@hewnui/site-url` DEFAULT_SITE_URL (not a forbidden host).
 */
export function resolveRegistryHomepage(
  fallback = DEFAULT_SITE_URL,
): string {
  const explicit =
    process.env.HEWN_SITE_URL ??
    process.env.KOMPONENTS_SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return stripTrailingSlash(explicit);

  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;

  return stripTrailingSlash(fallback);
}
