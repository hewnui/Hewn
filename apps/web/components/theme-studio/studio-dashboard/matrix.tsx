"use client";

import { Badge, Button, Progress, Skeleton, TextField } from "@hewnui/ui";

export function StudioDashboardMatrix() {
  return (
    <section className="space-y-3 rounded-[var(--kp-radius-md)] border border-border bg-surface/60 p-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Component matrix
        </h4>
        <Badge variant="soft" color="accent">
          Live tokens
        </Badge>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <TextField label="Search route" placeholder="ingest-queue" />
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
            <Button size="sm" variant="ghost">
              Ghost
            </Button>
          </div>
        </div>
        <div className="space-y-2.5">
          <Progress label="SLA coverage" value={82} />
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-7 rounded-[var(--kp-radius-sm)]" />
            <Skeleton className="h-7 rounded-[var(--kp-radius-sm)]" />
            <Skeleton className="h-7 rounded-[var(--kp-radius-sm)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
