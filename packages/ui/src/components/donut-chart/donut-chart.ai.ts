export const donutChartAi = {
  schemaVersion: 1,
  name: "donut-chart",
  exportName: "DonutChart",
  importPath: "@hewnui/ui/donut-chart",
  compoundParts: ["DonutChart.Tooltip"],
  props: [
    {
      name: "slices",
      type: "DonutSlice[]",
      description: "Named values that sum to the whole.",
    },
    {
      name: "summary",
      type: "string",
      description: "Accessible name for the figure.",
    },
    {
      name: "status",
      type: '"ready" | "loading" | "empty" | "error"',
      description: "Forced frame; empty is inferred when all values are zero.",
    },
  ],
  variants: [],
  states: ["loading", "empty", "error"],
  keyboard: [
    "Tab moves through slices",
    "Focus opens the same tooltip as hover",
  ],
  tokens: ["--kp-accent", "--kp-danger", "--kp-foreground", "--kp-border"],
  install: {
    npm: "npm install @hewnui/ui",
    cli: "npx hewnui@latest add donut-chart",
  },
  examples: [
    {
      title: "Basic",
      code: 'import { DonutChart } from "@hewnui/ui/donut-chart";\n\n<DonutChart summary="Traffic share" slices={[{ id: "edge", label: "Edge", value: 62 }, { id: "origin", label: "Origin", value: 38 }]} />',
    },
  ],
} as const;
