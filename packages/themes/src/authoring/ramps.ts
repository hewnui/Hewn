import { contrastForeground, parseColor } from "./oklch";
import type { Oklch, ThemeMode } from "./types";

export type AccentSet = {
  accent: Oklch;
  accentForeground: Oklch;
  ring: Oklch;
  glassTint: Oklch;
};

export function accentSetFromSeed(
  seedInput: string,
  mode: ThemeMode,
): { set: AccentSet; adjustments: string[] } | { error: string } {
  const seed = parseColor(seedInput);
  if (!seed) {
    return { error: `invalid accent seed: "${seedInput}"` };
  }

  const adjustments: string[] = [];
  const accent: Oklch =
    mode === "dark"
      ? { ...seed, l: Math.min(0.82, Math.max(0.62, seed.l + 0.12)) }
      : { ...seed, l: Math.min(0.62, Math.max(0.42, seed.l)) };

  if (accent.l !== seed.l) {
    adjustments.push(
      `${mode} accent lightness clamped to ${accent.l.toFixed(2)} for surface contrast`,
    );
  }

  // Dark packs use light accents; prefer light ink so AA holds without
  // brightening the accent beyond the pack character.
  const preferFg: Oklch = {
    l: 0.98,
    c: Math.min(0.02, accent.c),
    h: accent.h,
  };
  const fg = contrastForeground(accent, preferFg);
  if (fg.adjusted) {
    adjustments.push(
      `${mode} accent-foreground adjusted to meet WCAG AA against accent`,
    );
  }

  const ring = { ...accent, c: Math.min(0.14, accent.c + 0.01) };
  const glassTint: Oklch = {
    ...accent,
    l: mode === "dark" ? Math.min(0.7, accent.l) : Math.min(0.82, accent.l + 0.15),
    alpha: mode === "dark" ? 0.24 : 0.28,
  };

  return {
    set: {
      accent,
      accentForeground: fg.color,
      ring,
      glassTint,
    },
    adjustments,
  };
}
