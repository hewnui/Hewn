"use client";

import { Button } from "@hewnui/ui";

export function ButtonDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 flex flex-col gap-4 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="glass">Glass</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="glow">Glow</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="danger">Danger</Button>
        <Button variant="danger-outline">Danger Outline</Button>
        <Button variant="danger-soft">Danger Soft</Button>
        <Button size="sm" variant="soft">Small</Button>
        <Button size="lg" variant="glow">Large Glow</Button>
        <Button isLoading>Saving</Button>
        <Button isDisabled variant="secondary">Disabled</Button>
      </div>
    </div>
  );
}
