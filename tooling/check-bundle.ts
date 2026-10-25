import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { gzipSync } from "zlib";

type Budget = { label: string; paths: string[]; gzipKb: number };

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const budgetsPath = join(repoRoot, "tooling/bundle-budgets.json");
const { budgets } = JSON.parse(readFileSync(budgetsPath, "utf8")) as {
  budgets: Budget[];
};

function collectJsFiles(path: string): string[] {
  const absolute = join(repoRoot, path);
  if (!existsSync(absolute)) return [];
  if (!statSync(absolute).isDirectory()) return [absolute];
  const files: string[] = [];
  for (const entry of readdirSync(absolute)) {
    const child = join(path, entry);
    if (statSync(join(repoRoot, child)).isDirectory()) {
      files.push(...collectJsFiles(child));
    } else if (child.endsWith(".js")) {
      files.push(join(repoRoot, child));
    }
  }
  return files;
}

let failed = false;

for (const budget of budgets) {
  const files = budget.paths.flatMap(collectJsFiles);
  if (files.length === 0) {
    console.error(`missing build output for "${budget.label}" — run pnpm build first`);
    failed = true;
    continue;
  }

  let gzipBytes = 0;
  for (const file of files) {
    gzipBytes += gzipSync(readFileSync(file)).length;
  }
  const gzipKb = gzipBytes / 1024;
  const ok = gzipKb <= budget.gzipKb;
  console.log(
    `${ok ? "ok" : "over"}: ${budget.label} — ${gzipKb.toFixed(1)}kb gzip (budget ${budget.gzipKb}kb, ${files.length} files)`,
  );
  if (!ok) failed = true;
}

if (failed) process.exit(1);
