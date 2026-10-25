import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import type { RegistryItem } from "./schema";
import type { RegistryFileEntry } from "./types";

export type BuiltRegistryItem = RegistryItem & {
  sharedDependencies: string[];
};

export type BuiltItem = {
  item: BuiltRegistryItem;
  files: RegistryFileEntry[];
  jsxFiles: RegistryFileEntry[];
};

export type EmitResult = {
  freeCount: number;
  proCount: number;
  filesEmitted: number;
};

export async function emitFoundation(
  outDir: string,
  files: RegistryFileEntry[],
  jsxFiles: RegistryFileEntry[],
): Promise<void> {
  await mkdir(outDir, { recursive: true });
  await writeJson(join(outDir, "foundation.json"), {
    version: 1,
    files,
    jsxFiles,
  });
}

async function writeJson(path: string, value: unknown): Promise<void> {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function emitRegistry(
  items: BuiltItem[],
  outDir: string,
): Promise<EmitResult> {
  const free = items.filter(({ item }) => item.tier === "free");
  const pro = items.filter(({ item }) => item.tier === "pro");

  await mkdir(join(outDir, "r"), { recursive: true });

  let filesEmitted = 0;
  for (const { item, files, jsxFiles } of free) {
    await writeJson(join(outDir, "r", `${item.name}.json`), {
      ...item,
      files,
      jsxFiles,
    });
    filesEmitted += 1;
  }

  await writeJson(join(outDir, "index.free.json"), {
    version: 1,
    items: free.map(({ item }) => ({
      ...item,
      url: `/r/${item.name}.json`,
    })),
  });

  await writeJson(join(outDir, "index.pro.json"), {
    version: 1,
    items: pro.map(({ item }) => ({ ...item })),
  });

  return {
    freeCount: free.length,
    proCount: pro.length,
    filesEmitted: filesEmitted + 2,
  };
}
