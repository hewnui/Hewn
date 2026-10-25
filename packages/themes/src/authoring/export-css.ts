import {
  colorEntries,
  modeOrder,
  primaryMode,
  structuralEntries,
} from "./token-entries";
import type { ResolvedMode, ResolvedPack } from "./types";

function colorLines(mode: ResolvedMode): string {
  return [
    `  color-scheme: ${mode.colorScheme};`,
    ...colorEntries(mode).map(
      (entry) => `  --kp-${entry.name}: ${entry.value};`,
    ),
  ].join("\n");
}

function structuralLines(mode: ResolvedMode): string {
  return [
    ...structuralEntries(mode).map(
      (entry) => `  --kp-${entry.name}: ${entry.value};`,
    ),
    `  --kp-font-sans: var(--font-plex-sans, "IBM Plex Sans"), ui-sans-serif, system-ui,`,
    `    sans-serif;`,
    `  --kp-font-mono: var(--font-plex-mono, "IBM Plex Mono"), ui-monospace, monospace;`,
    `  --kp-font-display: var(--font-space-grotesk, "Space Grotesk"), var(--kp-font-sans);`,
  ].join("\n");
}

/** Free-tier CSS pack export — drop-in `[data-theme]` file. */
export function exportPackCss(pack: ResolvedPack): string {
  const blocks: string[] = [];
  let first = true;

  for (const modeName of modeOrder(pack)) {
    const mode = pack.modes[modeName];
    if (!mode) continue;

    const selector = first
      ? `:root,\n[data-theme="${pack.id}"][data-mode="${mode.mode}"]`
      : `[data-theme="${pack.id}"][data-mode="${mode.mode}"]`;

    const body = first
      ? `${colorLines(mode)}\n${structuralLines(mode)}`
      : colorLines(mode);

    blocks.push(`${selector} {\n${body}\n}`);
    first = false;
  }

  return `${blocks.join("\n\n")}\n`;
}

/**
 * Free — Tailwind v4 `@theme` block for the primary mode, plus mode overrides
 * that remap the same `--color-*` custom properties.
 */
export function exportTailwindTheme(pack: ResolvedPack): string {
  const primary = primaryMode(pack);
  const themeLines = [
    ...colorEntries(primary).map(
      (entry) => `  --color-${entry.name}: ${entry.value};`,
    ),
    ...structuralEntries(primary)
      .filter((entry) => entry.name.startsWith("radius-"))
      .map((entry) => `  --${entry.name}: ${entry.value};`),
    `  --font-sans: var(--font-plex-sans, "IBM Plex Sans"), ui-sans-serif, system-ui, sans-serif;`,
    `  --font-mono: var(--font-plex-mono, "IBM Plex Mono"), ui-monospace, monospace;`,
    `  --font-display: var(--font-space-grotesk, "Space Grotesk"), var(--font-sans);`,
  ];

  const blocks = [`@theme {\n${themeLines.join("\n")}\n}`];

  for (const modeName of modeOrder(pack).slice(1)) {
    const mode = pack.modes[modeName];
    if (!mode) continue;
    const lines = colorEntries(mode).map(
      (entry) => `  --color-${entry.name}: ${entry.value};`,
    );
    blocks.push(
      `[data-theme="${pack.id}"][data-mode="${mode.mode}"] {\n${lines.join("\n")}\n}`,
    );
  }

  return `/* ${pack.id} — Tailwind v4 @theme */\n${blocks.join("\n\n")}\n`;
}
