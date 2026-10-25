import {
  COMPONENT_CATEGORIES,
  type ComponentCategory,
} from "./categories";

export type RegistryTier = "free" | "pro";
export type RegistryItemType = "component" | "block" | "theme";
export type RegistryState =
  | "loading"
  | "empty"
  | "error"
  | "disabled"
  | "validation";

export const REGISTRY_TIERS: readonly RegistryTier[] = ["free", "pro"];
export const REGISTRY_ITEM_TYPES: readonly RegistryItemType[] = [
  "component",
  "block",
  "theme",
];
export const REGISTRY_STATES: readonly RegistryState[] = [
  "loading",
  "empty",
  "error",
  "disabled",
  "validation",
];

export type RegistryItem = {
  name: string;
  type: RegistryItemType;
  tier: RegistryTier;
  category: ComponentCategory;
  title: string;
  description: string;
  dependencies?: string[];
  internalDependencies?: string[];
  states?: RegistryState[];
  keywords?: string[];
  docsPath: string;
};

export type ValidationResult =
  | { ok: true; item: RegistryItem }
  | { ok: false; errors: string[] };

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const NPM_PACKAGE = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/;

function checkStringArray(
  record: Record<string, unknown>,
  key: string,
  pattern: RegExp,
  patternLabel: string,
  errors: string[],
): void {
  const value = record[key];
  if (value === undefined) return;
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string")) {
    errors.push(`${key} must be an array of strings`);
    return;
  }
  for (const entry of value) {
    if (!pattern.test(entry)) {
      errors.push(`${key} entries must be ${patternLabel}: "${entry}"`);
    }
  }
}

export function validateRegistryItem(value: unknown): ValidationResult {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { ok: false, errors: ["Registry item must be an object"] };
  }

  const errors: string[] = [];
  const record = value as Record<string, unknown>;

  if (typeof record.name !== "string" || !KEBAB_CASE.test(record.name)) {
    errors.push("name must be a kebab-case string");
  }
  if (
    typeof record.type !== "string" ||
    !REGISTRY_ITEM_TYPES.includes(record.type as RegistryItemType)
  ) {
    errors.push(`type must be one of: ${REGISTRY_ITEM_TYPES.join(", ")}`);
  }
  if (
    typeof record.tier !== "string" ||
    !REGISTRY_TIERS.includes(record.tier as RegistryTier)
  ) {
    errors.push(`tier must be one of: ${REGISTRY_TIERS.join(", ")}`);
  }
  if (
    typeof record.category !== "string" ||
    !COMPONENT_CATEGORIES.includes(record.category as ComponentCategory)
  ) {
    errors.push(`category must be one of: ${COMPONENT_CATEGORIES.join(", ")}`);
  }
  if (typeof record.title !== "string" || record.title.trim().length === 0) {
    errors.push("title must be a non-empty string");
  }
  if (
    typeof record.description !== "string" ||
    record.description.trim().length === 0
  ) {
    errors.push("description must be a non-empty string");
  }
  if (
    typeof record.docsPath !== "string" ||
    !record.docsPath.startsWith("/docs/")
  ) {
    errors.push("docsPath must start with /docs/");
  }
  checkStringArray(record, "dependencies", NPM_PACKAGE, "npm package names", errors);
  checkStringArray(
    record,
    "internalDependencies",
    KEBAB_CASE,
    "kebab-case registry item names",
    errors,
  );
  checkStringArray(record, "keywords", KEBAB_CASE, "kebab-case words", errors);

  if (record.states !== undefined) {
    if (!Array.isArray(record.states)) {
      errors.push(`states must be an array of: ${REGISTRY_STATES.join(", ")}`);
    } else {
      for (const state of record.states) {
        if (!REGISTRY_STATES.includes(state as RegistryState)) {
          errors.push(`states must be one of: ${REGISTRY_STATES.join(", ")}: "${String(state)}"`);
        }
      }
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }
  return { ok: true, item: value as RegistryItem };
}
