import { readFileSync } from "fs";
import { contrastRatio, parseColor, type Oklch } from "./contrast.js";
import { collectFiles } from "./glob.js";
import type { LintFinding } from "./types.js";

export type ThemeBlock = {
  selector: string;
  file: string;
  line: number;
  tokens: Record<string, { value: string; line: number; color: Oklch }>;
};

const BLOCK_RE = /([^{}]+)\{([^{}]+)\}/g;
const DECL_RE = /(--[\w-]+)\s*:\s*([^;]+);/g;

/** Text/UI pairs and minimum WCAG contrast (AA). */
export const CONTRAST_PAIRS: Array<{
  fg: string;
  bg: string;
  min: number;
  kind: "text" | "ui";
}> = [
  { fg: "--kp-foreground", bg: "--kp-background", min: 4.5, kind: "text" },
  { fg: "--kp-foreground", bg: "--kp-surface", min: 4.5, kind: "text" },
  // Muted copy is treated as large/UI secondary text (3:1 AA).
  { fg: "--kp-muted-foreground", bg: "--kp-background", min: 3, kind: "ui" },
  { fg: "--kp-muted-foreground", bg: "--kp-muted", min: 3, kind: "ui" },
  { fg: "--kp-accent-foreground", bg: "--kp-accent", min: 4.5, kind: "text" },
  { fg: "--kp-accent", bg: "--kp-background", min: 3, kind: "ui" },
  { fg: "--kp-danger", bg: "--kp-background", min: 3, kind: "ui" },
];

export function loadThemeBlocks(cwd: string, themeGlobs: string[]): ThemeBlock[] {
  const files = collectFiles(cwd, themeGlobs, ["**/node_modules/**"], []);
  const blocks: ThemeBlock[] = [];
  for (const file of files) {
    let content: string;
    try {
      content = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    blocks.push(...parseThemeCss(file, content));
  }
  return blocks;
}

export function parseThemeCss(file: string, content: string): ThemeBlock[] {
  const blocks: ThemeBlock[] = [];
  let match: RegExpExecArray | null;
  const re = new RegExp(BLOCK_RE.source, "g");
  while ((match = re.exec(content)) !== null) {
    const selector = match[1]!.trim();
    const body = match[2]!;
    if (!selector.includes("data-theme") && !selector.includes(":root")) continue;
    const line = content.slice(0, match.index).split("\n").length;
    const tokens: ThemeBlock["tokens"] = {};
    let decl: RegExpExecArray | null;
    const declRe = new RegExp(DECL_RE.source, "g");
    while ((decl = declRe.exec(body)) !== null) {
      const name = decl[1]!;
      const value = decl[2]!.trim();
      const color = parseColor(value);
      if (!color) continue;
      const declLine =
        line + body.slice(0, decl.index).split("\n").length - 1;
      tokens[name] = { value, line: declLine, color };
    }
    if (Object.keys(tokens).length > 0) {
      blocks.push({ selector, file, line, tokens });
    }
  }
  return blocks;
}

export function checkThemeContrast(blocks: ThemeBlock[]): LintFinding[] {
  const findings: LintFinding[] = [];
  for (const block of blocks) {
    for (const pair of CONTRAST_PAIRS) {
      const fg = block.tokens[pair.fg];
      const bg = block.tokens[pair.bg];
      if (!fg || !bg) continue;
      const ratio = contrastRatio(fg.color, bg.color);
      if (ratio + 1e-6 < pair.min) {
        findings.push({
          ruleId: "aa-contrast",
          severity: "error",
          message: `${pair.fg} on ${pair.bg} in ${block.selector} is ${ratio.toFixed(2)}:1 (need ${pair.min}:1 ${pair.kind} AA)`,
          file: block.file,
          line: fg.line,
          column: 1,
        });
      }
    }
  }
  return findings;
}
