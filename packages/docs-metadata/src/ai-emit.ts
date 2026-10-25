import type { AiComponentMeta } from "./ai-types";
import { installCommandsForComponent } from "./distribution";
import type { RegistryIndexItem } from "./sections";

export type AiIndexDocument = {
  schemaVersion: 1;
  generatedAt: string;
  items: Array<{
    name: string;
    title: string;
    category: string;
    tier: string;
    docsPath: string;
    url: string;
  }>;
};

export function buildAiIndex(
  metas: AiComponentMeta[],
  registryItems: RegistryIndexItem[],
): AiIndexDocument {
  const byName = new Map(registryItems.map((item) => [item.name, item]));
  const items = metas
    .map((meta) => {
      const reg = byName.get(meta.name);
      return {
        name: meta.name,
        title: reg?.title ?? meta.exportName,
        category: reg?.category ?? "utilities",
        tier: reg?.tier ?? "free",
        docsPath: reg?.docsPath ?? `/docs/components/${meta.name}`,
        url: `/ai/components/${meta.name}.json`,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    items,
  };
}

export function enrichAiDocument(
  meta: AiComponentMeta,
  registry?: RegistryIndexItem,
): AiComponentMeta & {
  title: string;
  description: string;
  category: string;
  tier: string;
  docsPath: string;
} {
  return {
    ...meta,
    // Rewrite install strings at emit time so co-located *.ai.ts can keep
    // publish-ready commands while public /ai JSON stays honest pre-publish.
    install: installCommandsForComponent(meta.name),
    title: registry?.title ?? meta.exportName,
    description: registry?.description ?? "",
    category: registry?.category ?? "utilities",
    tier: registry?.tier ?? "free",
    docsPath: registry?.docsPath ?? `/docs/components/${meta.name}`,
  };
}
