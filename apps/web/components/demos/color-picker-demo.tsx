"use client";

import { ColorPicker } from "@hewnui/ui";

export function ColorPickerDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 flex flex-col gap-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)] sm:flex-row sm:items-start"
    >
      <ColorPicker label="Brand accent" defaultValue="#1a6b4a" />
      <ColorPicker
        label="Inline fill"
        variant="inline"
        defaultValue="#0f766e"
        description="Hex edits the value; OKLCH is display-only."
      />
    </div>
  );
}
