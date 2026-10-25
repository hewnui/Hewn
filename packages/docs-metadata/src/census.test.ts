import { describe, expect, it } from "vitest";
import { freeComponentCount } from "./census";

describe("freeComponentCount", () => {
  it("reads the generated free registry length", () => {
    const count = freeComponentCount();
    expect(count).toBeGreaterThan(0);
    // Guard against accidental hard-coded marketing drift in docs tooling.
    expect(Number.isInteger(count)).toBe(true);
  });
});
