import { runLint } from "../lint/engine.js";
import { formatHuman, formatJson } from "../lint/report.js";

export async function lintCommand(options: {
  cwd?: string;
  fix?: boolean;
  json?: boolean;
  paths?: string[];
}): Promise<number> {
  const report = await runLint({
    cwd: options.cwd ?? process.cwd(),
    fix: options.fix ?? false,
    json: options.json ?? false,
    paths: options.paths ?? [],
  });

  if (options.json) {
    process.stdout.write(formatJson(report));
  } else {
    console.log(formatHuman(report));
  }

  return report.errorCount > 0 ? 1 : 0;
}
