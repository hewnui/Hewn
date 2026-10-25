import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";
import { lintTokensOnly } from "./tokens-only.js";

const fixtures = join(dirname(fileURLToPath(import.meta.url)), "../fixtures");

function load(name: string) {
  const filePath = join(fixtures, name);
  return {
    filePath,
    content: readFileSync(filePath, "utf8"),
    lines: [],
  };
}

describe("tokens-only", () => {
  it("flags hex, oklch, and Tailwind arbitrary colours", () => {
    const findings = lintTokensOnly(load("tokens-bad.tsx"));
    expect(findings.length).toBeGreaterThanOrEqual(3);
    expect(findings.every((f) => f.ruleId === "tokens-only")).toBe(true);
  });

  it("allows semantic token references", () => {
    expect(lintTokensOnly(load("tokens-good.tsx"))).toEqual([]);
  });
});
