"use client";

import { Button, Tooltip, TooltipTrigger } from "@hewnui/ui";

export function TooltipDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 flex flex-wrap gap-3 overflow-visible rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <TooltipTrigger delay={200}>
        <Button variant="secondary">Theme packs</Button>
        <Tooltip>Forest, Tide, Graphite, and more</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={200}>
        <Button variant="ghost">Motion</Button>
        <Tooltip placement="bottom">Respects reduced-motion preferences</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
