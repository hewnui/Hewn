export type CatalogItem = {
  name: string;
  title: string;
  description: string;
  category: string;
  tier: "free" | "pro";
  docsPath: string;
  keywords?: string[];
};

export type AiInstall = {
  npm: string;
  cli: string;
};

export type AiDocument = {
  name: string;
  exportName: string;
  importPath: string;
  title?: string;
  description?: string;
  docsPath?: string;
  props: unknown[];
  variants: unknown[];
  states: string[];
  keyboard: string[];
  tokens: string[];
  install: AiInstall;
  examples: unknown[];
  compoundParts: unknown[];
};

export type ThemeSummary = {
  id: string;
  modes: string[];
};

export type Catalog = {
  listComponents: (opts?: { includePro?: boolean }) => CatalogItem[];
  findComponent: (name: string) => CatalogItem | undefined;
  searchComponents: (
    query: string,
    opts?: { includePro?: boolean },
  ) => CatalogItem[];
  getAi: (name: string) => AiDocument | undefined;
  listThemes: () => ThemeSummary[];
  getTheme: (id: string) => ThemeSummary | undefined;
};
