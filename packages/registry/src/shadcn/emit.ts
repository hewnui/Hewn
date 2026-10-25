import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { buildShadcnRegistry, type BuildShadcnOptions } from "./build";
import type { ShadcnItem, ShadcnRegistry } from "./types";

export type EmitShadcnResult = {
  itemCount: number;
  filesEmitted: number;
  registry: ShadcnRegistry;
  items: ShadcnItem[];
};

async function writeJson(path: string, value: unknown): Promise<void> {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function emitShadcnRegistry(
  outDir: string,
  options: BuildShadcnOptions,
): Promise<EmitShadcnResult> {
  const { registry, items } = await buildShadcnRegistry(options);
  await mkdir(outDir, { recursive: true });
  await writeJson(join(outDir, "registry.json"), registry);

  let filesEmitted = 1;
  for (const item of items) {
    await writeJson(join(outDir, `${item.name}.json`), item);
    filesEmitted += 1;
  }

  return { itemCount: items.length, filesEmitted, registry, items };
}
