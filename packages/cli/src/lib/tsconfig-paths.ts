import { existsSync, readFileSync } from "fs";
import { dirname, isAbsolute, join } from "path";
import { parseJsonc } from "./jsonc.js";

export type TsconfigPaths = Record<string, string[]>;

type TsconfigShape = {
  extends?: string | string[];
  compilerOptions?: {
    paths?: TsconfigPaths;
    baseUrl?: string;
  };
};

const CONFIG_NAMES = ["tsconfig.json", "jsconfig.json"] as const;

/** Prefer tsconfig.json, then jsconfig.json, at the project root. */
export function findConfigPath(cwd: string): string | null {
  for (const name of CONFIG_NAMES) {
    const path = join(cwd, name);
    if (existsSync(path)) return path;
  }
  return null;
}

/**
 * Read compilerOptions.paths from tsconfig/jsconfig, following `extends`
 * (relative and bare packages under node_modules) up to a modest depth.
 * Later (child) paths win over parent.
 */
export function readTsconfigPaths(cwd: string): TsconfigPaths {
  const configPath = findConfigPath(cwd);
  if (!configPath) return {};
  return loadPaths(configPath, new Set(), 0);
}

function loadPaths(
  configPath: string,
  seen: Set<string>,
  depth: number,
): TsconfigPaths {
  if (depth > 8 || seen.has(configPath)) return {};
  seen.add(configPath);

  let raw: string;
  try {
    raw = readFileSync(configPath, "utf8");
  } catch {
    return {};
  }

  let parsed: TsconfigShape;
  try {
    parsed = parseJsonc<TsconfigShape>(raw);
  } catch {
    return {};
  }

  const parentPaths: TsconfigPaths = {};
  for (const ext of normalizeExtends(parsed.extends)) {
    const resolved = resolveExtends(configPath, ext);
    if (!resolved) continue;
    Object.assign(parentPaths, loadPaths(resolved, seen, depth + 1));
  }

  const own = parsed.compilerOptions?.paths ?? {};
  return { ...parentPaths, ...own };
}

function normalizeExtends(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function resolveExtends(fromConfig: string, ext: string): string | null {
  const baseDir = dirname(fromConfig);
  if (ext.startsWith(".") || isAbsolute(ext)) {
    const candidates = ext.endsWith(".json")
      ? [join(baseDir, ext)]
      : [join(baseDir, ext), join(baseDir, `${ext}.json`)];
    for (const candidate of candidates) {
      if (existsSync(candidate)) return candidate;
    }
    return null;
  }

  // Bare package extends (e.g. "@tsconfig/next/tsconfig.json")
  let dir = baseDir;
  for (let i = 0; i < 6; i += 1) {
    const candidate = join(dir, "node_modules", ext);
    if (existsSync(candidate)) return candidate;
    const withJson = `${candidate}.json`;
    if (existsSync(withJson)) return withJson;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

/**
 * Map a project-relative directory (e.g. `src/components/hewn`) to an import
 * alias using tsconfig paths (e.g. `@/components/hewn`).
 */
export function aliasForRoot(
  componentsRoot: string,
  paths: TsconfigPaths,
): string | undefined {
  const normalizedRoot = normalizePosix(componentsRoot).replace(/^\.\//, "");

  for (const [pattern, targets] of Object.entries(paths)) {
    if (!pattern.endsWith("/*")) continue;
    const aliasPrefix = pattern.slice(0, -1); // "@/" from "@/*"
    for (const target of targets) {
      const targetBase = normalizePosix(target)
        .replace(/^\.\//, "")
        .replace(/\*$/, "")
        .replace(/\/$/, "");
      let under: string | null;
      if (targetBase.length === 0) {
        under = normalizedRoot;
      } else if (normalizedRoot === targetBase) {
        under = "";
      } else if (normalizedRoot.startsWith(`${targetBase}/`)) {
        under = normalizedRoot.slice(targetBase.length + 1);
      } else {
        under = null;
      }
      if (under === null) continue;
      return under.length === 0
        ? aliasPrefix.replace(/\/$/, "")
        : `${aliasPrefix}${under}`;
    }
  }
  return undefined;
}

function normalizePosix(path: string): string {
  return path.replace(/\\/g, "/");
}
