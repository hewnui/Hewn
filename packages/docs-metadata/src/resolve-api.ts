import { readFile } from "fs/promises";
import { join } from "path";
import type { AiComponentMeta, AiProp } from "./ai-types";
import { cliAddCommand, packageInstallCommand } from "./install";
import { extractPropsFromTypesSource } from "./props-from-types";

export type DocsApiDocument = {
  name: string;
  exportName: string;
  importPath: string;
  source: "types" | "ai" | "merged";
  props: AiProp[];
  compoundParts: AiComponentMeta["compoundParts"];
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

export async function resolveComponentApi(
  componentsRoot: string,
  meta: AiComponentMeta,
): Promise<DocsApiDocument> {
  const typesPath = join(
    componentsRoot,
    meta.name,
    `${meta.name}.types.ts`,
  );

  let fromTypes: AiProp[] = [];
  try {
    const source = await readFile(typesPath, "utf8");
    fromTypes = extractPropsFromTypesSource(source);
  } catch {
    fromTypes = [];
  }

  const fromAi = meta.props ?? [];
  const props = mergeProps(fromTypes, fromAi);
  const source: DocsApiDocument["source"] =
    fromTypes.length > 0 && fromAi.length > 0
      ? "merged"
      : fromTypes.length > 0
        ? "types"
        : "ai";

  return {
    name: meta.name,
    exportName: meta.exportName,
    importPath: meta.importPath,
    source,
    props,
    compoundParts: meta.compoundParts,
    install: {
      npm: packageInstallCommand("npm"),
      pnpm: packageInstallCommand("pnpm"),
      yarn: packageInstallCommand("yarn"),
      bun: packageInstallCommand("bun"),
      cli: cliAddCommand(meta.name),
    },
  };
}

export function assertApiComplete(
  docs: DocsApiDocument[],
): string[] {
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
