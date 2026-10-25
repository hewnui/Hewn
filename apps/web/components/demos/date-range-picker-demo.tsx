"use client";

import { DateRangePicker } from "@hewnui/ui";

export function DateRangePickerDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <DateRangePicker
        label="Travel dates"
        description="Pick a start and end, or use a preset."
      />
    </div>
  );
}
