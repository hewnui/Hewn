import { mkdir, rm, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  BASE_PACK_IDS,
  exportCuratedThemeFiles,
  THEME_EXPORT_BASENAMES,
  THEME_EXPORT_FORMATS,
} from "../packages/themes/src/authoring/index";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const packageOut = join(repoRoot, "packages/themes/exports");
const publicOut = join(repoRoot, "apps/web/public/themes");

async function writeTree(root: string): Promise<number> {
  await mkdir(root, { recursive: true });
  const files = exportCuratedThemeFiles();
  for (const file of files) {
    const dir = join(root, file.packId);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, file.basename), file.contents);
  }

  const index = {
    generated: true,
    packs: [...BASE_PACK_IDS],
    formats: THEME_EXPORT_FORMATS.map((format) => ({
      id: format.id,
      label: format.label,
      description: format.description,
      tier: format.tier,
      basename: THEME_EXPORT_BASENAMES[format.id],
      pathTemplate: `/themes/{packId}/${THEME_EXPORT_BASENAMES[format.id]}`,
    })),
  };
  await writeFile(
    join(root, "index.json"),
    `${JSON.stringify(index, null, 2)}\n`,
  );
  return files.length;
}

async function main(): Promise<void> {
  await rm(packageOut, { recursive: true, force: true });
  await rm(publicOut, { recursive: true, force: true });
  const count = await writeTree(packageOut);
  await writeTree(publicOut);
  console.log(
    `theme exports: wrote ${count} files × 2 trees (packages/themes/exports + apps/web/public/themes)`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
