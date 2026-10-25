import type { RegistryItem } from "@hewnui/registry";

export const selectRegistry: RegistryItem = {
  name: "select",
  type: "component",
  tier: "free",
  category: "pickers",
  title: "Select",
  description: "Single-select control with popover listbox.",
  states: ["disabled", "validation"],
  keywords: ["select", "listbox", "dropdown"],
  docsPath: "/docs/components/select",
};
