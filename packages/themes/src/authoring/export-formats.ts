import { exportDesignMd } from "./export-design-md";
import { exportDtcg } from "./export-dtcg";
import { exportTailwindTheme } from "./export-css";
import { exportSkillMd } from "./export-skill";
import type { ResolvedPack } from "./types";

/**
 * Export tier marker — today every curated Theme Lab format is `free`.
 * Advanced Studio formats (Style Dictionary, Figma) can flip to `pro` later
 * without changing call sites; consumers must not gate on this yet.
 */
export type ExportTier = "free" | "pro";

export type ThemeExportFormatId =
  | "design-md"
  | "dtcg"
  | "tailwind-theme"
  | "skill-md";

export type ThemeExportFormat = {
  id: ThemeExportFormatId;
  /** Short UI label */
  label: string;
  /** Accessible description for buttons / docs */
  description: string;
  /** Suggested download filename (pack id substituted) */
  filename: (packId: string) => string;
  mime: string;
  tier: ExportTier;
  render: (pack: ResolvedPack) => string;
};

/** Free curated Theme Lab / docs site formats. */
export const THEME_EXPORT_FORMATS: readonly ThemeExportFormat[] = [
  {
    id: "design-md",
    label: "DESIGN.md",
    description: "Human- and AI-readable design brief with OKLCH roles and rules",
    filename: (packId) => `${packId}.DESIGN.md`,
    mime: "text/markdown;charset=utf-8",
    tier: "free",
    render: exportDesignMd,
  },
  {
    id: "dtcg",
    label: "DTCG tokens",
    description: "W3C Design Tokens JSON ($value / $type) with light and dark modes",
    filename: (packId) => `${packId}.tokens.dtcg.json`,
    mime: "application/json",
    tier: "free",
    render: exportDtcg,
  },
  {
    id: "tailwind-theme",
    label: "Tailwind @theme",
    description: "Tailwind CSS v4 @theme file with mode remaps",
    filename: (packId) => `${packId}.theme.css`,
    mime: "text/css;charset=utf-8",
    tier: "free",
    render: exportTailwindTheme,
  },
  {
    id: "skill-md",
    label: "Agent skill",
    description: "SKILL.md instructions for coding agents using this theme",
    filename: (packId) => `${packId}.SKILL.md`,
    mime: "text/markdown;charset=utf-8",
    tier: "free",
    render: exportSkillMd,
  },
] as const;

export function getThemeExportFormat(
  id: ThemeExportFormatId,
): ThemeExportFormat {
  const format = THEME_EXPORT_FORMATS.find((entry) => entry.id === id);
  if (!format) throw new Error(`Unknown theme export format: ${id}`);
  return format;
}

export function renderThemeExport(
  id: ThemeExportFormatId,
  pack: ResolvedPack,
): string {
  return getThemeExportFormat(id).render(pack);
}

export const THEME_EXPORT_BASENAMES: Record<ThemeExportFormatId, string> = {
  "design-md": "DESIGN.md",
  dtcg: "tokens.dtcg.json",
  "tailwind-theme": "theme.css",
  "skill-md": "SKILL.md",
};

/** Static public path for a generated curated export. */
export function themeExportPublicPath(
  packId: string,
  id: ThemeExportFormatId,
): string {
  return `/themes/${packId}/${THEME_EXPORT_BASENAMES[id]}`;
}
