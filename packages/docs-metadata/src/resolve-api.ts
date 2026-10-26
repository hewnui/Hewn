import { readFile } from "fs/promises";
import { join } from "path";
import type { AiComponentMeta, AiProp } from "./ai-types";
import { cliAddCommand, packageInstallCommand } from "./install";
import {
  extractPropsForPart,
  extractPropsFromComponentSource,
  extractPropsFromTypesSource,
  extractPropsMapsFromSource,
} from "./props-from-types";

export type DocsApiPartDocument = {
  name: string;
  description?: string;
  props: AiProp[];
};

export type DocsApiDocument = {
  name: string;
  exportName: string;
  importPath: string;
  source: "types" | "ai" | "merged" | "tsx";
  props: AiProp[];
  compoundParts: AiComponentMeta["compoundParts"];
  /** Per-part prop tables when compound APIs declare multiple `*Props` aliases. */
  partProps: DocsApiPartDocument[];
  install: {
    npm: string;
    pnpm: string;
    yarn: string;
    bun: string;
    cli: string;
  };
};

function mergeProps(fromTypes: AiProp[], fromAi: AiProp[]): AiProp[] {
  if (fromTypes.length === 0) return fromAi;
  if (fromAi.length === 0) return fromTypes;

  const aiByName = new Map(fromAi.map((prop) => [prop.name, prop]));
  const merged = fromTypes.map((prop) => {
    const ai = aiByName.get(prop.name);
    if (!ai) return prop;
    return {
      ...prop,
      description: ai.description || prop.description,
      ...(ai.default !== undefined ? { default: ai.default } : {}),
      ...(ai.required !== undefined ? { required: ai.required } : {}),
    };
  });

  const typeNames = new Set(fromTypes.map((prop) => prop.name));
  for (const ai of fromAi) {
    if (!typeNames.has(ai.name)) merged.push(ai);
  }
  return merged;
}

function isStubClassNameOnly(props: AiProp[]): boolean {
  return (
    props.length === 1 &&
    props[0]?.name === "className" &&
    props[0]?.description.includes("Optional class names")
  );
}

async function readOptional(path: string): Promise<string | null> {
  try {
    return await readFile(path, "utf8");
  } catch {
    return null;
  }
}

export async function resolveComponentApi(
  componentsRoot: string,
  meta: AiComponentMeta,
): Promise<DocsApiDocument> {
  const folder = join(componentsRoot, meta.name);
  const typesPath = join(folder, `${meta.name}.types.ts`);
  const tsxPath = join(folder, `${meta.name}.tsx`);

  const typesSource = await readOptional(typesPath);
  const tsxSource = await readOptional(tsxPath);

  let fromTypes: AiProp[] = [];
  let partProps: DocsApiPartDocument[] = [];
  let sourceKind: DocsApiDocument["source"] = "ai";

  if (typesSource) {
    fromTypes = extractPropsFromTypesSource(typesSource, meta.exportName);
    const maps = extractPropsMapsFromSource(typesSource);
    partProps = meta.compoundParts
      .map((part) => {
        const partName =
          typeof part === "string"
            ? part
            : (part as { name: string }).name;
        if (!partName || partName === meta.exportName) return null;
        const props = extractPropsForPart(maps, partName);
        if (props.length === 0) return null;
        const description =
          typeof part === "string"
            ? undefined
            : (part as { description?: string }).description;
        return {
          name: partName,
          ...(description ? { description } : {}),
          props,
        };
      })
      .filter((part): part is DocsApiPartDocument => part !== null);
    if (fromTypes.length > 0) sourceKind = "types";
  }

  if (fromTypes.length === 0 && tsxSource) {
    fromTypes = extractPropsFromComponentSource(tsxSource, meta.exportName);
    if (fromTypes.length > 0) sourceKind = "tsx";
  }

  // When types file exists but primary export props are empty (e.g. toast),
  // still try the implementation file.
  if (fromTypes.length === 0 && tsxSource && typesSource) {
    fromTypes = extractPropsFromComponentSource(tsxSource, meta.exportName);
    if (fromTypes.length > 0) sourceKind = "tsx";
  }

  const fromAi = meta.props ?? [];
  // Prefer real extracted props over scaffolded className-only AI stubs.
  // When compound part tables exist, do not hoist sibling-part AI props onto
  // the root table (that was merging CommandPaletteItem fields into root).
  let props: AiProp[];
  if (fromTypes.length > 0 && isStubClassNameOnly(fromAi)) {
    props = fromTypes;
  } else if (fromTypes.length > 0 && partProps.length > 0) {
    const rootNames = new Set(fromTypes.map((prop) => prop.name));
    props = mergeProps(
      fromTypes,
      fromAi.filter((prop) => rootNames.has(prop.name)),
    );
  } else {
    props = mergeProps(fromTypes, fromAi);
  }

  if (
    fromTypes.length > 0 &&
    fromAi.length > 0 &&
    !isStubClassNameOnly(fromAi) &&
    partProps.length === 0
  ) {
    sourceKind = "merged";
  }

  // Discover extra *Props tables from types even when compoundParts is empty
  // (DialogBody / DialogActions / DialogTrigger).
  if (typesSource && partProps.length === 0) {
    const maps = extractPropsMapsFromSource(typesSource);
    const primary = `${meta.exportName}Props`;
    for (const [typeName, partTypeProps] of maps) {
      if (typeName === primary || partTypeProps.length === 0) continue;
      const name = typeName.replace(/Props$/, "");
      if (name === meta.exportName) continue;
      partProps.push({ name, props: partTypeProps });
    }
  }

  // Dialog / similar: compound functions live in the same tsx without *Props aliases.
  if (tsxSource && partProps.length === 0) {
    const extras = ["Trigger", "Body", "Actions", "Header", "Footer", "Item"];
    for (const suffix of extras) {
      const name = `${meta.exportName}${suffix}`;
      const extracted = extractPropsFromComponentSource(tsxSource, name);
      if (extracted.length === 0) continue;
      partProps.push({ name, props: extracted });
    }
  }

  return {
    name: meta.name,
    exportName: meta.exportName,
    importPath: meta.importPath,
    source: sourceKind,
    props,
    compoundParts: meta.compoundParts,
    partProps,
    install: {
      npm: packageInstallCommand("npm"),
      pnpm: packageInstallCommand("pnpm"),
      yarn: packageInstallCommand("yarn"),
      bun: packageInstallCommand("bun"),
      cli: cliAddCommand(meta.name),
    },
  };
}

export function assertApiComplete(docs: DocsApiDocument[]): string[] {
  const errors: string[] = [];
  for (const doc of docs) {
    if (doc.props.length === 0) {
      errors.push(
        `${doc.name}: API reference has no props (add *.types.ts fields or *.ai.ts props)`,
      );
    }
  }
  return errors;
}
