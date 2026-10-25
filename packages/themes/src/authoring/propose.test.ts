import { describe, expect, it } from "vitest";
import {
  extractColorsFromCss,
  parseAiProposal,
  proposeFromPalette,
  proposeFromPrompt,
} from "./propose";

describe("propose", () => {
  it("extracts hex and oklch from CSS", () => {
    const colors = extractColorsFromCss(
      `--accent: #2f6b4f; --bg: oklch(0.95 0.02 148); color: #abc;`,
    );
    expect(colors).toContain("#2f6b4f");
    expect(colors.some((c) => c.startsWith("#"))).toBe(true);
  });

  it("proposes forest from green palette", () => {
    const proposal = proposeFromPalette(["#2f6b4f", "#e8f0eb"]);
    expect(proposal).not.toBeNull();
    expect(proposal!.basePackId).toBe("forest");
    expect(proposal!.accentSeed).toBe("#2f6b4f");
  });

  it("uses prompt keywords when no colors", () => {
    const proposal = proposeFromPrompt("ember night dashboard, sharp corners");
    expect(proposal.basePackId).toBe("ember");
    expect(proposal.radiusPreset).toBe("sharp");
  });

  it("validates AI JSON through normalize", () => {
    const ok = parseAiProposal({
      basePackId: "tide",
      accentSeed: "#2f6f8f",
      radiusPreset: "rounded",
    });
    expect("error" in ok).toBe(false);
    if ("error" in ok) return;
    expect(ok.basePackId).toBe("tide");
    expect(ok.radiusPreset).toBe("rounded");
  });

  it("rejects invalid AI JSON", () => {
    const bad = parseAiProposal({ basePackId: "not-a-pack", accentSeed: "#000" });
    expect("error" in bad).toBe(true);
  });
});
