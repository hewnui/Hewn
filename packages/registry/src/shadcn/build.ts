import type { BuiltItem } from "../emit";
import type { RegistryFileEntry } from "../scan";
import {
  collectRegistryDependencies,
  detectNpmDependencies,
} from "./deps";
import { contentNeedsMotionPresets, rewriteShadcnContent } from "./rewrite";
import { buildMotionPresetsItem, buildSharedLibItems } from "./shared";
import { buildTokensItem } from "./theme";
import {
  SHADCN_ITEM_SCHEMA,
  SHADCN_REGISTRY_SCHEMA,
  type ShadcnItem,
  type ShadcnRegistry,
} from "./types";

export type BuildShadcnOptions = {
  items: BuiltItem[];
  sharedFiles: RegistryFileEntry[];
  themesRoot: string;
  motionEntryPath: string;
  homepage: string;
  registryName?: string;
  /** Used to prefix registryDependencies for namespaced installs. */
  namespace?: string;
};

function mapHewnType(
  type: BuiltItem["item"]["type"],
): ShadcnItem["type"] {
  if (type === "block") return "registry:block";
  if (type === "theme") return "registry:theme";
  return "registry:ui";
}

export function buildComponentShadcnItem(
  built: BuiltItem,
  namespace = "hewnui",
): ShadcnItem {
  const { item, files } = built;
  const originalContents = files.map((file) => file.content);
  const needsMotion = originalContents.some(contentNeedsMotionPresets);
  const rewritten = files.map((file) => ({
    path: `${item.name}/${file.path}`,
    content: rewriteShadcnContent(file.content),
    type: mapHewnType(item.type),
    target: `@ui/${item.name}/${file.path}`,
  }));
  const registryDependencies = collectRegistryDependencies({
    internal: item.internalDependencies ?? [],
    shared: item.sharedDependencies,
    needsMotionPresets: needsMotion,
    namespace,
  });

  const result: ShadcnItem = {
    $schema: SHADCN_ITEM_SCHEMA,
    name: item.name,
    type: mapHewnType(item.type),
    title: item.title,
    description: item.description,
    dependencies: detectNpmDependencies(
      originalContents,
      item.dependencies ?? [],
    ),
    files: rewritten,
    categories: [item.category],
    docs: item.docsPath,
  };
  if (registryDependencies.length > 0) {
    result.registryDependencies = registryDependencies;
  }
  return result;
}

export async function buildShadcnRegistry(
  options: BuildShadcnOptions,
): Promise<{ registry: ShadcnRegistry; items: ShadcnItem[] }> {
  const namespace = options.namespace ?? options.registryName ?? "hewnui";
  const free = options.items.filter(({ item }) => item.tier === "free");
  const componentItems = free.map((item) =>
    buildComponentShadcnItem(item, namespace),
  );
  const sharedItems = buildSharedLibItems(options.sharedFiles, namespace);
  const motion = await buildMotionPresetsItem(options.motionEntryPath);
  const tokens = await buildTokensItem(options.themesRoot);

  const items = [...sharedItems, motion, tokens, ...componentItems].sort(
    (a, b) => a.name.localeCompare(b.name),
  );

  const catalogItems: ShadcnRegistry["items"] = items.map((item) => {
    const { $schema: _schema, files, ...rest } = item;
    return {
      ...rest,
      files: files.map(({ content: _content, ...file }) => file),
    };
  });

  const registry: ShadcnRegistry = {
    $schema: SHADCN_REGISTRY_SCHEMA,
    name: options.registryName ?? "hewnui",
    homepage: options.homepage,
    items: catalogItems,
  };

  return { registry, items };
}
