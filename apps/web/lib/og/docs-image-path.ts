/**
 * Map a docs page pathname to its statically generated OG image route.
 * `/docs` → `/og/docs`, `/docs/components/button` → `/og/docs/components/button`.
 */
export function docsOgImagePath(docsUrl: string): string {
  const path = docsUrl.replace(/\/$/, "") || "/docs";
  if (path === "/docs") return "/og/docs";
  if (path.startsWith("/docs/")) {
    return `/og/docs/${path.slice("/docs/".length)}`;
  }
  return "/og/docs";
}
