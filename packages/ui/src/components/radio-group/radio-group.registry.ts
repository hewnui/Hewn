import type { RegistryItem } from "@hewnui/registry";

export const radioGroupRegistry: RegistryItem = {
  name: "radio-group",
  type: "component",
  tier: "free",
  category: "forms",
  title: "RadioGroup",
  description:
    "Mutually exclusive choice set with animated selection indicator.",
  states: ["disabled", "validation"],
  keywords: ["radio", "choice", "fieldset"],
  docsPath: "/docs/components/radio-group",
};
