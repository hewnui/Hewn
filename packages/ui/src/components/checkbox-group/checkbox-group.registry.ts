import type { RegistryItem } from "@hewnui/registry";

export const checkboxGroupRegistry: RegistryItem = {
  name: "checkbox-group",
  type: "component",
  tier: "free",
  category: "forms",
  title: "CheckboxGroup",
  description:
    "Labeled multi-select checkbox set with shared validation messaging.",
  states: ["disabled", "validation"],
  keywords: ["multi-select", "checkbox", "fieldset"],
  docsPath: "/docs/components/checkbox-group",
};
