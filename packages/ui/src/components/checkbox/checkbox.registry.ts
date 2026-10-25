import type { RegistryItem } from "@hewnui/registry";

export const checkboxRegistry: RegistryItem = {
  name: "checkbox",
  type: "component",
  tier: "free",
  category: "forms",
  title: "Checkbox",
  description: "Binary selection control with motion-aware check feedback.",
  states: ["disabled", "validation"],
  keywords: ["select", "toggle", "binary"],
  docsPath: "/docs/components/checkbox",
};
