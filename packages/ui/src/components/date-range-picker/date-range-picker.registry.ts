import type { RegistryItem } from "@hewnui/registry";

export const dateRangePickerRegistry: RegistryItem = {
  name: "date-range-picker",
  type: "component",
  tier: "free",
  category: "date-and-time",
  title: "DateRangePicker",
  description:
    "Accessible start and end date fields with a range calendar popover and optional presets.",
  dependencies: ["@internationalized/date"],
  states: ["disabled", "validation"],
  keywords: ["date", "range", "calendar", "presets", "field"],
  docsPath: "/docs/components/date-range-picker",
};
