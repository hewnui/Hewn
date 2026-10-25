"use client";

import { Checkbox } from "@hewnui/ui";

export function CheckboxDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 flex flex-col gap-4 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <Checkbox defaultSelected>Email product updates</Checkbox>
      <Checkbox>Include beta releases</Checkbox>
      <Checkbox isIndeterminate>Partial workspace sync</Checkbox>
      <Checkbox isInvalid>Accept terms to continue</Checkbox>
      <Checkbox isDisabled>Archived workspace</Checkbox>
      <Checkbox isDisabled defaultSelected>
        Inherited from plan
      </Checkbox>
    </div>
  );
}
