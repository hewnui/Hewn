import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";
import {
  applyReducedMotionFixes,
  lintReducedMotion,
} from "./reduced-motion.js";

const fixtures = join(dirname(fileURLToPath(import.meta.url)), "../fixtures");

function load(name: string) {
  const filePath = join(fixtures, name);
  return {
    filePath,
    content: readFileSync(filePath, "utf8"),
    lines: [],
  };
}

describe("reduced-motion", () => {
  it("flags transition-all and Motion without a reduced-motion path", () => {
    const findings = lintReducedMotion(load("motion-bad.tsx"));
    expect(findings.some((f) => f.fixable)).toBe(true);
    expect(findings.some((f) => f.message.includes("reduced-motion"))).toBe(
      true,
    );
  });

  it("accepts useReducedMotion", () => {
    expect(lintReducedMotion(load("motion-good.tsx"))).toEqual([]);
  });

  it("fixes transition-all safely", () => {
    const src = 'className="transition-all opacity-100"';
    const { content, fixed } = applyReducedMotionFixes(src);
    expect(fixed).toBe(1);
    expect(content).toContain("transition-[color,background-color");
    expect(content).not.toContain("transition-all");
  });
});
