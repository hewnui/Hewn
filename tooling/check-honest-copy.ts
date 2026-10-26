/**
 * Fails CI when site-facing copy overclaims openness or shows
 * unpublished npm/npx install commands as if they work today.
 *
 * Flip PACKAGES_PUBLISHED / MCP_PUBLISHED in
 * packages/docs-metadata/src/distribution.ts when those packages ship.
 */
import { readdir, readFile, stat } from "fs/promises";
import { join, relative } from "path";
import { fileURLToPath } from "url";
import {
  MCP_PUBLISHED,
  PACKAGES_PUBLISHED,
} from "../packages/docs-metadata/src/distribution";
import {
  INSTALL_PATTERNS,
  LICENCE_PATTERNS,
  MCP_INSTALL_PATTERNS,
  PRODUCT_PATTERNS,
  isMetaLine,
  lineAllowedForInstall,
} from "./honest-copy-patterns";

const repoRoot = join(fileURLToPath(import.meta.url), "../..");

const ROOTS = [
  "README.md",
  "apps/web/app",
  "apps/web/components",
  "apps/web/content",
  "apps/web/lib",
  "apps/web/public/llms.txt",
  "apps/web/public/ai",
] as const;

const TEXT_EXT = new Set([
  ".ts",
  ".tsx",
  ".md",
  ".mdx",
  ".txt",
  ".json",
  ".html",
]);

type Hit = { file: string; line: number; id: string; text: string };

async function walk(path: string, files: string[]): Promise<void> {
  let info;
  try {
    info = await stat(path);
  } catch {
    return;
  }
  if (info.isFile()) {
    files.push(path);
    return;
  }
  if (!info.isDirectory()) return;
  const entries = await readdir(path);
  for (const name of entries) {
    if (name === "node_modules" || name === ".next" || name === "dist") continue;
    await walk(join(path, name), files);
  }
}

function isTextFile(file: string): boolean {
  if (file.endsWith("README.md")) return true;
  const dot = file.lastIndexOf(".");
  if (dot < 0) return false;
  return TEXT_EXT.has(file.slice(dot));
}

async function scanFile(file: string): Promise<Hit[]> {
  const rel = relative(repoRoot, file);
  const source = await readFile(file, "utf8");
  const hits: Hit[] = [];
  const lines = source.split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? "";
    const trimmed = line.trim();
    if (isMetaLine(line)) continue;

    for (const pattern of LICENCE_PATTERNS) {
      if (pattern.re.test(line)) {
        hits.push({
          file: rel,
          line: i + 1,
          id: pattern.id,
          text: trimmed.slice(0, 120),
        });
      }
    }

    for (const pattern of PRODUCT_PATTERNS) {
      if (pattern.re.test(line)) {
        hits.push({
          file: rel,
          line: i + 1,
          id: pattern.id,
          text: trimmed.slice(0, 120),
        });
      }
    }

    if (!PACKAGES_PUBLISHED) {
      for (const pattern of INSTALL_PATTERNS) {
        if (!pattern.re.test(line)) continue;
        if (lineAllowedForInstall(line)) continue;
        if (/@hewnui\/mcp\b/.test(line)) continue;
        hits.push({
          file: rel,
          line: i + 1,
          id: pattern.id,
          text: trimmed.slice(0, 120),
        });
      }
    }

    if (!MCP_PUBLISHED) {
      for (const pattern of MCP_INSTALL_PATTERNS) {
        if (!pattern.re.test(line)) continue;
        if (lineAllowedForInstall(line)) continue;
        hits.push({
          file: rel,
          line: i + 1,
          id: pattern.id,
          text: trimmed.slice(0, 120),
        });
      }
    }
  }

  return hits;
}

async function main(): Promise<void> {
  const files: string[] = [];
  for (const root of ROOTS) {
    await walk(join(repoRoot, root), files);
  }

  const hits: Hit[] = [];
  for (const file of files.filter(isTextFile)) {
    hits.push(...(await scanFile(file)));
  }

  if (hits.length > 0) {
    console.error("check:honest-copy failed — misleading site copy:\n");
    for (const hit of hits) {
      console.error(`  ${hit.file}:${hit.line} [${hit.id}] ${hit.text}`);
    }
    console.error(
      `\nFix copy or flip flags in packages/docs-metadata/src/distribution.ts (PACKAGES_PUBLISHED=${PACKAGES_PUBLISHED}, MCP_PUBLISHED=${MCP_PUBLISHED}).`,
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    `check:honest-copy ok (${files.filter(isTextFile).length} files, PACKAGES_PUBLISHED=${PACKAGES_PUBLISHED}, MCP_PUBLISHED=${MCP_PUBLISHED})`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
