import { offsetToLineColumn } from "../location.js";
import type { LintFinding, SourceFile } from "../types.js";

const TRANSITION_ALL_CLASS = /\btransition-all\b/g;
const TRANSITION_ALL_CSS = /transition\s*:\s*all\b/gi;

const MOTION_IMPORT =
  /from\s+["'](?:motion\/react|framer-motion)["']|require\(["'](?:motion\/react|framer-motion)["']\)/;
const MOTION_USAGE =
  /\b(?:motion\.|m\.|animate\s*=|animate\(|useAnimate\b|<motion\.)/;
const REDUCED_MOTION_PATH =
  /\b(?:useReducedMotion|useMotionMode|motionEnabled|prefers-reduced-motion|reducedMotion|MotionConfig|MotionProvider|matchMedia\s*\(\s*["']\(prefers-reduced-motion)/;

export function lintReducedMotion(file: SourceFile): LintFinding[] {
  const findings: LintFinding[] = [];
  const { content, filePath } = file;

  for (const re of [TRANSITION_ALL_CLASS, TRANSITION_ALL_CSS]) {
    re.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = re.exec(content)) !== null) {
      const { line, column } = offsetToLineColumn(content, match.index);
      findings.push({
        ruleId: "reduced-motion",
        severity: "error",
        message:
          "`transition: all` / `transition-all` animates layout properties — list exact properties instead",
        file: filePath,
        line,
        column,
        fixable: true,
      });
    }
  }

  if (MOTION_IMPORT.test(content) && MOTION_USAGE.test(content)) {
    if (!REDUCED_MOTION_PATH.test(content)) {
      const importMatch = content.match(MOTION_IMPORT);
      const index = importMatch ? content.indexOf(importMatch[0]) : 0;
      const { line, column } = offsetToLineColumn(content, Math.max(0, index));
      findings.push({
        ruleId: "reduced-motion",
        severity: "error",
        message:
          "Motion usage without a statically detectable reduced-motion path (useReducedMotion, MotionConfig, or prefers-reduced-motion)",
        file: filePath,
        line,
        column,
      });
    }
  }

  return findings;
}

const FIX_CLASS = "transition-[color,background-color,border-color,opacity,transform,box-shadow]";
const FIX_CSS =
  "transition: color, background-color, border-color, opacity, transform, box-shadow";

export function applyReducedMotionFixes(content: string): { content: string; fixed: number } {
  let fixed = 0;
  let next = content.replace(TRANSITION_ALL_CLASS, () => {
    fixed += 1;
    return FIX_CLASS;
  });
  next = next.replace(TRANSITION_ALL_CSS, () => {
    fixed += 1;
    return FIX_CSS;
  });
  return { content: next, fixed };
}
