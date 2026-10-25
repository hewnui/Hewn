export const emptyAi = {
  schemaVersion: 1,
  name: "empty",
  exportName: "Empty",
  importPath: "@hewnui/ui/empty",
  compoundParts: [],
  props: [
    {
      name: "title",
      type: "ReactNode",
      description: "Short heading announced via role=status.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Supporting copy for how to populate the region.",
    },
    {
      name: "action",
      type: "ReactNode",
      description: "Optional control (usually a Button) to create the first item.",
    },
  ],
  variants: [],
  states: ["empty"],
  keyboard: ["Tab moves to the optional action control"],
  tokens: ["--kp-foreground", "--kp-muted", "--kp-border", "--kp-radius-lg"],
  install: {
    npm: "npm install @hewnui/ui",
    cli: "npx hewnui@latest add empty",
  },
  examples: [
    {
      title: "Basic",
      code: 'import { Empty } from "@hewnui/ui/empty";\n\n<Empty title="No jobs">Queue is clear for this window.</Empty>',
    },
  ],
} as const;
