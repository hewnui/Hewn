import { siteUrl } from "@/lib/site";
import { source } from "@/lib/source";
import { existsSync, statSync } from "fs";
import { join } from "path";
import type { MetadataRoute } from "next";

/** Build-time stamp for routes without a resolvable content mtime. */
const BUILD_LASTMOD = new Date();
const DOCS_CONTENT_ROOT = join(process.cwd(), "content/docs");

function fileMtime(path: string | undefined): Date {
  if (!path || !existsSync(path)) return BUILD_LASTMOD;
  try {
    return statSync(path).mtime;
  } catch {
    return BUILD_LASTMOD;
  }
}

/** Map a docs URL like `/docs/components/button` to its MDX source file. */
function docsContentPath(url: string): string | undefined {
  const slug = url.replace(/^\/docs\/?/, "");
  const candidates = slug
    ? [
        join(DOCS_CONTENT_ROOT, `${slug}.mdx`),
        join(DOCS_CONTENT_ROOT, slug, "index.mdx"),
        join(DOCS_CONTENT_ROOT, `${slug}.md`),
        join(DOCS_CONTENT_ROOT, slug, "index.md"),
      ]
    : [
        join(DOCS_CONTENT_ROOT, "index.mdx"),
        join(DOCS_CONTENT_ROOT, "index.md"),
      ];
  return candidates.find((path) => existsSync(path));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = source.getPages().map((page) => ({
    url: new URL(page.url, siteUrl).toString(),
    lastModified: fileMtime(docsContentPath(page.url)),
    changeFrequency: "weekly" as const,
    // The docs index outranks individual component pages.
    priority: page.url === "/docs" ? 0.8 : 0.6,
  }));

  return [
    {
      url: siteUrl,
      lastModified: BUILD_LASTMOD,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/pro", siteUrl).toString(),
      lastModified: BUILD_LASTMOD,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...docs,
  ];
}
