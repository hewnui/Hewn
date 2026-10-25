"use client";

import { DatePicker } from "@hewnui/ui";

export function DatePickerDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 flex flex-col gap-4 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <DatePicker label="Ship date" />
      <DatePicker label="Launch window" isRequired />
      <DatePicker label="Archived sprint" isDisabled />
    </div>
  );
}
