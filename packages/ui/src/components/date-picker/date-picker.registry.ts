import type { RegistryItem } from "@hewnui/registry";

export const datePickerRegistry: RegistryItem = {
  name: "date-picker",
  type: "component",
  tier: "free",
  category: "date-and-time",
  title: "DatePicker",
  description: "Accessible date field with calendar popover.",
  dependencies: ["@internationalized/date"],
  states: ["disabled", "validation"],
  keywords: ["date", "calendar", "field"],
  docsPath: "/docs/components/date-picker",
};
