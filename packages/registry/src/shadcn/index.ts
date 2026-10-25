export { buildComponentShadcnItem, buildShadcnRegistry } from "./build";
export { emitShadcnRegistry } from "./emit";
export type { EmitShadcnResult } from "./emit";
export {
  collectRegistryDependencies,
  detectNpmDependencies,
  sharedPathToRegistryItem,
} from "./deps";
export { extractThemeCssVars } from "./theme";
export {
  SHADCN_ITEM_SCHEMA,
  SHADCN_REGISTRY_SCHEMA,
} from "./types";
export type {
  ShadcnCssVars,
  ShadcnFile,
  ShadcnItem,
  ShadcnItemType,
  ShadcnRegistry,
} from "./types";
