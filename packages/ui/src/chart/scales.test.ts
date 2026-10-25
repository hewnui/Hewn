import { describe, expect, it } from "vitest";
import { createBandScales, createLinearScales, yDomain } from "./scales";

describe("chart scales", () => {
  it("expands flat y domains", () => {
    expect(yDomain([{ x: 1, y: 5 }, { x: 2, y: 5 }])).toEqual([4, 6]);
  });

  it("builds linear scales for numeric x", () => {
    const { xIsNumeric, x, y } = createLinearScales(
      [
        { x: 0, y: 1 },
        { x: 10, y: 5 },
      ],
      { width: 200, height: 100 },
    );
    expect(xIsNumeric).toBe(true);
    expect((x as (v: number) => number | undefined)(0)).toBeDefined();
    expect(y(5)).toBeDefined();
  });

  it("builds band scales for categories", () => {
    const { categories, x } = createBandScales(
      [
        { x: "a", y: 1 },
        { x: "b", y: 2 },
      ],
      { width: 200, height: 100 },
    );
    expect(categories).toEqual(["a", "b"]);
    expect(x("a")).toBeDefined();
  });
});
