import { join } from "path";
import { readJsonFile } from "../lib/fsx.js";
import {
  DEFAULT_RULES,
  RULE_IDS,
  type LintConfig,
  type LintRuleLevel,
  type RuleId,
} from "./types.js";

export type ProjectLintConfig = {
  root?: string;
  tsx?: boolean;
  registry?: string;
  lint?: Partial<{
    include: string[];
    ignore: string[];
    themes: string[];
    rules: Partial<Record<RuleId, LintRuleLevel>>;
  }>;
};

const DEFAULT_INCLUDE = [
  "**/*.{ts,tsx,js,jsx,css}",
];

const DEFAULT_IGNORE = [
  "**/node_modules/**",
  "**/dist/**",
  "**/.next/**",
  "**/coverage/**",
  "**/*.d.ts",
  "**/pnpm-lock.yaml",
];

const DEFAULT_THEMES = [
  "**/node_modules/@hewnui/themes/**/*.css",
  "packages/themes/src/packs/*.css",
];

export function defaultLintConfig(): LintConfig {
  return {
    include: [...DEFAULT_INCLUDE],
    ignore: [...DEFAULT_IGNORE],
    themes: [...DEFAULT_THEMES],
    rules: { ...DEFAULT_RULES },
  };
}

export async function loadLintConfig(cwd: string): Promise<LintConfig> {
  const base = defaultLintConfig();
  const raw = await readJsonFile<ProjectLintConfig>(join(cwd, "hewn.json"));
  if (!raw?.lint) return base;

  const rules = { ...base.rules };
  if (raw.lint.rules) {
    for (const id of RULE_IDS) {
      const level = raw.lint.rules[id];
      if (level === "error" || level === "warn" || level === "off") {
        rules[id] = level;
      }
    }
  }

  return {
    include: raw.lint.include?.length ? raw.lint.include : base.include,
    ignore: [...base.ignore, ...(raw.lint.ignore ?? [])],
    themes: raw.lint.themes?.length ? raw.lint.themes : base.themes,
    rules,
  };
}
