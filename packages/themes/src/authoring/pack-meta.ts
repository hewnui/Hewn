import type { BasePackId } from "./types";

/** Curated pack identity copy — mirrors docs/design-hewn-v2.md. */
export const PACK_IDENTITY: Record<
  BasePackId,
  { label: string; summary: string }
> = {
  forest: {
    label: "Forest",
    summary: "Moss and emerald; grounded organic product UI.",
  },
  tide: {
    label: "Tide",
    summary: "Mineral neutrals and desaturated teal.",
  },
  graphite: {
    label: "Graphite",
    summary: "Technical neutral and restrained steel-blue.",
  },
  dune: {
    label: "Dune",
    summary: "Sand, ochre, soft paper surfaces.",
  },
  clay: {
    label: "Clay",
    summary: "Warm stone and terracotta.",
  },
  ember: {
    label: "Ember",
    summary: "Charcoal and burnt orange.",
  },
};

export const COLOR_ROLES: Record<string, string> = {
  background: "Page and app canvas",
  foreground: "Primary text and icons",
  surface: "Cards, panels, and elevated chrome",
  "surface-raised": "Overlays and nested elevation",
  muted: "Subtle fills and disabled wells",
  "muted-foreground": "Secondary text and captions",
  accent: "Primary actions and focus accents",
  "accent-foreground": "Text/icons on accent",
  border: "Separators and control outlines",
  ring: "Focus ring",
  danger: "Destructive and error states",
  "glass-tint": "Tinted frosted glass material",
};

/** Shared design rules for DESIGN.md and agent skills. */
export const DESIGN_DO = [
  "Use semantic OKLCH tokens (`--kp-*` / `--color-*`); never hard-code theme hues.",
  "Typography: IBM Plex Sans (UI), IBM Plex Mono (code/labels), Space Grotesk only for marketing hero H1 and brand wordmark ≥18px.",
  "Icons: Phosphor. Interactive hit targets ≥40×40px; press feedback `scale(0.96)`.",
  "Motion: animate transform, opacity, and filter; reduced motion always wins.",
  "Radius: concentric scale; panels use `--kp-radius-panel` (never full-pill menus/dialogs).",
  "Glass is a global material — tint, blur, saturation, refraction edge, opaque fallback.",
] as const;

export const DESIGN_DONT = [
  "No purple/lila defaults, neon glow, pure black, Inter, emoji, or generic centered heroes.",
  "Never `transition: all` — list exact properties.",
  "Never `h-screen` for full-height sections — use `min-h-[100dvh]`.",
  "No per-component `glass` prop; material is global.",
  "Do not invent unsupported light/dark combinations for a pack.",
  "Do not put Space Grotesk in UI chrome, forms, or dense product copy.",
] as const;
