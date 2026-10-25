import { readdirSync, readFileSync, statSync } from "fs";
import { join, relative } from "path";
import { fileURLToPath } from "url";

const repoRoot = join(fileURLToPath(import.meta.url), "..", "..");
const uiRoot = join(repoRoot, "packages/ui/src");

const LAYOUT_PROPS =
  "width|height|top|left|right|bottom|margin|padding|inset|gap|flex-basis|max-width|min-width|max-height|min-height";

const banned = [
  {
    id: "transition-all",
    pattern: /transition(?:\s*:\s*all\b|-all\b)/,
    message: "Use explicit transition properties — never `transition: all`.",
  },
  {
    id: "layout-transition-bracket",
    pattern: new RegExp(
      `transition-\\[[^\\]]*\\b(?:${LAYOUT_PROPS})\\b[^\\]]*\\]`,
    ),
    message:
      "Do not transition layout properties (width/height/inset/margin/…). Prefer transform/opacity.",
  },
  {
    id: "layout-transition-css",
    pattern: new RegExp(
      `transition(?:-property)?\\s*:\\s*[^;]*\\b(?:${LAYOUT_PROPS})\\b`,
    ),
    message:
      "Do not transition layout properties in CSS — prefer transform/opacity.",
  },
];

function collectSources(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const absolute = join(dir, entry);
    const stats = statSync(absolute);
    if (stats.isDirectory()) {
      out.push(...collectSources(absolute));
      continue;
    }
    if (/\.(tsx?|css)$/.test(entry) && !/\.test\./.test(entry)) {
      out.push(absolute);
    }
  }
  return out;
}

const files = collectSources(uiRoot);
const failures: string[] = [];

for (const file of files) {
  const source = readFileSync(file, "utf8");
  const rel = relative(repoRoot, file);
  const lines = source.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]!;
    if (line.includes("check-motion-allow")) continue;
    for (const rule of banned) {
      if (rule.pattern.test(line)) {
        failures.push(`${rel}:${index + 1} [${rule.id}] ${rule.message}`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Motion contract violations in packages/ui:\n");
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log(
  `ok: motion contract — scanned ${files.length} packages/ui sources`,
);
