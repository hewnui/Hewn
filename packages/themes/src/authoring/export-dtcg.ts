import {
  colorEntries,
  modeOrder,
  primaryMode,
  structuralEntries,
} from "./token-entries";
import type { ResolvedMode, ResolvedPack } from "./types";

type DtcgLeaf = {
  $type: string;
  $value: string | number | string[];
  $description?: string;
};

type DtcgNode = { [key: string]: DtcgNode | DtcgLeaf };

function leaf(
  type: string,
  value: string | number | string[],
  description?: string,
): DtcgLeaf {
  return description
    ? { $type: type, $value: value, $description: description }
    : { $type: type, $value: value };
}

function modeColors(mode: ResolvedMode): DtcgNode {
  const color: DtcgNode = {};
  for (const entry of colorEntries(mode)) {
    color[entry.name] = leaf("color", entry.value);
  }
  return color;
}

function structuralGroup(mode: ResolvedMode): DtcgNode {
  const radius: DtcgNode = {};
  const motion: DtcgNode = {};
  let density: DtcgLeaf | undefined;

  for (const entry of structuralEntries(mode)) {
    if (entry.name.startsWith("radius-")) {
      radius[entry.name.replace(/^radius-/, "")] = leaf(
        "dimension",
        entry.value,
      );
      continue;
    }
    if (entry.name.startsWith("motion-")) {
      const key = entry.name.replace(/^motion-/, "");
      motion[key] = leaf(
        entry.kind === "number" ? "number" : "duration",
        entry.kind === "number" ? Number(entry.value) : entry.value,
      );
      continue;
    }
    if (entry.name === "density") {
      density = leaf("number", Number(entry.value));
    }
  }

  return {
    radius,
    motion,
    ...(density ? { density } : {}),
  };
}

/**
 * Free — W3C Design Tokens Community Group JSON (`$value` / `$type`).
 * Modes live under `modes.light` / `modes.dark` when supported.
 */
export function exportDtcg(pack: ResolvedPack): string {
  const modes: DtcgNode = {};
  for (const modeName of modeOrder(pack)) {
    const mode = pack.modes[modeName];
    if (!mode) continue;
    modes[modeName] = {
      color: modeColors(mode),
      ...structuralGroup(mode),
    };
  }

  const primary = primaryMode(pack);
  const doc = {
    $description: `Hewn ${pack.id} theme — DTCG design tokens (${modeOrder(pack).join(" / ")}).`,
    meta: {
      packId: leaf("string", pack.id),
      basePackId: leaf("string", pack.basePackId),
      supportedModes: leaf("string", modeOrder(pack).join(",")),
      colorScheme: leaf("string", primary.colorScheme),
    },
    typography: {
      fontFamily: {
        sans: leaf("fontFamily", [
          "IBM Plex Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ]),
        mono: leaf("fontFamily", [
          "IBM Plex Mono",
          "ui-monospace",
          "monospace",
        ]),
        display: leaf("fontFamily", [
          "Space Grotesk",
          "IBM Plex Sans",
          "sans-serif",
        ]),
      },
    },
    modes,
  };

  return `${JSON.stringify(doc, null, 2)}\n`;
}
