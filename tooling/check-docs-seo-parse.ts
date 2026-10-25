import { readdirSync, readFileSync, statSync, existsSync } from "fs";
import { join, relative } from "path";

export const sharedOgImagePath = "/opengraph-image";

export type PageSeo = {
  file: string;
  canonicalPath: string | null;
  ogTitle: string | null;
  ogUrlPath: string | null;
  ogImagePath: string | null;
  title: string | null;
};

export function collectHtmlFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const absolute = join(dir, entry);
    if (statSync(absolute).isDirectory()) {
      out.push(...collectHtmlFiles(absolute));
    } else if (entry.endsWith(".html")) {
      out.push(absolute);
    }
  }
  return out;
}

function attr(html: string, tag: "link" | "meta", name: string) {
  if (tag === "link") {
    const forward = html.match(
      new RegExp(
        `<link[^>]*rel=["']${name}["'][^>]*href=["']([^"']+)["'][^>]*>`,
        "i",
      ),
    );
    if (forward?.[1]) return forward[1];
    const reverse = html.match(
      new RegExp(
        `<link[^>]*href=["']([^"']+)["'][^>]*rel=["']${name}["'][^>]*>`,
        "i",
      ),
    );
    return reverse?.[1] ?? null;
  }

  const forward = html.match(
    new RegExp(
      `<meta[^>]*(?:property|name)=["']${name}["'][^>]*content=["']([^"']+)["'][^>]*>`,
      "i",
    ),
  );
  if (forward?.[1]) return forward[1];
  const reverse = html.match(
    new RegExp(
      `<meta[^>]*content=["']([^"']+)["'][^>]*(?:property|name)=["']${name}["'][^>]*>`,
      "i",
    ),
  );
  return reverse?.[1] ?? null;
}

export function toPathname(raw: string | null): string | null {
  if (!raw) return null;
  try {
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      return new URL(raw).pathname.replace(/\/$/, "") || "/";
    }
  } catch {
    return null;
  }
  const path = raw.split("?")[0]?.split("#")[0] ?? raw;
  return path.replace(/\/$/, "") || "/";
}

/** Normalize og:image pathnames (drop query/hash; keep /og/docs/... routes). */
export function normalizeOgImagePath(raw: string | null): string | null {
  return toPathname(raw);
}

export function parsePage(file: string, repoRoot: string): PageSeo {
  const html = readFileSync(file, "utf8");
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  return {
    file: relative(repoRoot, file),
    canonicalPath: toPathname(attr(html, "link", "canonical")),
    ogTitle: attr(html, "meta", "og:title"),
    ogUrlPath: toPathname(attr(html, "meta", "og:url")),
    ogImagePath: normalizeOgImagePath(attr(html, "meta", "og:image")),
    title: titleMatch?.[1]?.trim() ?? null,
  };
}

export function expectedPathFromFile(
  file: string,
  docsHtmlRoot: string,
  docsIndexHtml: string,
): string {
  if (file === docsIndexHtml) return "/docs";

  const rel = relative(docsHtmlRoot, file).replace(/\\/g, "/");
  let path = rel
    .replace(/\/page\.html$/, "")
    .replace(/\.html$/, "")
    .replace(/\/index$/, "");
  if (!path || path === "index") return "/docs";
  return `/docs/${path}`;
}

export function isDocsPageHtml(file: string, repoRoot: string): boolean {
  const rel = relative(repoRoot, file).replace(/\\/g, "/");
  if (rel.includes("/opengraph-image")) return false;
  if (rel.includes("/twitter-image")) return false;
  if (rel.includes("/_not-found") || rel.includes("/_global-error")) {
    return false;
  }
  return true;
}
