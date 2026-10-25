"use client";

import { Button, Switch } from "@hewnui/ui";
import { StudioDashboardMatrix } from "./matrix";
import { StudioStatusPulse } from "./status-pulse";

const events = [
  {
    id: "1",
    title: "Canary 14% healthy",
    detail: "Edge cluster · eu-west",
    time: "2m",
    live: true,
  },
  {
    id: "2",
    title: "Token sync complete",
    detail: "Meridian draft pack published",
    time: "18m",
    live: false,
  },
  {
    id: "3",
    title: "Queue depth eased",
    detail: "Ingest backlog 4,812 → 1,240",
    time: "41m",
    live: false,
  },
  {
    id: "4",
    title: "Nightly snapshot",
    detail: "Retention window OK",
    time: "3h",
    live: false,
  },
] as const;

export function StudioDashboardWorkspace() {
  return (
    <section className="space-y-5 p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Live stream
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Accent and surfaces update as you author.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Switch defaultSelected>Page on incident</Switch>
          <Button size="sm" variant="secondary">
            Pause
          </Button>
        </div>
      </div>
      <ol className="divide-y divide-border border-y border-border">
        {events.map((event) => (
          <li
            key={event.id}
            className="flex items-start gap-3 py-3.5 first:pt-3 last:pb-3"
          >
            <div className="mt-1.5">
              <StudioStatusPulse tone={event.live ? "accent" : "muted"} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-medium text-foreground">
                  {event.title}
                </p>
                <time className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  {event.time}
                </time>
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {event.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap gap-2">
        <Button size="sm">Acknowledge</Button>
        <Button size="sm" variant="outline">
          Open runbook
        </Button>
        <Button size="sm" variant="ghost">
          Mute region
        </Button>
      </div>
      <StudioDashboardMatrix />
    </section>
  );
}
