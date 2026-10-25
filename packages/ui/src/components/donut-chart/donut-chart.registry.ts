import type { RegistryItem } from "@hewnui/registry";

export const donutChartRegistry: RegistryItem = {
  name: "donut-chart",
  type: "component",
  tier: "free",
  category: "data-display",
  title: "DonutChart",
  description:
    "Part-to-whole radial chart with a required summary, focusable slices, and chart status frames.",
  states: ["loading", "empty", "error"],
  keywords: ["pie", "radial", "share"],
  docsPath: "/docs/components/donut-chart",
};
