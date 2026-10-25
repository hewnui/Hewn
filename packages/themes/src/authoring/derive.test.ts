import { describe, expect, it } from "vitest";
import { derivePack } from "./derive";
import { exportPackCss } from "./export-css";
import { normalizeOverrideMap } from "./override-map";
import { SCHEMA_VERSION } from "./types";

describe("normalizeOverrideMap", () => {
  it("accepts a free-tier map and bumps schema", () => {
    const result = normalizeOverrideMap({
      schemaVersion: 0,
      basePackId: "forest",
      accentSeed: "#2f6b4f",
      radiusPreset: "rounded",
      packId: "moss-brand",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.map.schemaVersion).toBe(SCHEMA_VERSION);
    expect(result.map.packId).toBe("moss-brand");
  });

  it("rejects curated pack id collisions", () => {
    const result = normalizeOverrideMap({
      schemaVersion: 1,
      basePackId: "forest",
      packId: "forest",
    });
    expect(result.ok).toBe(false);
  });
});

describe("derivePack + exportPackCss", () => {
  it("derives both forest modes from an accent seed", () => {
    const result = derivePack({
      schemaVersion: 1,
      basePackId: "forest",
      accentSeed: "oklch(0.5 0.12 148)",
      packId: "custom-forest",
      radiusPreset: "sharp",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pack.supportedModes).toEqual(["light", "dark"]);
    expect(result.pack.modes.light?.radiusSm).toBe("0.125rem");
    expect(result.pack.modes.light?.accent.l).toBeGreaterThan(0);
  });

  it("exports drop-in CSS for a single-mode pack", () => {
    const result = derivePack({
      schemaVersion: 1,
      basePackId: "ember",
      accentSeed: "#c45c26",
      packId: "custom-ember",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const css = exportPackCss(result.pack);
    expect(css).toContain('[data-theme="custom-ember"][data-mode="dark"]');
    expect(css).toContain("--kp-accent:");
    expect(css).not.toContain('data-mode="light"');
  });

  it("applies Pro authoring groups", () => {
    const result = derivePack({
      schemaVersion: 2,
      basePackId: "forest",
      packId: "pro-forest",
      neutrals: { surfaceShift: 0.04, chromaScale: 0.8 },
      semantic: { dangerSeed: "#b91c1c" },
      shape: { density: "compact" },
      glass: { tintStrength: 1.3 },
      motion: "snappy",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pack.modes.light?.density).toBe(0.85);
    expect(result.pack.modes.light?.motionDuration).toBe("180ms");
    expect(result.pack.modes.light?.danger.h).toBeGreaterThan(0);
    expect(result.pack.modes.light?.background.l).toBeGreaterThan(
      0.972,
    );
  });
});
