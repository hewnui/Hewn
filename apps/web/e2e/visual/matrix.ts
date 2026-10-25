/** Valid theme × mode pairs — Dune/Clay are light-only; Ember is dark-only. */
export const themeModeMatrix = [
  { theme: "forest", mode: "light" },
  { theme: "forest", mode: "dark" },
  { theme: "tide", mode: "light" },
  { theme: "tide", mode: "dark" },
  { theme: "graphite", mode: "light" },
  { theme: "graphite", mode: "dark" },
  { theme: "dune", mode: "light" },
  { theme: "clay", mode: "light" },
  { theme: "ember", mode: "dark" },
] as const;

export type ThemeModePair = (typeof themeModeMatrix)[number];

export const galleryWidths = [320, 768, 1440] as const;

export const snapshotOpts = {
  animations: "disabled" as const,
  caret: "hide" as const,
  // ~2% pixel budget absorbs anti-aliasing / subpixel font raster drift.
  maxDiffPixelRatio: 0.02,
  threshold: 0.2,
  timeout: 20_000,
};
