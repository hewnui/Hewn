import { existsSync } from "fs";
import { join } from "path";

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export type ProjectInfo = {
  root: string;
  tsx: boolean;
  packageManager: PackageManager;
};

function detectPackageManager(cwd: string): PackageManager {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  if (existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock"))) {
    return "bun";
  }
  return "npm";
}

export function detectProject(cwd: string): ProjectInfo | null {
  if (!existsSync(join(cwd, "package.json"))) return null;
  return {
    root: cwd,
    tsx: existsSync(join(cwd, "tsconfig.json")),
    packageManager: detectPackageManager(cwd),
  };
}
