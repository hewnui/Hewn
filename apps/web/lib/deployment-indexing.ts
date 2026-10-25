/**
 * Preview and local Vercel envs must not be indexed. Production stays open.
 * Unset `VERCEL_ENV` (local / CI `next start`) is treated as indexable so
 * smoke tests and local builds match production SEO behaviour.
 */
export function isIndexableDeployment(): boolean {
  const env = process.env.VERCEL_ENV;
  if (env == null || env === "") return true;
  return env === "production";
}
