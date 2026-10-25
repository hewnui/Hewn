import { applyGlass, applyMotion, applyNeutrals, applySemantic, applyShape } from "./pro-apply";
import { BASE_PACKS, supportedModes } from "./packs";
import { accentSetFromSeed } from "./ramps";
import type {
  OverrideMap,
  RadiusPreset,
  ResolvedMode,
  ResolvedPack,
  StructuralTokens,
  ThemeMode,
} from "./types";

const RADIUS_PRESETS: Record<
  Exclude<RadiusPreset, "soft">,
  Pick<
    StructuralTokens,
    "radiusSm" | "radiusMd" | "radiusLg" | "radiusPanel"
  >
> = {
  sharp: {
    radiusSm: "0.125rem",
    radiusMd: "0.2rem",
    radiusLg: "0.3rem",
    radiusPanel: "0.25rem",
  },
  rounded: {
    radiusSm: "0.85rem",
    radiusMd: "1.15rem",
    radiusLg: "1.5rem",
    radiusPanel: "1.25rem",
  },
  pill: {
    radiusSm: "9999px",
    radiusMd: "9999px",
    radiusLg: "1.5rem",
    radiusPanel: "1.15rem",
  },
};

export type DeriveResult =
  | { ok: true; pack: ResolvedPack }
  | { ok: false; errors: string[] };

export function derivePack(overrides: OverrideMap): DeriveResult {
  const base = BASE_PACKS[overrides.basePackId];
  const modes = supportedModes(overrides.basePackId);
  const adjustments: string[] = [];
  const resolved: Partial<Record<ThemeMode, ResolvedMode>> = {};

  let structural: StructuralTokens = { ...base.structural };
  if (overrides.radiusPreset && overrides.radiusPreset !== "soft") {
    structural = { ...structural, ...RADIUS_PRESETS[overrides.radiusPreset] };
  }
  structural = applyShape(structural, overrides.shape);
  structural = applyMotion(structural, overrides.motion);

  for (const mode of modes) {
    const colors = base.modes[mode];
    if (!colors) continue;

    let next = { ...colors };
    if (overrides.accentSeed) {
      const accent = accentSetFromSeed(overrides.accentSeed, mode);
      if ("error" in accent) {
        return { ok: false, errors: [accent.error] };
      }
      next = {
        ...next,
        accent: accent.set.accent,
        accentForeground: accent.set.accentForeground,
        ring: accent.set.ring,
        glassTint: accent.set.glassTint,
      };
      adjustments.push(...accent.adjustments);
    }

    next = applyNeutrals(next, overrides.neutrals, mode, adjustments);
    const semantic = applySemantic(next, overrides.semantic, mode, adjustments);
    if ("error" in semantic) {
      return { ok: false, errors: [semantic.error] };
    }
    next = applyGlass(semantic, overrides.glass);

    resolved[mode] = {
      ...next,
      ...structural,
      mode,
      colorScheme: mode,
    };
  }

  const packId =
    overrides.packId ??
    `custom-${overrides.basePackId}${overrides.accentSeed ? "-accent" : ""}`;

  return {
    ok: true,
    pack: {
      id: packId,
      basePackId: overrides.basePackId,
      supportedModes: modes,
      modes: resolved,
      adjustments: [...new Set(adjustments)],
    },
  };
}
