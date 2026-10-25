import { readFile, readdir } from "fs/promises";
import { join } from "path";
import type {
  AiDocument,
  Catalog,
  CatalogItem,
  ThemeSummary,
} from "./types.js";

type IndexFile = { items: CatalogItem[] };

const CURATED_THEMES: ThemeSummary[] = [
  { id: "forest", modes: ["light", "dark"] },
  { id: "tide", modes: ["light", "dark"] },
  { id: "graphite", modes: ["light", "dark"] },
  { id: "dune", modes: ["light"] },
  { id: "clay", modes: ["light"] },
  { id: "ember", modes: ["dark"] },
];

export type FsCatalogPaths = {
  freeIndexPath: string;
  proIndexPath: string;
  aiDir: string;
};

export type ListOpts = { includePro?: boolean };

function matchesQuery(item: CatalogItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = [
    item.name,
    item.title,
    item.description,
    item.category,
    ...(item.keywords ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

function visible(items: CatalogItem[], includePro: boolean): CatalogItem[] {
  return includePro ? items : items.filter((item) => item.tier === "free");
}

export async function loadFsCatalog(paths: FsCatalogPaths): Promise<Catalog> {
  const [freeRaw, proRaw] = await Promise.all([
    readFile(paths.freeIndexPath, "utf8"),
    readFile(paths.proIndexPath, "utf8").catch(() => '{"items":[]}'),
  ]);
  const free = JSON.parse(freeRaw) as IndexFile;
  const pro = JSON.parse(proRaw) as IndexFile;
  const items = [...free.items, ...pro.items];
  const byName = new Map(items.map((item) => [item.name, item]));

  const aiByName = new Map<string, AiDocument>();
  try {
    const files = await readdir(paths.aiDir);
    await Promise.all(
      files
        .filter((file) => file.endsWith(".json"))
        .map(async (file) => {
          const raw = await readFile(join(paths.aiDir, file), "utf8");
          const doc = JSON.parse(raw) as AiDocument;
          aiByName.set(doc.name, doc);
        }),
    );
  } catch {
    // AI dir optional for theme-only queries
  }

  return {
    listComponents: (opts) => visible(items, Boolean(opts?.includePro)),
    findComponent: (name) => byName.get(name),
    searchComponents: (query, opts) =>
      visible(items, Boolean(opts?.includePro)).filter((item) =>
        matchesQuery(item, query),
      ),
    getAi: (name) => aiByName.get(name),
    listThemes: () => CURATED_THEMES,
    getTheme: (id) => CURATED_THEMES.find((theme) => theme.id === id),
  };
}

export function createMemoryCatalog(input: {
  items: CatalogItem[];
  ai?: AiDocument[];
  themes?: ThemeSummary[];
}): Catalog {
  const byName = new Map(input.items.map((item) => [item.name, item]));
  const aiByName = new Map((input.ai ?? []).map((doc) => [doc.name, doc]));
  const themes = input.themes ?? CURATED_THEMES;

  return {
    listComponents: (opts) => visible(input.items, Boolean(opts?.includePro)),
    findComponent: (name) => byName.get(name),
    searchComponents: (query, opts) =>
      visible(input.items, Boolean(opts?.includePro)).filter((item) =>
        matchesQuery(item, query),
      ),
    getAi: (name) => aiByName.get(name),
    listThemes: () => themes,
    getTheme: (id) => themes.find((theme) => theme.id === id),
  };
}
