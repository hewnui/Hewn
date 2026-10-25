"use client";

import { Slider } from "@hewnui/ui";

export function SliderDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 grid gap-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <Slider
        label="Motion intensity"
        defaultValue={6}
        minValue={1}
        maxValue={10}
        description="Global motion dial for preview surfaces."
      />
      <Slider
        label="Glass blur"
        defaultValue={18}
        minValue={0}
        maxValue={40}
      />
    </div>
  );
}
