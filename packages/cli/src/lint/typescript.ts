import { createRequire } from "module";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export type TsModule = typeof import("typescript");

let cached: TsModule | null | undefined;

/** Resolve TypeScript from the project, then the CLI package, then workspace. */
export function loadTypescript(cwd: string): TsModule | null {
  if (cached !== undefined) return cached;
  const candidates = [
    cwd,
    join(cwd, "packages/cli"),
    dirname(fileURLToPath(import.meta.url)),
  ];
  for (const base of candidates) {
    try {
      const require = createRequire(join(base, "package.json"));
      cached = require("typescript") as TsModule;
      return cached;
    } catch {
      /* try next */
    }
  }
  try {
    const require = createRequire(import.meta.url);
    cached = require("typescript") as TsModule;
    return cached;
  } catch {
    cached = null;
    return null;
  }
}

export function resetTypescriptCache(): void {
  cached = undefined;
}
