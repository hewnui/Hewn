#!/usr/bin/env node
// prepublishOnly guard for @hewnui/ui, @hewnui/motion, @hewnui/themes, hewnui.
//
// The workspace package.json files point `exports` at ./src and depend on each
// other via `workspace:*`. Only pnpm (`pnpm publish`, which `changeset publish`
// uses in this repo) rewrites `workspace:*` to real versions and hoists the
// `publishConfig` exports (./dist). Plain `npm publish` ships the raw manifest,
// which is exactly how 0.1.0 went out broken. This script refuses that path and
// checks that every published export target has actually been built.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const cwd = process.cwd();
const pkg = JSON.parse(readFileSync(join(cwd, "package.json"), "utf8"));
const agent = process.env.npm_config_user_agent ?? "";
const errors = [];

if (!agent.startsWith("pnpm/")) {
  errors.push(
    `refusing to publish with "${agent.split(" ")[0] || "unknown client"}".`,
    "Publish from the repo root with `pnpm release` (or `pnpm changeset publish --otp=<code>`),",
    "or from this folder with `pnpm publish --access public`. Never `npm publish`:",
    "it ships workspace:* dependencies and ./src exports that consumers cannot install.",
  );
}

const exportsField = pkg.publishConfig?.exports ?? pkg.exports ?? {};
const targets = [];
const collect = (value) => {
  if (typeof value === "string") targets.push(value);
  else if (value && typeof value === "object") Object.values(value).forEach(collect);
};
collect(exportsField);
for (const field of ["main", "module", "types"]) {
  const value = pkg.publishConfig?.[field] ?? pkg[field];
  if (typeof value === "string") targets.push(value);
}
for (const value of Object.values(pkg.bin ?? {})) targets.push(value);

for (const target of new Set(targets)) {
  if (/\.(?:c|m)?tsx?$/.test(target) && !/\.d\.(?:c|m)?ts$/.test(target)) {
    errors.push(`published export points at TypeScript source: ${target}`);
  }
  if (!existsSync(join(cwd, target))) {
    errors.push(`published export target missing (run \`pnpm build\` first): ${target}`);
  }
}

if (errors.length > 0) {
  console.error(`\n✖ ${pkg.name}: publish blocked\n  ${errors.join("\n  ")}\n`);
  process.exit(1);
}
