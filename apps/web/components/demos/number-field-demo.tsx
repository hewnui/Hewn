"use client";

import { NumberField } from "@hewnui/ui";

export function NumberFieldDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 grid gap-4 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <NumberField
        label="Seat count"
        defaultValue={8}
        minValue={1}
        maxValue={100}
        description="Billed per active workspace seat."
      />
      <NumberField
        label="Latency budget"
        defaultValue={47.2}
        formatOptions={{ style: "unit", unit: "millisecond" }}
        minValue={0}
      />
    </div>
  );
}
