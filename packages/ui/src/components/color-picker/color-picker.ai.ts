export const colorPickerAi = {
  schemaVersion: 1,
  name: "color-picker",
  exportName: "ColorPicker",
  importPath: "@hewnui/ui/color-picker",
  compoundParts: [],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Accessible label for the color picker.",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Helper text shown below the control.",
    },
    {
      name: "errorMessage",
      type: "ReactNode",
      description: "Validation message announced when invalid.",
    },
    {
      name: "variant",
      type: '"popover" | "inline"',
      description: "Popover trigger or always-visible panel.",
      default: '"popover"',
    },
    {
      name: "value",
      type: "string",
      description: "Controlled hex color value.",
    },
    {
      name: "defaultValue",
      type: "string",
      description: "Uncontrolled initial hex color.",
      default: '"#1a6b4a"',
    },
    {
      name: "onChange",
      type: "(hex: string) => void",
      description: "Called with a normalized hex string when the color changes.",
    },
    {
      name: "presets",
      type: "string[]",
      description: "Hex swatch presets shown below the editors.",
    },
    {
      name: "showAlpha",
      type: "boolean",
      description: "Show the alpha channel slider.",
      default: "true",
    },
    {
      name: "showOklch",
      type: "boolean",
      description:
        "Show a read-only OKLCH readout (display-only; React Aria edits hex/hsl/hsb).",
      default: "true",
    },
    {
      name: "name",
      type: "string",
      description: "Hidden input name for HTML form submission of the hex value.",
    },
    {
      name: "isDisabled",
      type: "boolean",
      description: "Disables all color editors.",
    },
    {
      name: "isRequired",
      type: "boolean",
      description: "Marks the control as required for forms.",
    },
    {
      name: "className",
      type: "string",
      description: "Optional class names merged onto the root.",
    },
  ],
  variants: [
    {
      name: "variant",
      values: ["popover", "inline"],
    },
  ],
  states: ["disabled", "validation"],
  keyboard: [
    "Tab moves through the trigger, area, sliders, hex field, and swatches",
    "Arrow keys adjust the focused color area or slider channel",
    "Enter or Space opens the popover variant",
    "Escape closes the popover",
  ],
  tokens: [
    "--kp-accent",
    "--kp-foreground",
    "--kp-surface",
    "--kp-border",
    "--kp-radius-md",
    "--kp-radius-panel",
    "--kp-motion-duration",
  ],
  install: {
    npm: "npm install @hewnui/ui",
    cli: "npx hewnui@latest add color-picker",
  },
  examples: [
    {
      title: "Popover",
      code: 'import { ColorPicker } from "@hewnui/ui/color-picker";\n\n<ColorPicker label="Brand accent" defaultValue="#1a6b4a" />',
    },
    {
      title: "Inline",
      code: '<ColorPicker label="Fill" variant="inline" showOklch />',
    },
  ],
} as const;
