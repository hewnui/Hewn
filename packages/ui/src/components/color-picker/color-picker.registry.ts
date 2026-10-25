import type { RegistryItem } from "@hewnui/registry";

export const colorPickerRegistry: RegistryItem = {
  name: "color-picker",
  type: "component",
  tier: "free",
  category: "pickers",
  title: "ColorPicker",
  description:
    "Composable color picker with area, hue and alpha sliders, hex field, and swatch presets.",
  dependencies: [],
  states: ["disabled", "validation"],
  keywords: ["color", "hex", "oklch", "swatch", "picker"],
  docsPath: "/docs/components/color-picker",
};
