import { mkdir, writeFile, rm } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  exportCuratedFigmaKit,
  exportCuratedStickerSheet,
} from "../packages/themes/src/authoring/figma-kit";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(repoRoot, "packages/themes/figma");
const publicDir = join(repoRoot, "apps/web/public/figma");

async function writeKit(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "hewn.tokens.json"), exportCuratedFigmaKit());
  await writeFile(join(dir, "sticker-sheet.svg"), exportCuratedStickerSheet());
  await writeFile(
    join(dir, "README.md"),
    `# Hewn Figma kit

Generated from curated theme packs — do not edit by hand.

## Files

- \`hewn.tokens.json\` — Tokens Studio document (six packs × modes + structural)
- \`sticker-sheet.svg\` — surfaces / button / input reference sheet

## Import

1. Install [Tokens Studio](https://tokens.studio/) in Figma
2. Tokens → Import → choose \`hewn.tokens.json\`
3. Create variables from themes, then style the sticker sheet components

Regenerate: \`pnpm --filter @hewnui/themes generate\`
`,
  );
}

async function main(): Promise<void> {
  await writeKit(outDir);
  await rm(publicDir, { recursive: true, force: true });
  await writeKit(publicDir);
  console.log(`figma kit: wrote packages/themes/figma + apps/web/public/figma`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
