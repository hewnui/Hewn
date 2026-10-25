/**
 * Fails when marketing/docs copy states a free component count that does not
 * match packages/registry/generated/index.free.json.
 */
import { readFileSync } from "fs";
import { execFileSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { freeComponentCount } from "../packages/docs-metadata/src/census";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

const SCAN_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".md",
  ".mdx",
  ".txt",
]);

/** Historical notes may mention old counts. */
const ALLOW_PATH_PREFIXES = ["docs/memory/", "docs/release/", ".changeset/"];

const COUNT_RE = /\b(\d+)\s+(?:free\s+)?components?\b/gi;

function listTrackedFiles(): string[] {
  const out = execFileSync("git", ["ls-files"], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  return out
    .split("\n")
    .map((line) => line.trim())
    .filter((rel) => {
      if (!rel) return false;
      if (rel.startsWith("packages/registry/generated/")) return false;
      if (rel.startsWith("apps/web/public/")) return false;
      if (rel === "tooling/check-component-census.ts") return false;
      const dot = rel.lastIndexOf(".");
      if (dot < 0) return false;
      return SCAN_EXTENSIONS.has(rel.slice(dot));
    });
}

function main() {
  const expected = freeComponentCount();
  const hits: string[] = [];

  for (const rel of listTrackedFiles()) {
    if (ALLOW_PATH_PREFIXES.some((prefix) => rel.startsWith(prefix))) continue;

    let body: string;
    try {
      body = readFileSync(join(repoRoot, rel), "utf8");
    } catch {
      continue;
    }

    const lines = body.split(/\r?\n/);
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i] ?? "";
      COUNT_RE.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = COUNT_RE.exec(line)) !== null) {
        const stated = Number(match[1]);
        if (stated === expected) continue;
        // Skip relative / historical phrasing that is not a census claim.
        if (/since the|was|were|preview|hard-?code|do not/i.test(line)) {
          continue;
        }
        hits.push(
          `${rel}:${i + 1}: stated ${stated}, expected ${expected} — ${line.trim().slice(0, 100)}`,
        );
      }
    }
  }

  if (hits.length > 0) {
    console.error("check:component-census failed:\n");
    for (const hit of hits) console.error(`  ${hit}`);
    console.error(
      `\nFree registry census is ${expected}. Update copy or derive from galleryTotals / freeComponentCount().`,
    );
    process.exitCode = 1;
    return;
  }

  console.log(`check:component-census ok (free count=${expected})`);
}

main();
