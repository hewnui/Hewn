import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";
import { loadTypescript } from "../typescript.js";
import { lintLabelledOverlays } from "./labelled-overlays.js";

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

describe("labelled-overlays", () => {
  it("flags Dialog without an accessible name", () => {
    const findings = lintLabelledOverlays(load("overlay-bad.tsx"), ts);
    expect(findings).toHaveLength(1);
    expect(findings[0]?.ruleId).toBe("labelled-overlays");
  });

  it("accepts title prop and aria-label", () => {
    expect(lintLabelledOverlays(load("overlay-good.tsx"), ts)).toEqual([]);
  });
});
