"use client";

import { Checkbox, CheckboxGroup } from "@hewnui/ui";

export function CheckboxGroupDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 grid gap-4 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <CheckboxGroup
        label="Notify me about"
        defaultValue={["billing", "security"]}
        description="Choose the digests you want in inbox."
      >
        <Checkbox value="billing">Billing events</Checkbox>
        <Checkbox value="security">Security alerts</Checkbox>
        <Checkbox value="product">Product updates</Checkbox>
      </CheckboxGroup>
    </div>
  );
}
