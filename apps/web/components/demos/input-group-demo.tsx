"use client";

import { InputGroup } from "@hewnui/ui";

export function InputGroupDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 grid gap-4 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <InputGroup
        label="Site"
        prefix="https://"
        suffix=".studio"
        placeholder="andruia"
        description="Public marketing hostname."
      />
      <InputGroup label="Budget" prefix="$" suffix="USD" placeholder="4,280" />
    </div>
  );
}
