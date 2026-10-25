import { existsSync, readFileSync, statSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { securityHeaders } from "../apps/web/lib/security-headers";

type RouteBudget = {
  label: string;
  html: string;
  maxJsKb: number;
};

type BudgetFile = {
  routes: RouteBudget[];
  securityHeaderKeys: string[];
};

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const budgetsPath = join(repoRoot, "tooling/web-route-budgets.json");
const budgets = JSON.parse(readFileSync(budgetsPath, "utf8")) as BudgetFile;

const staticRoot = join(repoRoot, "apps/web/.next/static");

/** First-load scripts only — ignore RSC payload mentions of other chunks. */
function scriptRefs(html: string): string[] {
  const refs = new Set<string>();
  const re = /<script[^>]+src="\/_next\/static\/([^"]+\.js)"/g;
  for (const match of html.matchAll(re)) {
    refs.add(decodeURIComponent(match[1]!));
  }
  return [...refs];
}

function sumScriptBytes(refs: string[]): number {
  let total = 0;
  for (const ref of refs) {
    const absolute = join(staticRoot, ref);
    if (!existsSync(absolute)) {
      throw new Error(`missing chunk referenced by HTML: ${ref}`);
    }
    total += statSync(absolute).size;
  }
  return total;
}

let failed = false;

const headerKeys = securityHeaders().map((header) => header.key);
for (const key of budgets.securityHeaderKeys) {
  if (!headerKeys.includes(key)) {
    console.error(`missing security header: ${key}`);
    failed = true;
  }
}
const csp = securityHeaders().find(
  (header) => header.key === "Content-Security-Policy",
)?.value;
if (!csp?.includes("frame-ancestors 'none'")) {
  console.error("CSP missing frame-ancestors 'none'");
  failed = true;
}
if (!csp?.includes("object-src 'none'")) {
  console.error("CSP missing object-src 'none'");
  failed = true;
}
console.log(
  failed
    ? "security headers: failed"
    : `security headers: ok (${headerKeys.join(", ")})`,
);

for (const route of budgets.routes) {
  const htmlPath = join(repoRoot, route.html);
  if (!existsSync(htmlPath)) {
    console.error(
      `missing prerender HTML for "${route.label}" (${route.html}) — run pnpm --filter web build first`,
    );
    failed = true;
    continue;
  }

  const html = readFileSync(htmlPath, "utf8");
  const refs = scriptRefs(html);
  const bytes = sumScriptBytes(refs);
  const kb = bytes / 1024;
  const ok = kb <= route.maxJsKb;
  console.log(
    `${ok ? "ok" : "over"}: ${route.label} — ${kb.toFixed(1)}kb JS raw (${refs.length} scripts, budget ${route.maxJsKb}kb)`,
  );
  if (!ok) failed = true;
}

if (failed) process.exit(1);
