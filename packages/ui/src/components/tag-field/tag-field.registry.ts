import type { RegistryItem } from "@hewnui/registry";

export const tagFieldRegistry: RegistryItem = {
  name: "tag-field",
  type: "component",
  tier: "free",
  category: "pickers",
  title: "TagField",
  description:
    "Filterable multi-select that shows selections as removable tags.",
  states: ["empty", "disabled", "validation"],
  keywords: [
    "multiselect",
    "multi-select",
    "tags",
    "combobox",
    "autocomplete",
    "chip",
  ],
  docsPath: "/docs/components/tag-field",
};
