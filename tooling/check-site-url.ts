/**
 * Guards the canonical site URL:
 * 1. `DEFAULT_SITE_URL` must not use a forbidden host (e.g. unregistered placeholders).
 * 2. Repo artifacts must not reintroduce forbidden hosts.
 * 3. CLI + web embedded defaults must match `@hewnui/site-url`.
 * 4. DNS probe runs in GitHub Actions only (never on Vercel deploys); skippable offline.
 */
import { execFileSync } from "child_process";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { lookup } from "dns/promises";
import {
  DEFAULT_SITE_URL,
  FORBIDDEN_SITE_HOSTS,
  hostnameOf,
  isForbiddenSiteHost,
} from "../packages/site-url/src/index";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

const SCAN_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".mdx",
  ".txt",
  ".yml",
  ".yaml",
  ".css",
]);

/** Paths relative to repo root that may mention forbidden hosts (ban list + tests). */
const ALLOWLIST = new Set([
  "tooling/check-site-url.ts",
  "packages/site-url/src/index.ts",
  "packages/site-url/src/index.test.ts",
  // Documents why komponents.dev stays on the ban list after the Hewn rename.
  "docs/memory/hewn-rename.md",
]);

const EMBEDDED_DEFAULTS = [
  "packages/cli/src/lib/default-site-url.ts",
  "apps/web/lib/default-site-url.ts",
];

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
      const dot = rel.lastIndexOf(".");
      if (dot < 0) return false;
      return SCAN_EXTENSIONS.has(rel.slice(dot));
    });
}

function isAllowlisted(relPath: string): boolean {
  return ALLOWLIST.has(relPath);
}

function findForbiddenMentions(files: string[]): string[] {
  const hits: string[] = [];
  for (const rel of files) {
    if (isAllowlisted(rel)) continue;
    let body: string;
    try {
      body = readFileSync(join(repoRoot, rel), "utf8");
    } catch {
      continue;
    }
    for (const host of FORBIDDEN_SITE_HOSTS) {
      if (body.includes(host)) {
        hits.push(`${rel}: contains forbidden host ${host}`);
      }
    }
  }
  return hits;
}

function readEmbeddedDefault(relPath: string): string {
  const body = readFileSync(join(repoRoot, relPath), "utf8");
  const match = body.match(
    /export const DEFAULT_SITE_URL = "([^"]+)" as const;/,
  );
  if (!match?.[1]) {
    throw new Error(`${relPath} missing DEFAULT_SITE_URL literal`);
  }
  return match[1];
}

/**
 * DNS probe is CI-only: never on Vercel deploys, skippable offline / local.
 * - Runs when `GITHUB_ACTIONS=true` (unless SKIP_SITE_URL_DNS=1)
 * - Or when `FORCE_SITE_URL_DNS=1`
 */
function shouldProbeDns(): boolean {
  if (process.env.SKIP_SITE_URL_DNS === "1") return false;
  if (process.env.VERCEL) return false;
  if (process.env.FORCE_SITE_URL_DNS === "1") return true;
  return process.env.GITHUB_ACTIONS === "true";
}

async function main(): Promise<void> {
  // Entire check is a repo/CI gate — never block Vercel deploy builds if invoked.
  if (process.env.VERCEL && process.env.FORCE_SITE_URL_CHECK !== "1") {
    console.log("check:site-url skipped on Vercel deploy (CI-only gate)");
    return;
  }

  const errors: string[] = [];

  const defaultHost = hostnameOf(DEFAULT_SITE_URL);
  if (!defaultHost) {
    errors.push(`DEFAULT_SITE_URL is not a valid URL: ${DEFAULT_SITE_URL}`);
  } else if (isForbiddenSiteHost(defaultHost)) {
    errors.push(
      `DEFAULT_SITE_URL uses forbidden host ${defaultHost}; pick a resolvable origin`,
    );
  }

  for (const rel of EMBEDDED_DEFAULTS) {
    const embedded = readEmbeddedDefault(rel);
    if (embedded !== DEFAULT_SITE_URL) {
      errors.push(
        `${rel} (${embedded}) !== @hewnui/site-url (${DEFAULT_SITE_URL}). Run: pnpm sync:site-url`,
      );
    }
  }

  const files = listTrackedFiles();
  errors.push(...findForbiddenMentions(files));

  if (shouldProbeDns() && defaultHost) {
    try {
      await lookup(defaultHost);
    } catch {
      errors.push(
        `DEFAULT_SITE_URL host does not resolve (NXDOMAIN or network error): ${defaultHost}`,
      );
    }
  }

  if (errors.length > 0) {
    console.error("check:site-url failed:\n");
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    console.error(
      `\nCanonical default lives in packages/site-url/src/index.ts (${DEFAULT_SITE_URL}).`,
    );
    process.exitCode = 1;
    return;
  }

  const dnsNote = shouldProbeDns() ? ", dns probed" : ", dns skipped";
  console.log(
    `check:site-url ok — default ${DEFAULT_SITE_URL} (${files.length} files scanned${dnsNote})`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
