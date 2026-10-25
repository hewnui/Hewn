import type { RegistryItem } from "@hewnui/registry";

export const textFieldRegistry: RegistryItem = {
  name: "text-field",
  type: "component",
  tier: "free",
  category: "forms",
  title: "TextField",
  description:
    "Labeled text input with description and validation messaging.",
  states: ["disabled", "validation"],
  keywords: ["input", "text", "field"],
  docsPath: "/docs/components/text-field",
};
