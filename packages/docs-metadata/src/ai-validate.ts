import {
  AI_SCHEMA_VERSION,
  type AiComponentMeta,
  type AiValidationResult,
} from "./ai-types";

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PASCAL = /^[A-Z][A-Za-z0-9]*$/;

export function validateAiComponent(value: unknown): AiValidationResult {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { ok: false, errors: ["AI meta must be an object"] };
  }

  const record = value as Record<string, unknown>;
  const errors: string[] = [];

  if (record.schemaVersion !== AI_SCHEMA_VERSION) {
    errors.push(`schemaVersion must be ${AI_SCHEMA_VERSION}`);
  }
  if (typeof record.name !== "string" || !KEBAB.test(record.name)) {
    errors.push("name must be kebab-case");
  }
  if (typeof record.exportName !== "string" || !PASCAL.test(record.exportName)) {
    errors.push("exportName must be PascalCase");
  }
  if (
    typeof record.importPath !== "string" ||
    !record.importPath.startsWith("@hewnui/ui")
  ) {
    errors.push("importPath must start with @hewnui/ui");
  }

  assertArray(record, "compoundParts", errors);
  assertArray(record, "props", errors);
  assertArray(record, "variants", errors);
  assertStringArray(record, "states", errors);
  assertStringArray(record, "keyboard", errors, { min: 1 });
  assertStringArray(record, "tokens", errors, { min: 1 });
  assertArray(record, "examples", errors, { min: 1 });

  if (typeof record.install !== "object" || record.install === null) {
    errors.push("install must be an object");
  } else {
    const install = record.install as Record<string, unknown>;
    if (typeof install.npm !== "string" || install.npm.length === 0) {
      errors.push("install.npm is required");
    }
    if (typeof install.cli !== "string" || !install.cli.includes("add ")) {
      errors.push("install.cli must include an add command");
    }
  }

  if (Array.isArray(record.props) && record.props.length === 0) {
    errors.push("props must include at least one entry");
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, meta: value as AiComponentMeta };
}

function assertArray(
  record: Record<string, unknown>,
  key: string,
  errors: string[],
  opts?: { min?: number },
) {
  const value = record[key];
  if (!Array.isArray(value)) {
    errors.push(`${key} must be an array`);
    return;
  }
  if (opts?.min !== undefined && value.length < opts.min) {
    errors.push(`${key} must have at least ${opts.min} entr${opts.min === 1 ? "y" : "ies"}`);
  }
}

function assertStringArray(
  record: Record<string, unknown>,
  key: string,
  errors: string[],
  opts?: { min?: number },
) {
  const value = record[key];
  if (
    !Array.isArray(value) ||
    value.some((entry) => typeof entry !== "string" || entry.length === 0)
  ) {
    errors.push(`${key} must be an array of non-empty strings`);
    return;
  }
  if (opts?.min !== undefined && value.length < opts.min) {
    errors.push(`${key} must have at least ${opts.min} entr${opts.min === 1 ? "y" : "ies"}`);
  }
}
