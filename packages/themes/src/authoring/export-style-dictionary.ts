import {
  colorEntries,
  modeOrder,
  primaryMode,
  structuralEntries,
} from "./token-entries";
import type { ResolvedPack } from "./types";

type SdLeaf = { value: string | number; type: string };
type SdNode = { [key: string]: SdNode | SdLeaf };

function setPath(root: SdNode, path: string[], leaf: SdLeaf) {
  let cursor = root;
  for (let i = 0; i < path.length - 1; i += 1) {
    const key = path[i]!;
    const existing = cursor[key];
    if (!existing || typeof existing !== "object" || "value" in existing) {
      cursor[key] = {};
    }
    cursor = cursor[key] as SdNode;
  }
  cursor[path[path.length - 1]!] = leaf;
}

function parseNumeric(value: string): string | number {
  const asNum = Number(value);
  return Number.isFinite(asNum) && value.trim() !== "" ? asNum : value;
}

/** Pro — Style Dictionary–friendly nested token JSON (all modes). */
export function exportStyleDictionary(pack: ResolvedPack): string {
  const tree: SdNode = {};
  const modes = modeOrder(pack);

  for (const modeName of modes) {
    const mode = pack.modes[modeName];
    if (!mode) continue;
    for (const entry of colorEntries(mode)) {
      setPath(tree, ["color", entry.name, modeName], {
        value: entry.value,
        type: "color",
      });
    }
  }

  const primary = primaryMode(pack);
  for (const entry of structuralEntries(primary)) {
    const [group, ...rest] = entry.name.split("-");
    const path = rest.length > 0 ? [group!, rest.join("-")] : [entry.name];
    setPath(tree, path, {
      value: parseNumeric(entry.value),
      type: entry.kind === "number" ? "number" : "dimension",
    });
  }

  setPath(tree, ["meta", "packId"], { value: pack.id, type: "other" });
  setPath(tree, ["meta", "basePackId"], {
    value: pack.basePackId,
    type: "other",
  });
  setPath(tree, ["meta", "supportedModes"], {
    value: modes.join(","),
    type: "other",
  });

  return `${JSON.stringify(tree, null, 2)}\n`;
}
