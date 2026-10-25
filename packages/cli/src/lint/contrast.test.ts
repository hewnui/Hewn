import { describe, expect, it } from "vitest";
import { contrastRatio, parseColor, relativeLuminance } from "./contrast.js";

describe("contrast (OKLCH)", () => {
  it("parses oklch and hex", () => {
    expect(parseColor("oklch(0.5 0.1 40)")).toMatchObject({
      l: 0.5,
      c: 0.1,
      h: 40,
    });
    expect(parseColor("#ffffff")).toMatchObject({ l: expect.any(Number) });
  });

  it("computes AA-passing black on white", () => {
    const white = parseColor("#ffffff")!;
    const black = parseColor("#000000")!;
    expect(contrastRatio(black, white)).toBeGreaterThan(4.5);
    expect(relativeLuminance(white)).toBeGreaterThan(0.9);
  });

  it("flags near-white on white as failing AA", () => {
    const bg = parseColor("oklch(0.98 0 0)")!;
    const fg = parseColor("oklch(0.9 0 0)")!;
    expect(contrastRatio(fg, bg)).toBeLessThan(4.5);
  });
});
