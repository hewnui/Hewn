/** Patterns for tooling/check-honest-copy.ts */

export const LICENCE_PATTERNS: Array<{ id: string; re: RegExp }> = [
  { id: "built in the open", re: /built in the open/i },
  { id: "open source claim", re: /\bopen[\s-]source\b/i },
  { id: "free forever", re: /free forever/i },
];

/** Bare install commands that imply npm publish already happened. */
export const INSTALL_PATTERNS: Array<{ id: string; re: RegExp }> = [
  { id: "pnpm add @hewnui", re: /(?:^|[^\w#/])pnpm add @hewnui\//m },
  { id: "npm install @hewnui", re: /(?:^|[^\w#/])npm i(?:nstall)? @hewnui\//m },
  { id: "npx @hewnui", re: /(?:^|[^\w#/])npx @hewnui\//m },
];

/**
 * MCP is held back from the first npm cut. Always enforced unless
 * MCP_PUBLISHED is true — including when PACKAGES_PUBLISHED is already true.
 */
export const MCP_INSTALL_PATTERNS: Array<{ id: string; re: RegExp }> = [
  { id: "npx @hewnui/mcp", re: /(?:^|[^\w#/])npx @hewnui\/mcp\b/m },
  {
    id: "npm install @hewnui/mcp",
    re: /(?:^|[^\w#/])npm i(?:nstall)? @hewnui\/mcp\b/m,
  },
  {
    id: "pnpm add @hewnui/mcp",
    re: /(?:^|[^\w#/])pnpm add @hewnui\/mcp\b/m,
  },
];

/** Product claims that are not decided yet. */
export const PRODUCT_PATTERNS: Array<{ id: string; re: RegExp }> = [
  {
    id: "GitHub sign-in unlocks Pro",
    re: /GitHub sign-in will unlock/i,
  },
];

export function lineAllowedForInstall(line: string): boolean {
  return (
    /available at launch/i.test(line) ||
    /coming soon/i.test(line) ||
    /^\s*#\s*Available at launch:/i.test(line) ||
    /^\s*#\s*Coming soon:/i.test(line)
  );
}

export function isMetaLine(line: string): boolean {
  return (
    /PACKAGES_PUBLISHED|MCP_PUBLISHED|distribution\.ts|Available at launch|Coming soon/.test(
      line,
    ) &&
    (line.trim().startsWith("//") || line.trim().startsWith("*"))
  );
}
