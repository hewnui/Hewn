import { describe, expect, it } from "vitest";
import { contrastRatio } from "./oklch";
import { BASE_PACKS } from "./packs";
import { PACK_STATUS_HUES, statusColors } from "./status-ramps";
import type { BasePackId, ThemeMode } from "./types";

describe("statusColors", () => {
  it("gives every curated pack status solid pairs ≥ 4.5:1", () => {
    for (const id of Object.keys(BASE_PACKS) as BasePackId[]) {
      const pack = BASE_PACKS[id];
      for (const mode of Object.keys(pack.modes) as ThemeMode[]) {
        const colors = pack.modes[mode]!;
        for (const kind of ["danger", "success", "warning", "info"] as const) {
          const fg =
            kind === "danger"
              ? colors.dangerForeground
              : kind === "success"
                ? colors.successForeground
                : kind === "warning"
                  ? colors.warningForeground
                  : colors.infoForeground;
          const base =
            kind === "danger"
              ? colors.danger
              : kind === "success"
                ? colors.success
                : kind === "warning"
                  ? colors.warning
                  : colors.info;
          expect(
            contrastRatio(fg, base),
            `${id} ${mode} ${kind}`,
          ).toBeGreaterThanOrEqual(4.5);
        }
      }
    }
  });

  it("derives pack-character hues from PACK_STATUS_HUES", () => {
    const forest = statusColors("light", { l: 0.56, c: 0.17, h: 27 }, PACK_STATUS_HUES.forest);
    expect(forest.success.h).toBe(148);
    expect(forest.warning.h).toBe(78);
    expect(forest.info.h).toBe(220);
  });
});
