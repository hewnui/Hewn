#!/usr/bin/env node
import { parseArgs } from "util";
import { addCommand } from "./commands/add.js";
import { initCommand } from "./commands/init.js";
import { lintCommand } from "./commands/lint.js";
import { themeCommand } from "./commands/theme.js";

const HELP = `hewn — Hewn CLI

Usage:
  hewn init [--root <dir>] [--yes]
  hewn add <name...> [--overwrite] [--yes]
  hewn theme [export]
  hewn lint [paths...] [--fix] [--json]
  hewn --help

Environment:
  HEWN_REGISTRY_URL  override the registry base url
`;

async function main(): Promise<number> {
  const { positionals, values } = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    strict: true,
    options: {
      root: { type: "string" },
      yes: { type: "boolean", short: "y", default: false },
      overwrite: { type: "boolean", default: false },
      fix: { type: "boolean", default: false },
      json: { type: "boolean", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
  });

  const [command, ...rest] = positionals;
  if (values.help || !command) {
    console.log(HELP);
    return 0;
  }

  switch (command) {
    case "init":
      return initCommand({ root: values.root, yes: values.yes ?? false });
    case "add":
      return addCommand(rest, {
        overwrite: values.overwrite ?? false,
        yes: values.yes ?? false,
      });
    case "theme":
      return themeCommand(rest);
    case "lint":
      return lintCommand({
        fix: values.fix ?? false,
        json: values.json ?? false,
        paths: rest,
      });
    default:
      console.error(`Unknown command: ${command}\n`);
      console.log(HELP);
      return 1;
  }
}

main()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
