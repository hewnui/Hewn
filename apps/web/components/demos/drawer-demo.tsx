"use client";

import { Button, Drawer, DrawerTrigger } from "@hewnui/ui";

export function DrawerDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 flex flex-wrap gap-3 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <DrawerTrigger>
        <Button variant="secondary">Open filters</Button>
        <Drawer title="Filters" side="right">
          Narrow by role, score, and last active window. Drawer keeps dense ops
          tools reachable without leaving the page.
        </Drawer>
      </DrawerTrigger>
      <DrawerTrigger>
        <Button variant="outline">Open nav</Button>
        <Drawer title="Workspace" side="left">
          Jump between packs, Theme Lab, and the component gallery from a docked
          left panel.
        </Drawer>
      </DrawerTrigger>
    </div>
  );
}
