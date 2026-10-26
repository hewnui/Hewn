import { mkdir, mkdtemp, rm, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { defaultComponentsRoot, detectProject, detectSrcDir } from "./detect.js";

let dir: string;

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "hewn-cli-"));
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

describe("detectProject", () => {
  it("returns null without package.json", () => {
    expect(detectProject(dir)).toBeNull();
  });

  it("detects a TypeScript project", async () => {
    await writeFile(join(dir, "package.json"), "{}");
    await writeFile(join(dir, "tsconfig.json"), "{}");
    expect(detectProject(dir)).toMatchObject({
      tsx: true,
      packageManager: "npm",
      componentsRoot: "components/hewn",
      hasSrcDir: false,
    });
  });

  it("detects a JavaScript project", async () => {
    await writeFile(join(dir, "package.json"), "{}");
    expect(detectProject(dir)).toMatchObject({ tsx: false });
  });

  it("detects the package manager from lockfiles", async () => {
    await writeFile(join(dir, "package.json"), "{}");
    await writeFile(join(dir, "pnpm-lock.yaml"), "");
    expect(detectProject(dir)?.packageManager).toBe("pnpm");
  });

  it("detects Next 16 src/ app with @/* → ./src/*", async () => {
    await writeFile(join(dir, "package.json"), "{}");
    await mkdir(join(dir, "src", "app"), { recursive: true });
    await writeFile(
      join(dir, "tsconfig.json"),
      `{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
`,
    );

    const info = detectProject(dir);
    expect(detectSrcDir(dir)).toBe(true);
    expect(defaultComponentsRoot(true)).toBe("src/components/hewn");
    expect(info).toMatchObject({
      tsx: true,
      hasSrcDir: true,
      componentsRoot: "src/components/hewn",
      alias: "@/components/hewn",
    });
  });

  it("detects a root-layout app (no src/) with @/* → ./*", async () => {
    await writeFile(join(dir, "package.json"), "{}");
    await mkdir(join(dir, "app"), { recursive: true });
    await writeFile(
      join(dir, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: { paths: { "@/*": ["./*"] } },
      }),
    );

    const info = detectProject(dir);
    expect(info).toMatchObject({
      hasSrcDir: false,
      componentsRoot: "components/hewn",
      alias: "@/components/hewn",
    });
  });

  it("handles no tsconfig (defaults root, no alias)", async () => {
    await writeFile(join(dir, "package.json"), "{}");
    await mkdir(join(dir, "src", "components"), { recursive: true });

    const info = detectProject(dir);
    expect(info).toMatchObject({
      tsx: false,
      hasSrcDir: true,
      componentsRoot: "src/components/hewn",
    });
    expect(info?.alias).toBeUndefined();
  });

  it("follows tsconfig extends and JSONC comments for paths", async () => {
    await writeFile(join(dir, "package.json"), "{}");
    await mkdir(join(dir, "src", "app"), { recursive: true });
    await writeFile(
      join(dir, "tsconfig.base.json"),
      `{
  // shared
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
`,
    );
    await writeFile(
      join(dir, "tsconfig.json"),
      `{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    /* local */
    "strict": true
  }
}
`,
    );

    expect(detectProject(dir)).toMatchObject({
      componentsRoot: "src/components/hewn",
      alias: "@/components/hewn",
    });
  });
});
