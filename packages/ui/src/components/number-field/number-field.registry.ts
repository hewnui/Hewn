import type { RegistryItem } from "@hewnui/registry";

export const numberFieldRegistry: RegistryItem = {
  name: "number-field",
  type: "component",
  tier: "free",
  category: "forms",
  title: "NumberField",
  description:
    "Localized number input with accessible increment and decrement steppers.",
  states: ["disabled", "validation"],
  keywords: ["number", "input", "stepper"],
  docsPath: "/docs/components/number-field",
};
