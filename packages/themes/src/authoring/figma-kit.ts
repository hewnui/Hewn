import { derivePack } from "./derive";
import { exportFigmaKit } from "./export-figma";
import {
  THEME_EXPORT_BASENAMES,
  THEME_EXPORT_FORMATS,
  type ThemeExportFormatId,
} from "./export-formats";
import { exportStickerSheetSvg } from "./export-sticker";
import { BASE_PACK_IDS, type BasePackId, type ResolvedPack } from "./types";

/** Derive curated packs with no overrides (canonical kit source). */
export function curatedResolvedPacks(): ResolvedPack[] {
  return BASE_PACK_IDS.map((basePackId) => curatedResolvedPack(basePackId));
}

export function curatedResolvedPack(basePackId: BasePackId): ResolvedPack {
  const result = derivePack({
    schemaVersion: 2,
    basePackId,
    packId: basePackId,
  });
  if (!result.ok) {
    throw new Error(
      `failed to derive curated pack ${basePackId}: ${result.errors.join(", ")}`,
    );
  }
  return result.pack;
}

export function exportCuratedFigmaKit(): string {
  return exportFigmaKit(curatedResolvedPacks());
}

export function exportCuratedStickerSheet(): string {
  return exportStickerSheetSvg(curatedResolvedPacks());
}

export type CuratedThemeExportFile = {
  packId: string;
  formatId: ThemeExportFormatId;
  /** Stable basename under `/themes/{packId}/` */
  basename: string;
  contents: string;
};

/** All free Theme Lab formats × six curated packs. */
export function exportCuratedThemeFiles(): CuratedThemeExportFile[] {
  const files: CuratedThemeExportFile[] = [];
  for (const pack of curatedResolvedPacks()) {
    for (const format of THEME_EXPORT_FORMATS) {
      files.push({
        packId: pack.id,
        formatId: format.id,
        basename: THEME_EXPORT_BASENAMES[format.id],
        contents: format.render(pack),
      });
    }
  }
  return files;
}
