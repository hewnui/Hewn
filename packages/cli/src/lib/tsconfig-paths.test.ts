import { mkdir, mkdtemp, rm, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  aliasForRoot,
  findConfigPath,
  readTsconfigPaths,
} from "./tsconfig-paths.js";

let dir: string;

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "hewn-tsconfig-"));
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

describe("readTsconfigPaths", () => {
  it("returns empty without a config file", () => {
    expect(readTsconfigPaths(dir)).toEqual({});
    expect(findConfigPath(dir)).toBeNull();
  });

  it("reads jsconfig.json when tsconfig is absent", async () => {
    await writeFile(
      join(dir, "jsconfig.json"),
      JSON.stringify({
        compilerOptions: { paths: { "@/*": ["./src/*"] } },
      }),
    );
    expect(readTsconfigPaths(dir)).toEqual({ "@/*": ["./src/*"] });
  });

  it("child paths override extended parent paths", async () => {
    await writeFile(
      join(dir, "tsconfig.base.json"),
      JSON.stringify({
        compilerOptions: { paths: { "@/*": ["./src/*"] } },
      }),
    );
    await writeFile(
      join(dir, "tsconfig.json"),
      JSON.stringify({
        extends: "./tsconfig.base.json",
        compilerOptions: { paths: { "~/*": ["./src/*"] } },
      }),
    );
    expect(readTsconfigPaths(dir)).toEqual({
      "@/*": ["./src/*"],
      "~/*": ["./src/*"],
    });
  });
});

describe("aliasForRoot", () => {
  it("maps src components root through @/* → ./src/*", () => {
    expect(
      aliasForRoot("src/components/hewn", { "@/*": ["./src/*"] }),
    ).toBe("@/components/hewn");
  });

  it("maps root components through @/* → ./*", () => {
    expect(
      aliasForRoot("components/hewn", { "@/*": ["./*"] }),
    ).toBe("@/components/hewn");
  });

  it("returns undefined when paths do not cover the root", () => {
    expect(
      aliasForRoot("src/components/hewn", { "~/*": ["./lib/*"] }),
    ).toBeUndefined();
  });
});

describe("extends from nested path", () => {
  it("resolves relative extends without .json suffix", async () => {
    await mkdir(join(dir, "configs"), { recursive: true });
    await writeFile(
      join(dir, "configs", "base.json"),
      JSON.stringify({
        compilerOptions: { paths: { "@/*": ["./src/*"] } },
      }),
    );
    await writeFile(
      join(dir, "tsconfig.json"),
      JSON.stringify({ extends: "./configs/base" }),
    );
    expect(readTsconfigPaths(dir)["@/*"]).toEqual(["./src/*"]);
  });
});
