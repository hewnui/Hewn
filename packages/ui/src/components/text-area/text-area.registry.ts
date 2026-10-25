import type { RegistryItem } from "@hewnui/registry";

export const textAreaRegistry: RegistryItem = {
  name: "text-area",
  type: "component",
  tier: "free",
  category: "forms",
  title: "TextArea",
  description:
    "Multiline labeled field with description and validation messaging.",
  states: ["disabled", "validation"],
  keywords: ["textarea", "multiline", "field"],
  docsPath: "/docs/components/text-area",
};
