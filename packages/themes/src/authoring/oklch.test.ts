import { describe, expect, it } from "vitest";
import { contrastRatio, formatOklch, parseColor } from "./oklch";
import { accentSetFromSeed } from "./ramps";

describe("oklch", () => {
  it("parses and formats oklch strings", () => {
    const color = parseColor("oklch(0.5 0.1 148)");
    expect(color).toMatchObject({ l: 0.5, c: 0.1, h: 148 });
    expect(formatOklch(color!)).toBe("oklch(0.5 0.1 148)");
  });

  it("parses hex seeds", () => {
    const color = parseColor("#2f6b4f");
    expect(color).not.toBeNull();
    expect(color!.h).toBeGreaterThan(100);
    expect(color!.h).toBeLessThan(180);
  });

  it("computes contrast ratios", () => {
    const white = parseColor("oklch(1 0 0)")!;
    const black = parseColor("oklch(0 0 0)")!;
    expect(contrastRatio(white, black)).toBeGreaterThan(20);
  });
});

describe("accentSetFromSeed", () => {
  it("returns AA-safe accent foreground", () => {
    const result = accentSetFromSeed("#2f6b4f", "light");
    expect("set" in result).toBe(true);
    if (!("set" in result)) return;
    expect(
      contrastRatio(result.set.accent, result.set.accentForeground),
    ).toBeGreaterThanOrEqual(4.5);
  });
});
