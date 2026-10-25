import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";
import { loadTypescript } from "../typescript.js";
import { lintDestructiveConfirms } from "./destructive-confirms.js";

const fixtures = join(dirname(fileURLToPath(import.meta.url)), "../fixtures");
const ts = loadTypescript(join(fixtures, "../.."));

function load(name: string) {
  const filePath = join(fixtures, name);
  return {
    filePath,
    content: readFileSync(filePath, "utf8"),
    lines: [],
  };
}

describe("destructive-confirms", () => {
  it("warns when danger buttons delete without confirm", () => {
    const findings = lintDestructiveConfirms(load("destructive-bad.tsx"), ts);
    expect(findings).toHaveLength(1);
    expect(findings[0]?.severity).toBe("warn");
    expect(findings[0]?.ruleId).toBe("destructive-confirms");
  });

  it("accepts delete inside a Dialog confirm pattern", () => {
    expect(
      lintDestructiveConfirms(load("destructive-good.tsx"), ts),
    ).toEqual([]);
  });
});
