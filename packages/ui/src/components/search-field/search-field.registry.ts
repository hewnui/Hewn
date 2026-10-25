import type { RegistryItem } from "@hewnui/registry";

export const searchFieldRegistry: RegistryItem = {
  name: "search-field",
  type: "component",
  tier: "free",
  category: "forms",
  title: "SearchField",
  description: "Search input with clear control and Escape-to-clear behavior.",
  states: ["disabled", "validation"],
  keywords: ["search", "input", "clear"],
  docsPath: "/docs/components/search-field",
};
