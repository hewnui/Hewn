import { formatOklch } from "./oklch";
import { primaryMode } from "./token-entries";
import type { ResolvedPack } from "./types";

const ROW_H = 96;
const PAD = 24;
const COL_W = 120;
const LABEL_W = 88;

/**
 * Core sticker sheet SVG — surfaces, button, and input per pack.
 * Use as a Figma community kit reference (paste or import SVG).
 */
export function exportStickerSheetSvg(packs: readonly ResolvedPack[]): string {
  const width = PAD * 2 + LABEL_W + COL_W * 4;
  const height = PAD * 2 + 40 + packs.length * ROW_H;
  const rows = packs
    .map((pack, index) => renderRow(pack, PAD + 40 + index * ROW_H))
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Hewn sticker sheet">
  <rect width="100%" height="100%" fill="#f4f4f2"/>
  <text x="${PAD}" y="${PAD + 16}" font-family="IBM Plex Sans, ui-sans-serif, system-ui, sans-serif" font-size="16" font-weight="600" fill="#1a1a18">Hewn · sticker sheet</text>
  <text x="${PAD + LABEL_W}" y="${PAD + 34}" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="10" fill="#6b6b66">surface</text>
  <text x="${PAD + LABEL_W + COL_W}" y="${PAD + 34}" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="10" fill="#6b6b66">raised</text>
  <text x="${PAD + LABEL_W + COL_W * 2}" y="${PAD + 34}" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="10" fill="#6b6b66">button</text>
  <text x="${PAD + LABEL_W + COL_W * 3}" y="${PAD + 34}" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="10" fill="#6b6b66">input</text>
${rows}
</svg>
`;
}

function renderRow(pack: ResolvedPack, y: number): string {
  const mode = primaryMode(pack);
  const bg = formatOklch(mode.background);
  const surface = formatOklch(mode.surface);
  const raised = formatOklch(mode.surfaceRaised);
  const accent = formatOklch(mode.accent);
  const accentFg = formatOklch(mode.accentForeground);
  const fg = formatOklch(mode.foreground);
  const border = formatOklch(mode.border);
  const muted = formatOklch(mode.mutedForeground);
  const x0 = PAD + LABEL_W;

  return `  <g>
    <text x="${PAD}" y="${y + 42}" font-family="IBM Plex Sans, ui-sans-serif, system-ui, sans-serif" font-size="13" fill="#1a1a18">${pack.id}</text>
    <rect x="${x0}" y="${y}" width="100" height="72" rx="10" fill="${bg}" stroke="${border}" stroke-width="1"/>
    <rect x="${x0 + 12}" y="${y + 14}" width="76" height="44" rx="8" fill="${surface}" stroke="${border}" stroke-width="1"/>
    <rect x="${x0 + COL_W}" y="${y}" width="100" height="72" rx="10" fill="${bg}" stroke="${border}" stroke-width="1"/>
    <rect x="${x0 + COL_W + 12}" y="${y + 14}" width="76" height="44" rx="8" fill="${raised}" stroke="${border}" stroke-width="1"/>
    <rect x="${x0 + COL_W * 2}" y="${y}" width="100" height="72" rx="10" fill="${bg}" stroke="${border}" stroke-width="1"/>
    <rect x="${x0 + COL_W * 2 + 14}" y="${y + 22}" width="72" height="28" rx="8" fill="${accent}"/>
    <text x="${x0 + COL_W * 2 + 50}" y="${y + 40}" text-anchor="middle" font-family="IBM Plex Sans, ui-sans-serif, system-ui, sans-serif" font-size="11" fill="${accentFg}">Button</text>
    <rect x="${x0 + COL_W * 3}" y="${y}" width="100" height="72" rx="10" fill="${bg}" stroke="${border}" stroke-width="1"/>
    <rect x="${x0 + COL_W * 3 + 10}" y="${y + 22}" width="80" height="28" rx="8" fill="${surface}" stroke="${border}" stroke-width="1"/>
    <text x="${x0 + COL_W * 3 + 18}" y="${y + 40}" font-family="IBM Plex Sans, ui-sans-serif, system-ui, sans-serif" font-size="11" fill="${muted}">Input</text>
    <text x="${x0 + COL_W * 3 + 70}" y="${y + 40}" font-family="IBM Plex Sans, ui-sans-serif, system-ui, sans-serif" font-size="9" fill="${fg}" opacity="0.35">|</text>
  </g>`;
}
