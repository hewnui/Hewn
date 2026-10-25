/**
 * Post-build guard: every docs page must canonicalize to its own path,
 * expose a unique og:title (not the generic site name), and reference a
 * per-page og:image (not the shared homepage `/opengraph-image`).
 *
 * Run after `pnpm build`. Uses pathname checks only — never hardcodes the
 * production domain.
 */
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  collectHtmlFiles,
  expectedPathFromFile,
  isDocsPageHtml,
  parsePage,
  sharedOgImagePath,
} from "./check-docs-seo-parse.ts";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const appHtmlRoot = join(repoRoot, "apps/web/.next/server/app");
const docsHtmlRoot = join(appHtmlRoot, "docs");
const docsIndexHtml = join(appHtmlRoot, "docs.html");
const siteName = "Hewn";

if (!existsSync(docsHtmlRoot) && !existsSync(docsIndexHtml)) {
  console.error(
    "missing apps/web/.next/server/app/docs HTML — run `pnpm build` first",
  );
  process.exit(1);
}

const files = [
  ...(existsSync(docsIndexHtml) ? [docsIndexHtml] : []),
  ...collectHtmlFiles(docsHtmlRoot),
].filter((file) => isDocsPageHtml(file, repoRoot));

if (files.length === 0) {
  console.error("no docs HTML found under apps/web/.next/server/app/docs");
  process.exit(1);
}

const pages = files.map((file) => parsePage(file, repoRoot));
const errors: string[] = [];
const ogTitles = new Map<string, string>();
const ogImages = new Map<string, string>();

for (const page of pages) {
  const expected = expectedPathFromFile(
    join(repoRoot, page.file),
    docsHtmlRoot,
    docsIndexHtml,
  );

  if (!page.canonicalPath || page.canonicalPath === "/") {
    errors.push(
      `${page.file}: canonical is "${page.canonicalPath ?? "missing"}" (must be page URL, not /)`,
    );
  } else if (page.canonicalPath !== expected) {
    errors.push(
      `${page.file}: canonical path "${page.canonicalPath}" !== expected "${expected}"`,
    );
  }

  if (!page.ogUrlPath || page.ogUrlPath === "/") {
    errors.push(
      `${page.file}: og:url is "${page.ogUrlPath ?? "missing"}" (must be page URL, not /)`,
    );
  } else if (page.ogUrlPath !== expected) {
    errors.push(
      `${page.file}: og:url path "${page.ogUrlPath}" !== expected "${expected}"`,
    );
  }

  const ogTitle = page.ogTitle?.trim() ?? "";
  if (!ogTitle || ogTitle === siteName) {
    errors.push(
      `${page.file}: og:title is "${ogTitle || "missing"}" (must be unique page title, not "${siteName}")`,
    );
  } else {
    const prior = ogTitles.get(ogTitle);
    if (prior) {
      errors.push(
        `${page.file}: duplicate og:title "${ogTitle}" (also ${prior})`,
      );
    } else {
      ogTitles.set(ogTitle, page.file);
    }
  }

  const expectedImage =
    expected === "/docs" ? "/og/docs" : expected.replace(/^\/docs/, "/og/docs");
  const ogImage = page.ogImagePath;
  if (!ogImage) {
    errors.push(`${page.file}: og:image is missing`);
  } else if (ogImage === sharedOgImagePath || ogImage === "/") {
    errors.push(
      `${page.file}: og:image is "${ogImage}" (must be per-page, not ${sharedOgImagePath})`,
    );
  } else if (ogImage !== expectedImage) {
    errors.push(
      `${page.file}: og:image "${ogImage}" !== expected "${expectedImage}"`,
    );
  } else {
    const priorImage = ogImages.get(ogImage);
    if (priorImage) {
      errors.push(
        `${page.file}: duplicate og:image "${ogImage}" (also ${priorImage})`,
      );
    } else {
      ogImages.set(ogImage, page.file);
    }
  }

  const docTitle = page.title?.trim() ?? "";
  if (!docTitle || docTitle === siteName) {
    errors.push(
      `${page.file}: <title> is "${docTitle || "missing"}" (must be unique)`,
    );
  }
}

if (errors.length > 0) {
  console.error(`docs SEO check failed (${errors.length}):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(
  `ok: docs SEO — ${pages.length} pages with unique titles, per-page canonical/og:url, and distinct og:image`,
);
