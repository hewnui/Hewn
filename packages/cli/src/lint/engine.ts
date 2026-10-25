import { readFileSync, writeFileSync } from "fs";
import { relative } from "path";
import { loadLintConfig } from "./config.js";
import { collectFiles, matchGlob } from "./glob.js";
import { checkThemeContrast, loadThemeBlocks } from "./parse-themes.js";
import { lintDestructiveConfirms } from "./rules/destructive-confirms.js";
import { lintLabelledOverlays } from "./rules/labelled-overlays.js";
import {
  applyReducedMotionFixes,
  lintReducedMotion,
} from "./rules/reduced-motion.js";
import { lintTokensOnly } from "./rules/tokens-only.js";
import { loadTypescript } from "./typescript.js";
import type { LintFinding, LintOptions, LintReport, SourceFile } from "./types.js";

export async function runLint(options: LintOptions): Promise<LintReport> {
  const config = await loadLintConfig(options.cwd);
  const ts = loadTypescript(options.cwd);
  const files = collectFiles(
    options.cwd,
    config.include,
    config.ignore,
    options.paths,
  );

  const findings: LintFinding[] = [];
  let fixed = 0;

  if (config.rules["aa-contrast"] !== "off") {
    const blocks = loadThemeBlocks(options.cwd, config.themes).filter(
      (block) => !isIgnored(options.cwd, block.file, config.ignore),
    );
    for (const f of checkThemeContrast(blocks)) {
      if (isIgnored(options.cwd, f.file, config.ignore)) continue;
      findings.push(withSeverity(f, config.rules["aa-contrast"]));
    }
  }

  for (const abs of files) {
    let content: string;
    try {
      content = readFileSync(abs, "utf8");
    } catch {
      continue;
    }
    const source: SourceFile = {
      filePath: abs,
      content,
      lines: content.split("\n"),
    };
    const fileFindings: LintFinding[] = [];

    if (config.rules["tokens-only"] !== "off") {
      for (const f of lintTokensOnly(source)) {
        fileFindings.push(withSeverity(f, config.rules["tokens-only"]));
      }
    }
    if (config.rules["reduced-motion"] !== "off") {
      for (const f of lintReducedMotion(source)) {
        fileFindings.push(withSeverity(f, config.rules["reduced-motion"]));
      }
    }
    if (
      config.rules["labelled-overlays"] !== "off" &&
      /\.[jt]sx?$/.test(abs)
    ) {
      for (const f of lintLabelledOverlays(source, ts)) {
        fileFindings.push(withSeverity(f, config.rules["labelled-overlays"]));
      }
    }
    if (
      config.rules["destructive-confirms"] !== "off" &&
      /\.[jt]sx?$/.test(abs)
    ) {
      for (const f of lintDestructiveConfirms(source, ts)) {
        fileFindings.push(
          withSeverity(f, config.rules["destructive-confirms"]),
        );
      }
    }

    if (options.fix) {
      const result = applyReducedMotionFixes(content);
      if (result.fixed > 0) {
        writeFileSync(abs, result.content, "utf8");
        fixed += result.fixed;
        // Drop fixable reduced-motion findings for this file after fix
        for (let i = fileFindings.length - 1; i >= 0; i -= 1) {
          if (
            fileFindings[i]!.ruleId === "reduced-motion" &&
            fileFindings[i]!.fixable
          ) {
            fileFindings.splice(i, 1);
          }
        }
      }
    }

    findings.push(...fileFindings);
  }

  // Relativize paths for stable output
  for (const f of findings) {
    f.file = relative(options.cwd, f.file).split("\\").join("/") || f.file;
  }

  findings.sort(
    (a, b) =>
      a.file.localeCompare(b.file) ||
      a.line - b.line ||
      a.column - b.column ||
      a.ruleId.localeCompare(b.ruleId),
  );

  return {
    findings,
    fixed,
    errorCount: findings.filter((f) => f.severity === "error").length,
    warnCount: findings.filter((f) => f.severity === "warn").length,
  };
}

function withSeverity(
  finding: LintFinding,
  level: "error" | "warn" | "off",
): LintFinding {
  if (level === "off") return finding;
  return { ...finding, severity: level };
}

function isIgnored(cwd: string, absOrRel: string, ignore: string[]): boolean {
  const rel = relative(cwd, absOrRel).split("\\").join("/");
  const path = rel.startsWith("..") ? absOrRel.split("\\").join("/") : rel;
  return ignore.some((g) => matchGlob(g, path) || matchGlob(g, absOrRel));
}
