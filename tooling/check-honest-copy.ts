/**
 * Fails CI when site-facing copy overclaims openness or shows
 * unpublished npm/npx install commands as if they work today.
 *
 * MIT is decided (see root LICENSE). Flip PACKAGES_PUBLISHED in
 * packages/docs-metadata/src/distribution.ts after the first public
 * release, then this check relaxes install rules.
 */
import { readdir, readFile, stat } from "fs/promises";
import { join, relative } from "path";
import { fileURLToPath } from "url";
import { PACKAGES_PUBLISHED } from "../packages/docs-metadata/src/distribution";

const repoRoot = join(fileURLToPath(import.meta.url), "../..");

const ROOTS = [
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

/** Openness claims that still await repo visibility / product decisions. */
const LICENCE_PATTERNS: Array<{ id: string; re: RegExp }> = [
  { id: "built in the open", re: /built in the open/i },
  { id: "open source claim", re: /\bopen[\s-]source\b/i },
  { id: "free forever", re: /free forever/i },
];

/** Bare install commands that imply npm publish already happened. */
const INSTALL_PATTERNS: Array<{ id: string; re: RegExp }> = [
  { id: "pnpm add @hewnui", re: /(?:^|[^\w#/])pnpm add @hewnui\//m },
  { id: "npm install @hewnui", re: /(?:^|[^\w#/])npm i(?:nstall)? @hewnui\//m },
  { id: "npx @hewnui", re: /(?:^|[^\w#/])npx @hewnui\//m },
];

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
    if (name === "node_modules" || name === ".next") continue;
    await walk(join(path, name), files);
  }
}

function isTextFile(file: string): boolean {
  const dot = file.lastIndexOf(".");
  if (dot < 0) return false;
  return TEXT_EXT.has(file.slice(dot));
}

function lineAllowedForInstall(line: string): boolean {
  // Same-line label, or a shell comment form used in fenced examples.
  return (
    /available at launch/i.test(line) ||
    /^\s*#\s*Available at launch:/i.test(line)
  );
}

async function scanFile(file: string): Promise<Hit[]> {
  const rel = relative(repoRoot, file);
  const source = await readFile(file, "utf8");
  const hits: Hit[] = [];
  const lines = source.split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? "";
    const trimmed = line.trim();
    if (trimmed.startsWith("//") && /PACKAGES_PUBLISHED|distribution\.ts|Available at launch/.test(line)) {
      // Allow comments that document the restore path.
    }

    for (const pattern of LICENCE_PATTERNS) {
      if (pattern.re.test(line)) {
        hits.push({ file: rel, line: i + 1, id: pattern.id, text: trimmed.slice(0, 120) });
      }
    }

    if (!PACKAGES_PUBLISHED) {
      for (const pattern of INSTALL_PATTERNS) {
        if (!pattern.re.test(line)) continue;
        if (lineAllowedForInstall(line)) continue;
        hits.push({ file: rel, line: i + 1, id: pattern.id, text: trimmed.slice(0, 120) });
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
      `\nFix copy or flip PACKAGES_PUBLISHED in packages/docs-metadata/src/distribution.ts (currently ${PACKAGES_PUBLISHED}).`,
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    `check:honest-copy ok (${files.filter(isTextFile).length} files, PACKAGES_PUBLISHED=${PACKAGES_PUBLISHED})`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
