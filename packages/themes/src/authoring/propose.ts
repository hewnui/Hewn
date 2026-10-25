import { formatHex, parseColor } from "./oklch";
import { normalizeOverrideMap } from "./override-map";
import {
  BASE_PACK_IDS,
  SCHEMA_VERSION,
  type BasePackId,
  type OverrideMap,
  type RadiusPreset,
} from "./types";

const HEX_FIND = /#([0-9a-f]{3}|[0-9a-f]{6})\b/gi;
const OKLCH_FIND =
  /oklch\(\s*[0-9.]+\s+[0-9.]+\s+[0-9.]+(?:\s*\/\s*[0-9.]+%?)?\s*\)/gi;

export type ThemeProposal = {
  basePackId: BasePackId;
  accentSeed: string;
  radiusPreset: RadiusPreset;
  notes: string[];
};

const PACK_BY_HUE: { pack: BasePackId; min: number; max: number }[] = [
  { pack: "clay", min: 10, max: 45 },
  { pack: "dune", min: 45, max: 85 },
  { pack: "forest", min: 110, max: 165 },
  { pack: "tide", min: 175, max: 230 },
  { pack: "graphite", min: 230, max: 280 },
  { pack: "ember", min: 0, max: 25 },
];

const PACK_KEYWORDS: { pack: BasePackId; words: string[] }[] = [
  { pack: "forest", words: ["forest", "green", "nature", "leaf"] },
  { pack: "tide", words: ["tide", "ocean", "sea", "blue", "cyan"] },
  { pack: "graphite", words: ["graphite", "slate", "mono", "neutral", "gray", "grey"] },
  { pack: "dune", words: ["dune", "sand", "desert", "beige", "warm"] },
  { pack: "clay", words: ["clay", "terracotta", "earthy", "pottery"] },
  { pack: "ember", words: ["ember", "fire", "night", "dark", "crimson"] },
];

/** Pull hex / oklch color strings from CSS or Tailwind snippets. */
export function extractColorsFromCss(source: string): string[] {
  const found: string[] = [];
  for (const match of source.matchAll(HEX_FIND)) {
    const normalized = normalizeHex(match[0]);
    if (normalized) found.push(normalized);
  }
  for (const match of source.matchAll(OKLCH_FIND)) {
    const parsed = parseColor(match[0]);
    if (parsed) found.push(formatHex(parsed));
  }
  return [...new Set(found)];
}

export function pickAccentFromColors(colors: string[]): string | null {
  let best: { hex: string; score: number } | null = null;
  for (const hex of colors) {
    const color = parseColor(hex);
    if (!color) continue;
    if (color.l < 0.2 || color.l > 0.9) continue;
    const score = color.c * (1 - Math.abs(color.l - 0.55));
    if (!best || score > best.score) best = { hex, score };
  }
  return best?.hex ?? colors[0] ?? null;
}

function normalizeHex(raw: string): string | null {
  const match = raw.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!match?.[1]) return null;
  const hex = match[1];
  const full =
    hex.length === 3
      ? hex
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : hex;
  return `#${full.toLowerCase()}`;
}

export function suggestBasePack(accentSeed: string, hint = ""): BasePackId {
  const lower = hint.toLowerCase();
  for (const entry of PACK_KEYWORDS) {
    if (entry.words.some((w) => lower.includes(w))) return entry.pack;
  }
  const color = parseColor(accentSeed);
  if (!color || color.c < 0.02) return "graphite";
  const h = color.h;
  for (const band of PACK_BY_HUE) {
    if (h >= band.min && h < band.max) return band.pack;
  }
  return "forest";
}

export function suggestRadius(hint = ""): RadiusPreset {
  const lower = hint.toLowerCase();
  if (/\b(sharp|square|brutal)\b/.test(lower)) return "sharp";
  if (/\b(pill|full.?round|capsule)\b/.test(lower)) return "pill";
  if (/\b(rounded|soft.?round|friendly)\b/.test(lower)) return "rounded";
  return "soft";
}

/** Deterministic proposal from colors + optional free-text hint (no LLM). */
export function proposeFromPalette(
  colors: string[],
  hint = "",
): ThemeProposal | null {
  const accent = pickAccentFromColors(colors);
  if (!accent) return null;
  const basePackId = suggestBasePack(accent, hint);
  const radiusPreset = suggestRadius(hint);
  return {
    basePackId,
    accentSeed: accent,
    radiusPreset,
    notes: [
      `Accent from palette (${colors.length} color${colors.length === 1 ? "" : "s"})`,
      `Base pack suggested: ${basePackId}`,
    ],
  };
}

/** Offline prompt migration: keywords + embedded colors; never throws. */
export function proposeFromPrompt(prompt: string): ThemeProposal {
  const colors = extractColorsFromCss(prompt);
  const fromPalette = proposeFromPalette(colors, prompt);
  if (fromPalette) return fromPalette;
  const basePackId = suggestBasePack("#2f6b4f", prompt);
  return {
    basePackId,
    accentSeed: defaultAccentFor(basePackId),
    radiusPreset: suggestRadius(prompt),
    notes: ["No colors in prompt — used keyword defaults"],
  };
}

export function proposalToOverrideMap(
  proposal: ThemeProposal,
  packId = "studio-draft",
): OverrideMap {
  return {
    schemaVersion: SCHEMA_VERSION,
    basePackId: proposal.basePackId,
    packId,
    accentSeed: proposal.accentSeed,
    radiusPreset: proposal.radiusPreset,
  };
}

/** Validate raw LLM/model JSON into a ThemeProposal via override normalize. */
export function parseAiProposal(raw: unknown): ThemeProposal | { error: string } {
  const normalized = normalizeOverrideMap({
    schemaVersion: SCHEMA_VERSION,
    ...(typeof raw === "object" && raw !== null ? raw : {}),
  });
  if (!normalized.ok) {
    return { error: normalized.errors.join("; ") };
  }
  const { basePackId, accentSeed, radiusPreset } = normalized.map;
  if (!accentSeed) return { error: "accentSeed required" };
  if (!BASE_PACK_IDS.includes(basePackId)) {
    return { error: "invalid basePackId" };
  }
  return {
    basePackId,
    accentSeed,
    radiusPreset: radiusPreset ?? "soft",
    notes: ["Validated AI proposal"],
  };
}

function defaultAccentFor(pack: BasePackId): string {
  const map: Record<BasePackId, string> = {
    forest: "#2f6b4f",
    tide: "#2f6f8f",
    graphite: "#4a5568",
    dune: "#b08968",
    clay: "#a65d45",
    ember: "#c45c3e",
  };
  return map[pack];
}
