import {
  normalizeOverrideMap,
  type BasePackId,
  type OverrideMap,
  type RadiusPreset,
} from "@hewnui/themes/authoring";
import { downloadText } from "@/lib/download-text";
import type { ProOverrides } from "./studio-pro-controls";

export const STORAGE_KEY = "kp-theme-studio";
export const STYLE_ID = "kp-theme-studio-css";
export const DEFAULT_ACCENT = "#2f6b4f";
export const PACK_ID = "studio-draft";

export const DEFAULT_PRO: ProOverrides = {
  neutrals: { surfaceShift: 0, chromaScale: 1 },
  semantic: {},
  shape: { density: "default" },
  glass: { tintStrength: 1 },
  motion: "balanced",
};

export const DEFAULTS: OverrideMap = {
  schemaVersion: 2,
  basePackId: "forest",
  packId: PACK_ID,
  accentSeed: DEFAULT_ACCENT,
  radiusPreset: "soft",
};

export function loadStored(): { free: OverrideMap; pro: ProOverrides } {
  if (typeof window === "undefined") {
    return { free: DEFAULTS, pro: DEFAULT_PRO };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { free: DEFAULTS, pro: DEFAULT_PRO };
    const parsed = normalizeOverrideMap(JSON.parse(raw) as unknown);
    if (!parsed.ok) return { free: DEFAULTS, pro: DEFAULT_PRO };
    return {
      free: { ...parsed.map, packId: PACK_ID },
      pro: {
        neutrals: {
          surfaceShift: parsed.map.neutrals?.surfaceShift ?? 0,
          chromaScale: parsed.map.neutrals?.chromaScale ?? 1,
        },
        semantic: parsed.map.semantic?.dangerSeed
          ? { dangerSeed: parsed.map.semantic.dangerSeed }
          : {},
        shape: { density: parsed.map.shape?.density ?? "default" },
        glass: { tintStrength: parsed.map.glass?.tintStrength ?? 1 },
        motion: parsed.map.motion ?? "balanced",
      },
    };
  } catch {
    return { free: DEFAULTS, pro: DEFAULT_PRO };
  }
}

export function toOverrideMap(
  basePackId: BasePackId,
  accentSeed: string,
  radiusPreset: RadiusPreset,
  pro: ProOverrides,
): OverrideMap {
  const map: OverrideMap = {
    schemaVersion: 2,
    basePackId,
    packId: PACK_ID,
    accentSeed,
    radiusPreset,
    motion: pro.motion,
  };
  if (
    (pro.neutrals.surfaceShift ?? 0) !== 0 ||
    (pro.neutrals.chromaScale ?? 1) !== 1
  ) {
    map.neutrals = pro.neutrals;
  }
  if (pro.semantic.dangerSeed) map.semantic = pro.semantic;
  if (pro.shape.density && pro.shape.density !== "default") {
    map.shape = pro.shape;
  }
  if ((pro.glass.tintStrength ?? 1) !== 1) map.glass = pro.glass;
  return map;
}

export { downloadText };

export function downloadCss(filename: string, css: string) {
  downloadText(filename, css, "text/css;charset=utf-8");
}
