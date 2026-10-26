import { existsSync } from "fs";
import { join } from "path";
import {
  aliasForRoot,
  findConfigPath,
  readTsconfigPaths,
} from "./tsconfig-paths.js";

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export type ProjectInfo = {
  root: string;
  tsx: boolean;
  packageManager: PackageManager;
  /** Detected components install directory, relative to project root. */
  componentsRoot: string;
  /** Import alias for that directory when tsconfig paths allow (e.g. `@/components/hewn`). */
  alias?: string;
  /** True when a `src/` app/components/pages layout was detected. */
  hasSrcDir: boolean;
};

function detectPackageManager(cwd: string): PackageManager {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  if (existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock"))) {
    return "bun";
  }
  return "npm";
}

/** Next/Vite-style `src/` layouts: app, components, or pages under src/. */
export function detectSrcDir(cwd: string): boolean {
  const src = join(cwd, "src");
  if (!existsSync(src)) return false;
  return (
    existsSync(join(src, "app")) ||
    existsSync(join(src, "components")) ||
    existsSync(join(src, "pages"))
  );
}

export function defaultComponentsRoot(hasSrcDir: boolean): string {
  return hasSrcDir ? "src/components/hewn" : "components/hewn";
}

export function detectProject(cwd: string): ProjectInfo | null {
  if (!existsSync(join(cwd, "package.json"))) return null;

  const hasSrcDir = detectSrcDir(cwd);
  const componentsRoot = defaultComponentsRoot(hasSrcDir);
  const paths = readTsconfigPaths(cwd);
  const alias = aliasForRoot(componentsRoot, paths);
  const hasTsConfig = findConfigPath(cwd) !== null;

  return {
    root: cwd,
    tsx: hasTsConfig,
    packageManager: detectPackageManager(cwd),
    componentsRoot,
    ...(alias ? { alias } : {}),
    hasSrcDir,
  };
}
