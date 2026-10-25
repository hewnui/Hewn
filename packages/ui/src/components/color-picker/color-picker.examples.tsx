"use client";

import { ColorPicker } from "./color-picker";

export function ColorPickerPopoverExample() {
  return <ColorPicker label="Brand accent" defaultValue="#1a6b4a" />;
}

export function ColorPickerInlineExample() {
  return (
    <ColorPicker
      label="Fill color"
      variant="inline"
      showOklch
      description="Hex is editable; OKLCH is display-only."
    />
  );
}

export function ColorPickerNoAlphaExample() {
  return (
    <ColorPicker
      label="Opaque only"
      showAlpha={false}
      presets={["#1a6b4a", "#0f766e", "#b45309", "#334155"]}
    />
  );
}
