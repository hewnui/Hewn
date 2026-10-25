import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import type { FsCatalogPaths } from "./catalog.js";

/** Walk up from cwd (and this package) to find the monorepo root. */
export function findRepoRoot(start = process.cwd()): string | null {
  let dir = start;
  for (let i = 0; i < 8; i += 1) {
    if (
      existsSync(join(dir, "pnpm-workspace.yaml")) &&
      existsSync(join(dir, "packages/registry"))
    ) {
      return dir;
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  const fromPackage = join(dirname(fileURLToPath(import.meta.url)), "../../..");
  if (existsSync(join(fromPackage, "pnpm-workspace.yaml"))) {
    return fromPackage;
  }
  return null;
}

export function resolveCatalogPaths(
  root = process.env.HEWN_ROOT ?? findRepoRoot(),
): FsCatalogPaths | null {
  if (!root) return null;
  const freeIndexPath = join(
    root,
    "packages/registry/generated/index.free.json",
  );
  if (!existsSync(freeIndexPath)) return null;
  return {
    freeIndexPath,
    proIndexPath: join(root, "packages/registry/generated/index.pro.json"),
    aiDir: join(root, "packages/docs-metadata/generated/components"),
  };
}
