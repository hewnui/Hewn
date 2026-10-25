/**
 * Scratch Next.js + Tailwind v4 app that installs button, dialog, and
 * data-table from the local shadcn-schema registry, then production-builds.
 */
import { spawn } from "child_process";
import { existsSync } from "fs";
import { mkdtemp, rm } from "fs/promises";
import { tmpdir } from "os";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { generateRegistry } from "../packages/registry/src/generate";
import { resolveRegistryHomepage } from "../packages/registry/src/site-url";
import { patchAfterInstall } from "./shadcn-e2e/patch-app";
import { scaffoldApp } from "./shadcn-e2e/scaffold";
import { startRegistryServer } from "./shadcn-e2e/server";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const generatedShadcn = join(repoRoot, "packages/registry/generated/shadcn");

function run(
  command: string,
  args: string[],
  cwd: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: process.env,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited ${code}`));
    });
  });
}

async function ensureRegistry(): Promise<void> {
  if (existsSync(join(generatedShadcn, "button.json"))) return;
  const uiSrc = join(repoRoot, "packages/ui/src");
  await generateRegistry({
    componentsRoot: join(uiSrc, "components"),
    docsContentRoot: join(repoRoot, "apps/web/content"),
    outDir: join(repoRoot, "packages/registry/generated"),
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
}

async function main(): Promise<void> {
  await ensureRegistry();
  const server = await startRegistryServer(generatedShadcn);
  const appDir = await mkdtemp(join(tmpdir(), "kp-shadcn-e2e-"));

  try {
    console.log(`shadcn e2e: registry http://127.0.0.1:${server.port}`);
    console.log(`shadcn e2e: app ${appDir}`);
    await scaffoldApp(appDir, server.port);
    await run("npm", ["install"], appDir);
    await run(
      "npx",
      [
        "--yes",
        "shadcn@latest",
        "add",
        "@hewnui/button",
        "@hewnui/dialog",
        "@hewnui/data-table",
        "--overwrite",
        "--yes",
      ],
      appDir,
    );
    await patchAfterInstall(appDir);
    await run("npm", ["run", "build"], appDir);
    console.log("shadcn e2e: build ok");
  } finally {
    await server.close().catch(() => undefined);
    await rm(appDir, { recursive: true, force: true });
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
