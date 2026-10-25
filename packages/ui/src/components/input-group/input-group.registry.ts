import type { RegistryItem } from "@hewnui/registry";

export const inputGroupRegistry: RegistryItem = {
  name: "input-group",
  type: "component",
  tier: "free",
  category: "forms",
  title: "InputGroup",
  description:
    "Text field with prefix and suffix affixes inside shared input chrome.",
  states: ["disabled", "validation"],
  keywords: ["input", "affix", "prefix"],
  docsPath: "/docs/components/input-group",
};
