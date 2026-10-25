export const dateRangePickerAi = {
  schemaVersion: 1,
  name: "date-range-picker",
  exportName: "DateRangePicker",
  importPath: "@hewnui/ui/date-range-picker",
  compoundParts: [],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Accessible label for the range field group.",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Helper text announced with the field.",
    },
    {
      name: "errorMessage",
      type: "ReactNode",
      description: "Validation message shown when the field is invalid.",
    },
    {
      name: "value",
      type: "{ start: DateValue; end: DateValue }",
      description: "Controlled selected range.",
    },
    {
      name: "defaultValue",
      type: "{ start: DateValue; end: DateValue }",
      description: "Uncontrolled initial range.",
    },
    {
      name: "onChange",
      type: "(value: RangeValue<DateValue> | null) => void",
      description: "Called when the selected range changes.",
    },
    {
      name: "minValue",
      type: "DateValue",
      description: "Earliest selectable date.",
    },
    {
      name: "maxValue",
      type: "DateValue",
      description: "Latest selectable date.",
    },
    {
      name: "isDateUnavailable",
      type: "(date: DateValue) => boolean",
      description: "Marks individual dates as unavailable.",
    },
    {
      name: "showPresets",
      type: "boolean",
      description: "Show quick-select presets in the popover.",
      default: "true",
    },
    {
      name: "presets",
      type: "DateRangePresetId[] | DateRangePreset[]",
      description:
        "Built-in preset ids or custom presets (Today, Last 7/30 days, This month).",
    },
    {
      name: "startName",
      type: "string",
      description: "Form name for the start date hidden input.",
    },
    {
      name: "endName",
      type: "string",
      description: "Form name for the end date hidden input.",
    },
    {
      name: "isDisabled",
      type: "boolean",
      description: "Disables editing and calendar interaction.",
    },
    {
      name: "isRequired",
      type: "boolean",
      description: "Marks the range as required for form validation.",
    },
    {
      name: "className",
      type: "string",
      description: "Optional class names merged onto the root.",
    },
  ],
  variants: [],
  states: ["disabled", "validation"],
  keyboard: [
    "Tab moves between start segments, end segments, and the calendar trigger",
    "Arrow keys edit focused date segments",
    "Enter or Space on the trigger opens the range calendar",
    "Arrow keys navigate the calendar grid; Enter selects a date",
    "Escape closes the popover",
  ],
  tokens: [
    "--kp-accent",
    "--kp-accent-foreground",
    "--kp-foreground",
    "--kp-background",
    "--kp-border",
    "--kp-muted",
    "--kp-radius-md",
    "--kp-radius-panel",
    "--kp-motion-duration",
  ],
  install: {
    npm: "npm install @hewnui/ui",
    cli: "npx hewnui@latest add date-range-picker",
  },
  examples: [
    {
      title: "Basic",
      code: 'import { DateRangePicker } from "@hewnui/ui/date-range-picker";\n\n<DateRangePicker label="Travel dates" />',
    },
    {
      title: "With presets",
      code: '<DateRangePicker label="Report range" showPresets presets={["today", "last-7-days", "this-month"]} />',
    },
  ],
} as const;
