import { mkdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { formatAiModule, scaffoldAiMeta } from "../packages/docs-metadata/src/ai-scaffold";
import type { RegistryIndexItem } from "../packages/docs-metadata/src/sections";
import { readFile } from "fs/promises";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const freeIndexPath = join(
  repoRoot,
  "packages/registry/generated/index.free.json",
);
const componentsRoot = join(repoRoot, "packages/ui/src/components");

async function main(): Promise<void> {
  const raw = await readFile(freeIndexPath, "utf8");
  const parsed = JSON.parse(raw) as { items: RegistryIndexItem[] };
  let created = 0;

  for (const item of parsed.items) {
    const dir = join(componentsRoot, item.name);
    const target = join(dir, `${item.name}.ai.ts`);
    try {
      await readFile(target);
      continue;
    } catch {
      // missing — scaffold
    }
    const meta = scaffoldAiMeta({
      name: item.name,
      title: item.title,
      description: item.description,
      states: [],
    });
    await mkdir(dir, { recursive: true });
    await writeFile(target, formatAiModule(meta));
    created += 1;
  }

  console.log(`scaffold-ai-meta: created ${created} *.ai.ts files`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
