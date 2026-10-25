import { offsetToLineColumn } from "../location.js";
import type { LintFinding, SourceFile } from "../types.js";

const COLOR_LITERAL_RE =
  /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b|(?:rgba?|hsla?|oklch|oklab)\([^)]*\)/g;

const TW_ARBITRARY_COLOR_RE =
  /\b(?:bg|text|border|ring|outline|fill|stroke|from|via|to|shadow|accent|caret|decoration|divide)-\[(?:#[0-9a-fA-F]+|(?:rgba?|hsla?|oklch|oklab)[^\]]*)\]/g;

const SKIP_PATH_RE =
  /(?:^|\/)(?:packs|figma)\//i;

const THEME_DEF_RE = /--kp-[\w-]+\s*:/;

export function lintTokensOnly(file: SourceFile): LintFinding[] {
  const rel = file.filePath.replace(/\\/g, "/");
  if (SKIP_PATH_RE.test(rel)) return [];

  const findings: LintFinding[] = [];
  const content = stripComments(file.content);
  const seen = new Set<string>();

  const consider = (index: number, raw: string) => {
    const lineStart = content.lastIndexOf("\n", index) + 1;
    const lineEnd = content.indexOf("\n", index);
    const lineText = content.slice(lineStart, lineEnd === -1 ? content.length : lineEnd);
    if (THEME_DEF_RE.test(lineText)) return;
    // href="#section" fragment anchors
    if (/\bhref\s*=\s*["']?#/.test(lineText) && raw.startsWith("#")) return;
    // Neutral black/white OKLCH recipes used for shadows / glass refraction edges
    if (isNeutralOklchLiteral(raw)) return;
    // Tailwind arbitrary already reported via TW regex — skip bare hex inside []
    if (
      raw.startsWith("#") &&
      /-\[[^\]]*$/.test(content.slice(Math.max(0, index - 24), index + 1))
    ) {
      return;
    }

    const { line, column } = offsetToLineColumn(file.content, index);
    const key = `${line}:${column}:${raw}`;
    if (seen.has(key)) return;
    seen.add(key);
    findings.push({
      ruleId: "tokens-only",
      severity: "error",
      message: `Raw colour literal — use a semantic token (e.g. --kp-foreground) instead of ${snip(raw)}`,
      file: file.filePath,
      line,
      column,
    });
  };

  // Prefer Tailwind arbitrary matches; skip bare literals already covered.
  const covered = new Set<string>();
  TW_ARBITRARY_COLOR_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = TW_ARBITRARY_COLOR_RE.exec(content)) !== null) {
    consider(match.index, match[0]);
    covered.add(`${match.index}:${match[0].length}`);
    // Mark inner colour function spans as covered
    const inner = match[0].match(COLOR_LITERAL_RE);
    if (inner) {
      const innerIndex = match.index + match[0].indexOf(inner[0]);
      covered.add(`${innerIndex}:${inner[0].length}`);
    }
  }

  COLOR_LITERAL_RE.lastIndex = 0;
  while ((match = COLOR_LITERAL_RE.exec(content)) !== null) {
    if (covered.has(`${match.index}:${match[0].length}`)) continue;
    // Skip colour-space keywords inside color-mix(in_oklch, …) — not a literal call
    if (
      match[0].startsWith("oklch") &&
      /color-mix\(\s*in_oklch/.test(
        content.slice(Math.max(0, match.index - 24), match.index + 8),
      ) &&
      !match[0].includes("(")
    ) {
      continue;
    }
    consider(match.index, match[0]);
  }

  return findings;
}

function snip(raw: string): string {
  return raw.length > 48 ? `${raw.slice(0, 45)}…` : raw;
}

/** `oklch(0 0 0 / a%)` / `oklch(1_0_0/12%)` — not brand colour. */
function isNeutralOklchLiteral(raw: string): boolean {
  const m = raw.match(
    /oklch\(\s*([01](?:\.0+)?)\s*[_ ]\s*([0-9.]+)\s*[_ ]\s*([0-9.]+)(?:\s*\/\s*[0-9.%]+)?\s*\)/i,
  );
  if (!m) return false;
  const l = Number(m[1]);
  const c = Number(m[2]);
  return (l === 0 || l === 1) && c === 0;
}

function stripComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}
