"use client";

import { Progress } from "@hewnui/ui";

export function ProgressDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 space-y-5 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <Progress variant="default" label="Default progress" value={65} />
      <Progress variant="gradient" label="Gradient fill" value={82} />
      <Progress variant="glass" label="Glass material track" value={45} />
      <Progress variant="success" label="Success state" value={100} />
      <Progress variant="danger" label="Storage alert" value={92} />
      <Progress label="Indeterminate" isIndeterminate />
    </div>
  );
}
