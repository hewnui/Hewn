"use client";

import { Radio, RadioGroup } from "@hewnui/ui";

export function RadioGroupDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 grid gap-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <RadioGroup
        label="Deploy target"
        defaultValue="staging"
        description="Pick where this release lands first."
      >
        <Radio value="local">Local preview</Radio>
        <Radio value="staging">Staging</Radio>
        <Radio value="production">Production</Radio>
      </RadioGroup>
      <div className="border-t border-[color-mix(in_oklch,var(--kp-border)_70%,transparent)] pt-5">
        <RadioGroup
          label="Density"
          orientation="horizontal"
          defaultValue="comfortable"
        >
          <Radio value="compact">Compact</Radio>
          <Radio value="comfortable">Comfortable</Radio>
        </RadioGroup>
      </div>
    </div>
  );
}
