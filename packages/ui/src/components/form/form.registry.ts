import type { RegistryItem } from "@hewnui/registry";

export const formRegistry: RegistryItem = {
  name: "form",
  type: "component",
  tier: "free",
  category: "forms",
  title: "Form",
  description:
    "Accessible form container for native and custom field validation.",
  states: ["validation", "error"],
  keywords: ["form", "validation", "fields"],
  docsPath: "/docs/components/form",
};
