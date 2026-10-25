"use client";

import { Button, Checkbox, Switch } from "@hewnui/ui";

export function HomeA11yInteractive() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
        <Switch defaultSelected>Announce status changes</Switch>
        <Checkbox defaultSelected>Include keyboard map in docs</Checkbox>
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Save preferences</Button>
          <Button size="sm" variant="ghost">
            Reset
          </Button>
        </div>
      </div>
      <p className="shrink-0 border-l-2 border-accent/50 pl-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">
        Tab through this row.
        <br />
        The ring is intentional.
      </p>
    </div>
  );
}
