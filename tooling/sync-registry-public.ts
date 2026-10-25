import { cp, mkdir, rm } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { generateRegistry } from "../packages/registry/src/generate";
import { resolveRegistryHomepage } from "../packages/registry/src/site-url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const uiSrc = join(repoRoot, "packages/ui/src");
const generatedDir = join(repoRoot, "packages/registry/generated");
const publicDir = join(repoRoot, "apps/web/public/r");

async function main(): Promise<void> {
  const summary = await generateRegistry({
    componentsRoot: join(uiSrc, "components"),
    docsContentRoot: join(repoRoot, "apps/web/content"),
    outDir: generatedDir,
    sharedRoots: ["providers", "styles", "utils", "theme"].map((dir) =>
      join(uiSrc, dir),
    ),
    shadcn: {
      themesRoot: join(repoRoot, "packages/themes/src"),
      motionEntryPath: join(repoRoot, "packages/motion/src/index.ts"),
      homepage: resolveRegistryHomepage(),
      registryName: "hewnui",
    },
  });

  await rm(publicDir, { recursive: true, force: true });
  await mkdir(publicDir, { recursive: true });
  await cp(join(generatedDir, "index.free.json"), join(publicDir, "index.free.json"));
  await cp(join(generatedDir, "index.pro.json"), join(publicDir, "index.pro.json"));
  await cp(join(generatedDir, "foundation.json"), join(publicDir, "foundation.json"));
  await cp(join(generatedDir, "r"), publicDir, { recursive: true });
  await cp(join(generatedDir, "shadcn"), join(publicDir, "shadcn"), {
    recursive: true,
  });

  console.log(
    `registry public: ${summary.free} free items + ${summary.shadcnItems ?? 0} shadcn items mirrored to apps/web/public/r`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
