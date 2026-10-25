"use client";

import {
  Button,
  Popover,
  PopoverBody,
  PopoverTitle,
  PopoverTrigger,
} from "@hewnui/ui";

export function PopoverDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <PopoverTrigger>
        <Button variant="secondary">Workspace usage</Button>
        <Popover>
          <PopoverTitle>July throughput</PopoverTitle>
          <PopoverBody>
            12.4k requests with a median latency of 47.2ms across staging.
          </PopoverBody>
        </Popover>
      </PopoverTrigger>
    </div>
  );
}
