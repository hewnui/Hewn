import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";
import { checkThemeContrast, parseThemeCss } from "../parse-themes.js";

const fixtures = join(dirname(fileURLToPath(import.meta.url)), "../fixtures");

describe("aa-contrast", () => {
  it("flags failing theme token pairs", () => {
    const css = readFileSync(join(fixtures, "theme-bad.css"), "utf8");
    const blocks = parseThemeCss(join(fixtures, "theme-bad.css"), css);
    const findings = checkThemeContrast(blocks);
    expect(findings.length).toBeGreaterThan(0);
    expect(findings.every((f) => f.ruleId === "aa-contrast")).toBe(true);
  });

  it("accepts AA-passing Forest-like pairs", () => {
    const css = readFileSync(join(fixtures, "theme-good.css"), "utf8");
    const blocks = parseThemeCss(join(fixtures, "theme-good.css"), css);
    expect(checkThemeContrast(blocks)).toEqual([]);
  });
});
