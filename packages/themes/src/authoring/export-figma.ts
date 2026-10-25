import {
  colorEntries,
  modeOrder,
  primaryMode,
  structuralEntries,
} from "./token-entries";
import type { ResolvedPack } from "./types";

type TsToken = {
  value: string | number;
  type: string;
  description?: string;
};

type TsSet = { [key: string]: TsToken | TsSet };

type TsTheme = {
  id: string;
  name: string;
  selectedTokenSets: Record<string, "enabled" | "source">;
};

function nest(set: TsSet, path: string[], token: TsToken) {
  let cursor: TsSet = set;
  for (let i = 0; i < path.length - 1; i += 1) {
    const key = path[i]!;
    const existing = cursor[key];
    if (!existing || typeof existing !== "object" || "value" in existing) {
      cursor[key] = {};
    }
    cursor = cursor[key] as TsSet;
  }
  cursor[path[path.length - 1]!] = token;
}

/** Build Tokens Studio token sets + themes for one or more packs. */
export function buildFigmaDocument(packs: readonly ResolvedPack[]): {
  tokenSets: Record<string, TsSet>;
  themes: TsTheme[];
} {
  const tokenSets: Record<string, TsSet> = {};
  const themes: TsTheme[] = [];

  for (const pack of packs) {
    const structural: TsSet = {};
    const primary = primaryMode(pack);
    for (const entry of structuralEntries(primary)) {
      nest(structural, [entry.name], {
        value: entry.kind === "number" ? Number(entry.value) : entry.value,
        type: entry.kind === "number" ? "number" : "sizing",
      });
    }
    tokenSets[`${pack.id}/structural`] = structural;

    for (const modeName of modeOrder(pack)) {
      const mode = pack.modes[modeName];
      if (!mode) continue;
      const setName = `${pack.id}/${modeName}`;
      const set: TsSet = {};
      for (const entry of colorEntries(mode)) {
        nest(set, ["color", entry.name], {
          value: entry.value,
          type: "color",
        });
      }
      tokenSets[setName] = set;
      themes.push({
        id: `${pack.id}-${modeName}`,
        name: `${pack.id} / ${modeName}`,
        selectedTokenSets: {
          [`${pack.id}/structural`]: "source",
          [setName]: "enabled",
        },
      });
    }
  }

  return { tokenSets, themes };
}

function stringifyFigmaDoc(
  tokenSets: Record<string, TsSet>,
  themes: TsTheme[],
): string {
  const doc = {
    $metadata: {
      tokenSetOrder: Object.keys(tokenSets),
      activeThemeEditor: themes[0]?.id ?? null,
    },
    $themes: themes,
    ...tokenSets,
  };
  return `${JSON.stringify(doc, null, 2)}\n`;
}

/**
 * Pro — Tokens Studio–compatible multi-set export for one authored pack.
 * Import via Tokens Studio → Figma variables.
 */
export function exportFigmaVariables(pack: ResolvedPack): string {
  const { tokenSets, themes } = buildFigmaDocument([pack]);
  return stringifyFigmaDoc(tokenSets, themes);
}

/** Curated kit — all packs in one Tokens Studio document. */
export function exportFigmaKit(packs: readonly ResolvedPack[]): string {
  const { tokenSets, themes } = buildFigmaDocument(packs);
  return stringifyFigmaDoc(tokenSets, themes);
}
