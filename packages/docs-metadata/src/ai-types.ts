export const AI_SCHEMA_VERSION = 1 as const;

export type AiProp = {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  default?: string;
};

export type AiVariant = {
  name: string;
  values: string[];
};

export type AiCompoundPart = {
  name: string;
  description: string;
};

export type AiExample = {
  title: string;
  code: string;
};

/** Versioned per-component AI schema (Phase 7.1). */
export type AiComponentMeta = {
  schemaVersion: typeof AI_SCHEMA_VERSION | number;
  name: string;
  exportName: string;
  /** Subpath import, e.g. `@hewnui/ui/button`. */
  importPath: string;
  compoundParts: AiCompoundPart[];
  props: AiProp[];
  variants: AiVariant[];
  states: string[];
  keyboard: string[];
  /** Semantic CSS tokens consumed (e.g. `--kp-accent`). */
  tokens: string[];
  install: {
    npm: string;
    cli: string;
  };
  examples: AiExample[];
};

export type AiValidationResult =
  | { ok: true; meta: AiComponentMeta }
  | { ok: false; errors: string[] };
