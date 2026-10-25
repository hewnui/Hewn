import type { PackDef } from "./pack-def";
import { DUAL_PACKS } from "./packs-dual";
import { SINGLE_PACKS } from "./packs-single";
import { PACK_STATUS_HUES, statusColors } from "./status-ramps";
import type {
  BasePackId,
  ModeColorTokens,
  StructuralTokens,
  ThemeMode,
} from "./types";

export type ResolvedPackDef = {
  modes: Partial<Record<ThemeMode, ModeColorTokens>>;
  structural: StructuralTokens;
};

function withStatus(id: BasePackId, def: PackDef): ResolvedPackDef {
  const hues = PACK_STATUS_HUES[id];
  const modes: Partial<Record<ThemeMode, ModeColorTokens>> = {};
  for (const [mode, colors] of Object.entries(def.modes) as Array<
    [ThemeMode, NonNullable<PackDef["modes"][ThemeMode]>]
  >) {
    modes[mode] = {
      ...colors,
      ...statusColors(mode, colors.danger, hues),
    };
  }
  return { structural: def.structural, modes };
}

/** Curated pack color bases (mirrors CSS packs), including status families. */
export const BASE_PACKS: Record<BasePackId, ResolvedPackDef> = {
  forest: withStatus("forest", DUAL_PACKS.forest),
  tide: withStatus("tide", DUAL_PACKS.tide),
  graphite: withStatus("graphite", DUAL_PACKS.graphite),
  dune: withStatus("dune", SINGLE_PACKS.dune),
  clay: withStatus("clay", SINGLE_PACKS.clay),
  ember: withStatus("ember", SINGLE_PACKS.ember),
};

export function supportedModes(packId: BasePackId): ThemeMode[] {
  return Object.keys(BASE_PACKS[packId].modes) as ThemeMode[];
}
