import type { RegistryItem } from "@hewnui/registry";

export const comboboxRegistry: RegistryItem = {
  name: "combobox",
  type: "component",
  tier: "free",
  category: "pickers",
  title: "Combobox",
  description: "Searchable single-select built on React Aria ComboBox.",
  states: ["disabled", "empty", "validation"],
  keywords: ["autocomplete", "search", "select"],
  docsPath: "/docs/components/combobox",
};
