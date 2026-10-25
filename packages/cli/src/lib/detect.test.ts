import { mkdtemp, rm, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { detectProject } from "./detect.js";

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
    expect(detectProject(dir)).toMatchObject({ tsx: true, packageManager: "npm" });
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
});
