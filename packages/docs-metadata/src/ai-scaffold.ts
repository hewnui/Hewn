import type { AiComponentMeta } from "./ai-types";
import { AI_SCHEMA_VERSION } from "./ai-types";
import { installCommandsForComponent } from "./distribution";

function toPascal(kebab: string): string {
  return kebab
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toCamel(kebab: string): string {
  const pascal = toPascal(kebab);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

const DEFAULT_TOKENS = [
  "--kp-accent",
  "--kp-accent-foreground",
  "--kp-foreground",
  "--kp-background",
  "--kp-border",
  "--kp-radius-md",
];

/** Scaffold a valid AI schema v1 from registry identity fields. */
export function scaffoldAiMeta(input: {
  name: string;
  title: string;
  description: string;
  states?: string[];
}): AiComponentMeta {
  const exportName = toPascal(input.name);
  return {
    schemaVersion: AI_SCHEMA_VERSION,
    name: input.name,
    exportName,
    importPath: `@hewnui/ui/${input.name}`,
    compoundParts: [],
    props: [
      {
        name: "className",
        type: "string",
        description: "Optional class names merged onto the root element.",
      },
    ],
    variants: [],
    states: input.states ?? [],
    keyboard: [
      "Tab moves focus to the control",
      "See component docs for widget-specific keys",
    ],
    tokens: [...DEFAULT_TOKENS],
    install: installCommandsForComponent(input.name),
    examples: [
      {
        title: "Basic",
        code: `import { ${exportName} } from "@hewnui/ui/${input.name}";\n\n<${exportName} />`,
      },
    ],
  };
}

export function formatAiModule(meta: AiComponentMeta): string {
  const ident = `${toCamel(meta.name)}Ai`;
  return `export const ${ident} = ${JSON.stringify(meta, null, 2)} as const;\n`;
}
