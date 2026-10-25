import { formatOklch } from "./oklch";
import type { ResolvedMode, ResolvedPack, ThemeMode } from "./types";

export type TokenEntry = { name: string; value: string; kind: "color" | "number" | "string" };

export function modeOrder(pack: ResolvedPack): ThemeMode[] {
  const order: ThemeMode[] = ["light", "dark"];
  return order.filter((mode) => pack.modes[mode]);
}

export function colorEntries(mode: ResolvedMode): TokenEntry[] {
  return [
    { name: "background", value: formatOklch(mode.background), kind: "color" },
    { name: "foreground", value: formatOklch(mode.foreground), kind: "color" },
    { name: "surface", value: formatOklch(mode.surface), kind: "color" },
    { name: "surface-raised", value: formatOklch(mode.surfaceRaised), kind: "color" },
    { name: "muted", value: formatOklch(mode.muted), kind: "color" },
    { name: "muted-foreground", value: formatOklch(mode.mutedForeground), kind: "color" },
    { name: "accent", value: formatOklch(mode.accent), kind: "color" },
    { name: "accent-foreground", value: formatOklch(mode.accentForeground), kind: "color" },
    { name: "border", value: formatOklch(mode.border), kind: "color" },
    { name: "ring", value: formatOklch(mode.ring), kind: "color" },
    { name: "danger", value: formatOklch(mode.danger), kind: "color" },
    { name: "danger-foreground", value: formatOklch(mode.dangerForeground), kind: "color" },
    { name: "danger-subtle", value: formatOklch(mode.dangerSubtle), kind: "color" },
    { name: "danger-border", value: formatOklch(mode.dangerBorder), kind: "color" },
    { name: "success", value: formatOklch(mode.success), kind: "color" },
    { name: "success-foreground", value: formatOklch(mode.successForeground), kind: "color" },
    { name: "success-subtle", value: formatOklch(mode.successSubtle), kind: "color" },
    { name: "success-border", value: formatOklch(mode.successBorder), kind: "color" },
    { name: "warning", value: formatOklch(mode.warning), kind: "color" },
    { name: "warning-foreground", value: formatOklch(mode.warningForeground), kind: "color" },
    { name: "warning-subtle", value: formatOklch(mode.warningSubtle), kind: "color" },
    { name: "warning-border", value: formatOklch(mode.warningBorder), kind: "color" },
    { name: "info", value: formatOklch(mode.info), kind: "color" },
    { name: "info-foreground", value: formatOklch(mode.infoForeground), kind: "color" },
    { name: "info-subtle", value: formatOklch(mode.infoSubtle), kind: "color" },
    { name: "info-border", value: formatOklch(mode.infoBorder), kind: "color" },
    { name: "glass-tint", value: formatOklch(mode.glassTint), kind: "color" },
  ];
}

export function structuralEntries(mode: ResolvedMode): TokenEntry[] {
  return [
    { name: "radius-sm", value: mode.radiusSm, kind: "string" },
    { name: "radius-md", value: mode.radiusMd, kind: "string" },
    { name: "radius-lg", value: mode.radiusLg, kind: "string" },
    { name: "radius-panel", value: mode.radiusPanel, kind: "string" },
    { name: "density", value: String(mode.density), kind: "number" },
    { name: "motion-duration", value: mode.motionDuration, kind: "string" },
    { name: "motion-stiffness", value: String(mode.motionStiffness), kind: "number" },
    { name: "motion-damping", value: String(mode.motionDamping), kind: "number" },
  ];
}

export function primaryMode(pack: ResolvedPack): ResolvedMode {
  const modes = modeOrder(pack);
  return pack.modes[modes[0]!]!;
}
