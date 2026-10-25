import { describe, expect, it } from "vitest";
import { themePacks } from "../providers/theme-provider";

describe("theme packs", () => {
  it("exposes curated modes only", () => {
    expect(themePacks).toEqual({
      forest: ["light", "dark"],
      tide: ["light", "dark"],
      graphite: ["light", "dark"],
      dune: ["light"],
      clay: ["light"],
      ember: ["dark"],
    });
  });

  it("never invents unsupported dual modes", () => {
    expect(themePacks.dune).not.toContain("dark");
    expect(themePacks.clay).not.toContain("dark");
    expect(themePacks.ember).not.toContain("light");
  });
});
