#!/usr/bin/env node
/**
 * prepack / postpack helper for publishable packages.
 *
 * Private workspace packages (`@hewnui/tsconfig`, `@hewnui/registry`, …) must
 * not appear in the packed package.json — they are not on npm (version 0.0.0).
 * `pnpm pack` still resolves `workspace:*` into the tarball manifest, so we
 * strip private workspace deps before pack and restore afterward.
 *
 * Usage (from a package dir):
 *   node ../../tooling/strip-private-workspace-deps.mjs prepack
 *   node ../../tooling/strip-private-workspace-deps.mjs postpack
 */
import { existsSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const mode = process.argv[2];
const cwd = process.cwd();
const pkgPath = join(cwd, "package.json");
const backupPath = join(cwd, "package.json.prepack-bak");
const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

if (mode !== "prepack" && mode !== "postpack") {
  console.error("Usage: strip-private-workspace-deps.mjs <prepack|postpack>");
  process.exit(1);
}

if (mode === "postpack") {
  if (existsSync(backupPath)) {
    renameSync(backupPath, pkgPath);
  }
  process.exit(0);
}

const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
writeFileSync(backupPath, `${JSON.stringify(pkg, null, 2)}\n`);

const fields = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies",
];

let stripped = 0;
for (const field of fields) {
  const deps = pkg[field];
  if (!deps || typeof deps !== "object") continue;
  for (const name of Object.keys(deps)) {
    if (!isPrivateWorkspacePackage(name)) continue;
    delete deps[name];
    stripped += 1;
  }
  if (Object.keys(deps).length === 0) delete pkg[field];
}

writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
if (stripped > 0) {
  console.log(
    `prepack: stripped ${stripped} private workspace dep(s) from ${pkg.name}`,
  );
}

function isPrivateWorkspacePackage(name) {
  if (!name.startsWith("@hewnui/") && name !== "hewnui") return false;
  const folder = name.startsWith("@hewnui/")
    ? name.slice("@hewnui/".length)
    : "cli";
  // Map package name → packages/<dir>
  const candidates = [
    join(repoRoot, "packages", folder, "package.json"),
    join(repoRoot, "packages", name === "hewnui" ? "cli" : folder, "package.json"),
  ];
  for (const candidate of candidates) {
    if (!existsSync(candidate)) continue;
    try {
      const meta = JSON.parse(readFileSync(candidate, "utf8"));
      if (meta.name === name) return Boolean(meta.private);
    } catch {
      /* ignore */
    }
  }
  // Known unpublished workspace tooling — fail closed if package.json missing
  return (
    name === "@hewnui/tsconfig" ||
    name === "@hewnui/registry" ||
    name === "@hewnui/site-url" ||
    name === "@hewnui/docs-metadata" ||
    name === "@hewnui/mcp"
  );
}
