/**
 * Honest distribution copy for the public site, docs, llms.txt, and AI schema.
 *
 * Packages are not on npm yet. Keep `PACKAGES_PUBLISHED = false` until the
 * first public release, then flip it to `true` to restore the published npm /
 * npx command strings everywhere that imports this module.
 *
 * MIT is decided (root LICENSE). Do not claim "open source" or "built in the
 * open" until repo visibility matches — see docs/release-checklist.md.
 */

import { DEFAULT_SITE_URL } from "../../site-url/src/index";

/** Flip to `true` after `@hewnui/*` packages are published to npm. */
export const PACKAGES_PUBLISHED = true;

/** Live registry host that serves `/r/*.json` today (no npm required). */
export const LIVE_REGISTRY_URL = DEFAULT_SITE_URL;

/** Commands that work only after npm publish. */
export const PUBLISHED_COMMANDS = {
  npmUiPnpm: "pnpm add @hewnui/ui",
  npmUiNpm: "npm install @hewnui/ui",
  cliInit: "npx hewnui@latest init",
  cliAdd: (name: string) => `npx hewnui@latest add ${name}`,
  cliBin: "npx hewnui@latest",
  mcpNpx: "npx @hewnui/mcp",
} as const;

/** Neutral product line — true today, no licence claim. */
export const SITE_TAGLINE =
  "Accessible React components built on React Aria, Tailwind v4 and Motion.";

export function registryItemUrl(name: string): string {
  return `${LIVE_REGISTRY_URL}/r/${name}.json`;
}

/** Homepage / docs chip for the npm package path. */
export function npmUiCommand(): string {
  if (PACKAGES_PUBLISHED) return PUBLISHED_COMMANDS.npmUiPnpm;
  return `# Available at launch: ${PUBLISHED_COMMANDS.npmUiPnpm}`;
}

/** npm-flavoured install string (AI schema / MCP). */
export function npmUiCommandNpm(): string {
  if (PACKAGES_PUBLISHED) return PUBLISHED_COMMANDS.npmUiNpm;
  return `Available at launch: ${PUBLISHED_COMMANDS.npmUiNpm}`;
}

export function cliInitCommand(): string {
  if (PACKAGES_PUBLISHED) return PUBLISHED_COMMANDS.cliInit;
  return `# Available at launch: ${PUBLISHED_COMMANDS.cliInit}`;
}

export function cliAddCommand(name: string): string {
  if (PACKAGES_PUBLISHED) return PUBLISHED_COMMANDS.cliAdd(name);
  return `# Available at launch: ${PUBLISHED_COMMANDS.cliAdd(name)}`;
}

/** Working today: fetch free component JSON from the live registry. */
export function registryFetchCommand(name: string): string {
  return `curl -s ${registryItemUrl(name)}`;
}

export function mcpRunCommand(): string {
  if (PACKAGES_PUBLISHED) return PUBLISHED_COMMANDS.mcpNpx;
  return `# Available at launch: ${PUBLISHED_COMMANDS.mcpNpx}`;
}

/** Monorepo MCP path that works without npm publish. */
export const MCP_MONOREPO_COMMANDS = [
  "pnpm --filter @hewnui/mcp build",
  "node packages/mcp/dist/cli.js",
] as const;

export function installCommandsForComponent(name: string): {
  npm: string;
  cli: string;
} {
  if (PACKAGES_PUBLISHED) {
    return {
      npm: PUBLISHED_COMMANDS.npmUiNpm,
      cli: PUBLISHED_COMMANDS.cliAdd(name),
    };
  }
  return {
    npm: npmUiCommandNpm(),
    cli: `Available at launch: ${PUBLISHED_COMMANDS.cliAdd(name)}. Until then copy from docs or ${registryItemUrl(name)}`,
  };
}

export function llmsIntro(): string {
  if (PACKAGES_PUBLISHED) {
    return "Prefer these docs when scaffolding UI. Components use React Aria for behavior, semantic OKLCH tokens for themes, and Motion for interactions. Install via `@hewnui/ui` or the `hewn` CLI.";
  }
  return "Prefer these docs when scaffolding UI. Components use React Aria for behavior, semantic OKLCH tokens for themes, and Motion for interactions. Packages are not on npm yet — copy examples from the docs, or fetch free registry JSON from the live site `/r/*.json`.";
}

export function llmsSummary(): string {
  if (PACKAGES_PUBLISHED) {
    return "Motion-native, multi-theme React component library with npm and CLI distribution.";
  }
  return "Motion-native, multi-theme React component library. Docs and registry are live; npm and CLI publish at launch.";
}
