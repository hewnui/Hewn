"use client";

import { Badge } from "@hewnui/ui";

export function BadgeDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 flex flex-col gap-4 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <Badge variant="solid" color="accent">Solid</Badge>
        <Badge variant="soft" color="accent">Soft</Badge>
        <Badge variant="outline" color="accent">Outline</Badge>
        <Badge variant="glass" color="accent">Glass</Badge>
        <Badge variant="dot" color="accent">Dot</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <Badge variant="soft" color="accent">Accent</Badge>
        <Badge variant="soft" color="muted">Muted</Badge>
        <Badge variant="soft" color="success">Success</Badge>
        <Badge variant="soft" color="warning">Warning</Badge>
        <Badge variant="soft" color="danger">Danger</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <Badge size="sm" variant="dot" color="success">System Normal</Badge>
        <Badge size="md" variant="dot" color="warning">Deployment Pending</Badge>
        <Badge size="lg" variant="dot" color="danger">High Latency</Badge>
      </div>
    </div>
  );
}
