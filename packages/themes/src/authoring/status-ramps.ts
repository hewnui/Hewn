import type { BasePackId, Oklch, StatusModeColors, ThemeMode } from "./types";

/** Pack-character hues for semantic status families (not accent clones). */
export const PACK_STATUS_HUES: Record<
  BasePackId,
  { success: number; warning: number; info: number }
> = {
  forest: { success: 148, warning: 78, info: 220 },
  tide: { success: 165, warning: 75, info: 230 },
  graphite: { success: 150, warning: 75, info: 250 },
  dune: { success: 140, warning: 70, info: 230 },
  clay: { success: 145, warning: 55, info: 230 },
  ember: { success: 145, warning: 70, info: 230 },
};

function o(l: number, c: number, h: number, alpha?: number): Oklch {
  return alpha === undefined ? { l, c, h } : { l, c, h, alpha };
}

function family(
  mode: ThemeMode,
  hue: number,
  kind: "success" | "warning" | "info" | "danger",
  dangerSeed?: Oklch,
): { base: Oklch; fg: Oklch; subtle: Oklch; border: Oklch } {
  const dark = mode === "dark";

  if (kind === "danger" && dangerSeed) {
    const base = dangerSeed;
    return {
      base,
      fg: o(0.985, 0.01, base.h),
      subtle: dark ? o(0.32, 0.05, base.h) : o(0.94, 0.035, base.h),
      border: dark ? o(0.72, 0.1, base.h, 0.4) : o(0.56, 0.12, base.h, 0.4),
    };
  }

  if (kind === "warning") {
    const base = dark ? o(0.78, 0.12, hue) : o(0.75, 0.14, hue);
    const fg = dark ? o(0.22, 0.04, hue) : o(0.25, 0.05, hue);
    return {
      base,
      fg,
      subtle: dark ? o(0.34, 0.04, hue) : o(0.94, 0.04, hue),
      border: dark ? o(0.78, 0.1, hue, 0.4) : o(0.72, 0.12, hue, 0.4),
    };
  }

  if (kind === "info") {
    const base = dark ? o(0.72, 0.1, hue) : o(0.52, 0.11, hue);
    return {
      base,
      fg: o(0.985, 0.01, hue),
      subtle: dark ? o(0.32, 0.035, hue) : o(0.94, 0.03, hue),
      border: dark ? o(0.72, 0.08, hue, 0.4) : o(0.52, 0.09, hue, 0.4),
    };
  }

  // success — tide dark needs a slightly deeper base for light-fg AA
  const successL = dark ? (hue === 165 ? 0.71 : 0.72) : 0.55;
  const base = dark ? o(successL, 0.14, hue) : o(0.55, 0.15, hue);
  return {
    base,
    fg: o(0.985, 0.01, hue),
    subtle: dark ? o(0.32, 0.045, hue) : o(0.94, 0.035, hue),
    border: dark ? o(0.72, 0.1, hue, 0.4) : o(0.55, 0.12, hue, 0.4),
  };
}

/** Derive danger/success/warning/info (+ fg/subtle/border) for a mode. */
export function statusColors(
  mode: ThemeMode,
  danger: Oklch,
  hues: { success: number; warning: number; info: number },
): StatusModeColors {
  const dangerSet = family(mode, danger.h, "danger", danger);
  const success = family(mode, hues.success, "success");
  const warning = family(mode, hues.warning, "warning");
  const info = family(mode, hues.info, "info");

  return {
    dangerForeground: dangerSet.fg,
    dangerSubtle: dangerSet.subtle,
    dangerBorder: dangerSet.border,
    success: success.base,
    successForeground: success.fg,
    successSubtle: success.subtle,
    successBorder: success.border,
    warning: warning.base,
    warningForeground: warning.fg,
    warningSubtle: warning.subtle,
    warningBorder: warning.border,
    info: info.base,
    infoForeground: info.fg,
    infoSubtle: info.subtle,
    infoBorder: info.border,
  };
}
