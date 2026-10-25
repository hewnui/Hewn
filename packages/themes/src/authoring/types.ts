export const SCHEMA_VERSION = 2 as const;

/** Flip when monetization lands — Studio UI reads this stub gate. */
export const PRO_AUTHORING_UNLOCKED = false;

export const BASE_PACK_IDS = [
  "forest",
  "tide",
  "graphite",
  "dune",
  "clay",
  "ember",
] as const;

export type BasePackId = (typeof BASE_PACK_IDS)[number];
export type ThemeMode = "light" | "dark";
export type RadiusPreset = "sharp" | "soft" | "rounded" | "pill";

export type Oklch = {
  l: number;
  c: number;
  h: number;
  alpha?: number;
};

/** Core semantic surfaces + accent + danger seed (curated per pack mode). */
export type CoreModeColors = {
  background: Oklch;
  foreground: Oklch;
  surface: Oklch;
  surfaceRaised: Oklch;
  muted: Oklch;
  mutedForeground: Oklch;
  accent: Oklch;
  accentForeground: Oklch;
  border: Oklch;
  ring: Oklch;
  danger: Oklch;
  glassTint: Oklch;
};

/** Status families — base + foreground / subtle / border variants. */
export type StatusModeColors = {
  dangerForeground: Oklch;
  dangerSubtle: Oklch;
  dangerBorder: Oklch;
  success: Oklch;
  successForeground: Oklch;
  successSubtle: Oklch;
  successBorder: Oklch;
  warning: Oklch;
  warningForeground: Oklch;
  warningSubtle: Oklch;
  warningBorder: Oklch;
  info: Oklch;
  infoForeground: Oklch;
  infoSubtle: Oklch;
  infoBorder: Oklch;
};

/** Full semantic color tokens authored per mode. */
export type ModeColorTokens = CoreModeColors & StatusModeColors;

export type StructuralTokens = {
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  radiusPanel: string;
  density: number;
  motionDuration: string;
  motionStiffness: number;
  motionDamping: number;
};

export type ResolvedMode = ModeColorTokens & StructuralTokens & {
  mode: ThemeMode;
  colorScheme: ThemeMode;
};

export type ResolvedPack = {
  id: string;
  basePackId: BasePackId;
  supportedModes: readonly ThemeMode[];
  modes: Partial<Record<ThemeMode, ResolvedMode>>;
  adjustments: string[];
};

export type DensityPreset = "compact" | "default" | "comfortable";
export type MotionCharacter = "snappy" | "balanced" | "soft";

/** Pro — neutrals / surfaces (constrained bias, not free-form tokens). */
export type NeutralOverrides = {
  /** Lightness shift −0.08…0.08 applied to surfaces. */
  surfaceShift?: number;
  /** Chroma multiplier 0.5…1.5 for tinted neutrals. */
  chromaScale?: number;
};

/** Pro — semantic colors beyond accent. */
export type SemanticOverrides = {
  /** Danger seed as `oklch(...)` or `#rrggbb`. */
  dangerSeed?: string;
};

/** Pro — density (radius stays free via radiusPreset). */
export type ShapeOverrides = {
  density?: DensityPreset;
};

/** Pro — glass tint strength. */
export type GlassOverrides = {
  /** Alpha multiplier 0.5…1.5 on glassTint. */
  tintStrength?: number;
};

/**
 * Override map — free fields + optional Pro groups.
 * schemaVersion migrations keep older maps valid.
 */
export type OverrideMap = {
  schemaVersion: typeof SCHEMA_VERSION | number;
  basePackId: BasePackId;
  /** Pack id for CSS `[data-theme="…"]` — kebab-case. */
  packId?: string;
  /** Accent seed as `oklch(...)` or `#rrggbb`. */
  accentSeed?: string;
  radiusPreset?: RadiusPreset;
  neutrals?: NeutralOverrides;
  semantic?: SemanticOverrides;
  shape?: ShapeOverrides;
  glass?: GlassOverrides;
  motion?: MotionCharacter;
};
