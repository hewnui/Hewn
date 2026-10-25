import type { LintReport } from "./types.js";

export function formatHuman(report: LintReport): string {
  if (report.findings.length === 0) {
    const fixed =
      report.fixed > 0 ? ` (${report.fixed} issue${report.fixed === 1 ? "" : "s"} fixed)` : "";
    return `No Hewn lint issues found${fixed}.`;
  }

  const lines: string[] = [];
  for (const f of report.findings) {
    const fix = f.fixable ? " [fixable]" : "";
    lines.push(
      `${f.file}:${f.line}:${f.column} ${f.severity} ${f.ruleId}${fix}`,
    );
    lines.push(`  ${f.message}`);
  }
  lines.push("");
  lines.push(
    `${report.errorCount} error${report.errorCount === 1 ? "" : "s"}, ${report.warnCount} warning${report.warnCount === 1 ? "" : "s"}`,
  );
  if (report.fixed > 0) {
    lines.push(`${report.fixed} issue${report.fixed === 1 ? "" : "s"} fixed`);
  }
  return lines.join("\n");
}

export function formatJson(report: LintReport): string {
  return `${JSON.stringify(
    {
      errorCount: report.errorCount,
      warnCount: report.warnCount,
      fixed: report.fixed,
      findings: report.findings,
    },
    null,
    2,
  )}\n`;
}
