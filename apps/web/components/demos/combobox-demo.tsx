"use client";

import { Combobox, ComboboxItem } from "@hewnui/ui";

export function ComboboxDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <Combobox label="City" defaultSelectedKey="lisbon">
        <ComboboxItem id="lisbon">Lisbon</ComboboxItem>
        <ComboboxItem id="porto">Porto</ComboboxItem>
        <ComboboxItem id="faro">Faro</ComboboxItem>
      </Combobox>
    </div>
  );
}
