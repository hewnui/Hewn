export const SHADCN_ITEM_SCHEMA =
  "https://ui.shadcn.com/schema/registry-item.json";
export const SHADCN_REGISTRY_SCHEMA =
  "https://ui.shadcn.com/schema/registry.json";

export type ShadcnItemType =
  | "registry:ui"
  | "registry:lib"
  | "registry:theme"
  | "registry:file"
  | "registry:component"
  | "registry:block"
  | "registry:hook"
  | "registry:page"
  | "registry:style"
  | "registry:base"
  | "registry:font"
  | "registry:item";

export type ShadcnFile = {
  path: string;
  content: string;
  type: ShadcnItemType;
  target?: string;
};

export type ShadcnCssVars = {
  theme?: Record<string, string>;
  light?: Record<string, string>;
  dark?: Record<string, string>;
};

export type ShadcnItem = {
  $schema: typeof SHADCN_ITEM_SCHEMA;
  name: string;
  type: ShadcnItemType;
  title?: string;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: ShadcnFile[];
  cssVars?: ShadcnCssVars;
  categories?: string[];
  docs?: string;
};

export type ShadcnCatalogItem = Omit<ShadcnItem, "$schema" | "files"> & {
  files?: Omit<ShadcnFile, "content">[];
};

export type ShadcnRegistry = {
  $schema: typeof SHADCN_REGISTRY_SCHEMA;
  name: string;
  homepage: string;
  items: ShadcnCatalogItem[];
};
