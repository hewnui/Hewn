/**
 * Append `.js` to extensionless relative specifiers in emitted ESM `.js` files.
 * tsc (moduleResolution: Bundler) leaves them bare, which breaks plain Node ESM.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { join } from "path";

const root = process.argv[2];
if (!root) {
  console.error("usage: tsx tooling/fix-esm-relative-extensions.ts <dir>");
  process.exit(1);
}

const RELATIVE =
  /((?:from|import)\s*\(?\s*|export\s+[\s\w{},*]+\s+from\s+)(["'])(\.[^"']+)\2/g;

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (full.endsWith(".js")) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(root)) {
  const before = readFileSync(file, "utf8");
  const after = before.replace(RELATIVE, (match, prefix: string, quote: string, spec: string) => {
    if (/\.[cm]?js$|\.json$|\.node$|\.css$/i.test(spec)) return match;
    return `${prefix}${quote}${spec}.js${quote}`;
  });
  if (after !== before) {
    writeFileSync(file, after, "utf8");
    changed += 1;
  }
}

console.log(`fixed ESM relative extensions in ${changed} file(s) under ${root}`);
