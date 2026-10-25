"use client";

import { Button } from "@hewnui/ui";
import {
  ChartLineUpIcon,
  GearIcon,
  MagnifyingGlassIcon,
  UsersIcon,
} from "@phosphor-icons/react";

const nav = [
  { icon: ChartLineUpIcon, label: "Pulse", active: true },
  { icon: UsersIcon, label: "Crew", active: false },
  { icon: GearIcon, label: "Config", active: false },
] as const;

export function StudioDashboardChrome() {
  return (
    <header className="flex items-stretch border-b border-border">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 px-4 py-3 md:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className="grid size-8 place-items-center rounded-[var(--kp-radius-md)] bg-accent text-xs font-semibold text-accent-foreground"
              aria-hidden
            >
              M
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight text-foreground">
                Meridian
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Ops desk
              </p>
              <p className="mt-0.5 font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
                Fictional company · sample data
              </p>
            </div>
          </div>
          <div className="ml-auto hidden items-center gap-2 sm:flex">
            <span className="inline-flex min-h-10 items-center gap-2 rounded-[var(--kp-radius-md)] border border-border bg-surface px-3 text-xs text-muted-foreground">
              <MagnifyingGlassIcon className="size-3.5" weight="bold" />
              Search routes
            </span>
            <Button size="sm">Ship release</Button>
          </div>
          <span
            className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-xs font-medium text-foreground sm:ml-1"
            aria-hidden
          >
            NH
          </span>
        </div>
        <nav
          aria-label="Meridian sections"
          className="flex gap-1 overflow-x-auto border-t border-border/70 px-2 py-1.5 md:px-3"
        >
          {nav.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              type="button"
              {...(active ? { "aria-current": "page" as const } : {})}
              className={[
                "flex min-h-10 shrink-0 items-center gap-2 rounded-[var(--kp-radius-md)] px-3 text-sm transition-[background-color,color,transform] duration-150 active:scale-[0.96]",
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              ].join(" ")}
            >
              <Icon className="size-4" weight={active ? "bold" : "regular"} />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
