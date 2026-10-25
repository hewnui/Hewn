import type { CoreModeColors, Oklch, StructuralTokens, ThemeMode } from "./types";

export function o(l: number, c: number, h: number, alpha?: number): Oklch {
  return alpha === undefined ? { l, c, h } : { l, c, h, alpha };
}

/** Curated pack definition before status families are merged. */
export type PackDef = {
  modes: Partial<Record<ThemeMode, CoreModeColors>>;
  structural: StructuralTokens;
};
