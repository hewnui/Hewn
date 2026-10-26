import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { generateRegistry } from "../packages/registry/src/generate";
import { resolveRegistryHomepage } from "../packages/registry/src/site-url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

async function main(): Promise<void> {
  const uiSrc = join(repoRoot, "packages/ui/src");
  const summary = await generateRegistry({
    componentsRoot: join(uiSrc, "components"),
    docsContentRoot: join(repoRoot, "apps/web/content"),
    outDir: join(repoRoot, "packages/registry/generated"),
    sharedRoots: ["providers", "styles", "utils", "theme", "chart"].map((dir) =>
      join(uiSrc, dir),
    ),
    shadcn: {
      themesRoot: join(repoRoot, "packages/themes/src"),
      motionEntryPath: join(repoRoot, "packages/motion/src/index.ts"),
      homepage: resolveRegistryHomepage(),
      registryName: "hewnui",
    },
  });

  const shadcnNote =
    summary.shadcnItems !== undefined
      ? `, shadcn ${summary.shadcnItems} items (${summary.shadcnFilesEmitted} files)`
      : "";
  console.log(
    `registry: ${summary.total} items (${summary.free} free, ${summary.pro} pro), ${summary.filesEmitted} files + ${summary.foundationFiles} foundation files emitted${shadcnNote}`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
