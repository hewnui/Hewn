import { mkdtemp, readFile, rm } from "fs/promises";
import { existsSync } from "fs";
import { tmpdir } from "os";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { generateRegistry } from "./generate";

const fixtures = join(dirname(fileURLToPath(import.meta.url)), "__fixtures__");

let outDir: string;

beforeEach(async () => {
  outDir = await mkdtemp(join(tmpdir(), "hewn-registry-"));
});

afterEach(async () => {
  await rm(outDir, { recursive: true, force: true });
});

describe("generateRegistry", () => {
  it("emits free item JSON, excludes pro source, and indexes both tiers", async () => {
    const summary = await generateRegistry({
      componentsRoot: join(fixtures, "components"),
      docsContentRoot: join(fixtures, "content"),
      outDir,
      sharedRoots: [
        join(fixtures, "shared/utils"),
        join(fixtures, "shared/providers"),
      ],
    });

    expect(summary).toMatchObject({ total: 2, free: 1, pro: 1, foundationFiles: 2 });

    const foundation = JSON.parse(
      await readFile(join(outDir, "foundation.json"), "utf8"),
    ) as {
      files: { path: string }[];
      jsxFiles: { path: string; content: string }[];
    };
    expect(foundation.files.map((file) => file.path)).toEqual([
      "utils/cn.ts",
      "providers/motion-provider.tsx",
    ]);
    expect(foundation.jsxFiles.map((file) => file.path)).toEqual([
      "utils/cn.js",
      "providers/motion-provider.jsx",
    ]);

    const alpha = JSON.parse(
      await readFile(join(outDir, "r", "alpha.json"), "utf8"),
    ) as {
      name: string;
      internalDependencies: string[];
      sharedDependencies: string[];
      files: { path: string }[];
      jsxFiles: { path: string; content: string }[];
    };
    expect(alpha.name).toBe("alpha");
    expect(alpha.internalDependencies).toEqual(["beta"]);
    expect(alpha.sharedDependencies).toEqual(["utils/cn"]);
    expect(alpha.files.map((file) => file.path)).toEqual([
      "alpha.tsx",
      "index.ts",
    ]);
    expect(alpha.jsxFiles.map((file) => file.path)).toEqual([
      "alpha.jsx",
      "index.js",
    ]);
    expect(alpha.jsxFiles[0]?.content).toContain("<div");
    expect(alpha.jsxFiles[0]?.content).not.toContain("BetaProps");

    expect(existsSync(join(outDir, "r", "beta.json"))).toBe(false);

    const freeIndex = JSON.parse(
      await readFile(join(outDir, "index.free.json"), "utf8"),
    ) as { items: { name: string; url: string; files?: unknown }[] };
    expect(freeIndex.items).toHaveLength(1);
    expect(freeIndex.items[0]).toMatchObject({
      name: "alpha",
      url: "/r/alpha.json",
    });
    expect(freeIndex.items[0]?.files).toBeUndefined();

    const proIndex = JSON.parse(
      await readFile(join(outDir, "index.pro.json"), "utf8"),
    ) as { items: { name: string; url?: string; files?: unknown }[] };
    expect(proIndex.items).toHaveLength(1);
    expect(proIndex.items[0]?.name).toBe("beta");
    expect(proIndex.items[0]?.url).toBeUndefined();
    expect(proIndex.items[0]?.files).toBeUndefined();
  });

  it("fails with collected errors for missing metadata and name mismatch", async () => {
    const attempt = generateRegistry({
      componentsRoot: join(fixtures, "components-bad"),
      docsContentRoot: join(fixtures, "content"),
      outDir,
    });

    await expect(attempt).rejects.toThrow(/gamma: missing \*\.registry\.ts/);
    await expect(attempt).rejects.toThrow(
      /delta: metadata name "delta-x" must match the folder name/,
    );
  });
});
