import { describe, expect, it } from "vitest";
import { modeToCssVars, modeToPreviewCss } from "./css-vars";
import { derivePack } from "./derive";

describe("modeToCssVars", () => {
  it("emits scoped --kp tokens and color bridges for live preview", () => {
    const result = derivePack({
      schemaVersion: 2,
      basePackId: "tide",
      accentSeed: "#1d4ed8",
      radiusPreset: "rounded",
      packId: "studio-draft",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const mode = result.pack.modes.light;
    expect(mode).toBeDefined();
    const vars = modeToCssVars(mode!);
    expect(vars["--kp-accent"]).toMatch(/^oklch\(/);
    expect(vars["--kp-radius-md"]).toBe("1.15rem");
    expect(vars["--kp-background"]).toMatch(/^oklch\(/);
    expect(vars["--kp-shadow-surface"]).toContain("color-mix");
    expect(vars["--color-background"]).toBe("var(--kp-background)");
    expect(vars["--kp-glass-fill"]).toContain("var(--kp-surface)");
    const css = modeToPreviewCss('[data-studio-specimen]', mode!);
    expect(css).toContain("[data-studio-specimen]");
    expect(css).not.toContain(":root");
    expect(css).toContain("--color-accent: var(--kp-accent);");
  });
});
