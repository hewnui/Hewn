"use client";

import { LazyIsland } from "@/components/home/lazy-island";
import { stateNotes } from "@/components/home/state-notes";

function load() {
  return import("@/components/home/home-states-interactive").then((m) => ({
    default: m.HomeStatesInteractive,
  }));
}

function StatesFallback() {
  const note = stateNotes.loading;
  return (
    <>
      <div
        role="group"
        aria-label="Preview state"
        className="inline-flex w-fit gap-1 rounded-[var(--kp-radius-md)] border border-border/70 bg-[color-mix(in_oklch,var(--kp-background)_65%,transparent)] p-1"
      >
        {(["loading", "empty", "error", "ready"] as const).map((value) => (
          <span
            key={value}
            className={`inline-flex min-h-11 items-center rounded-[var(--kp-radius-sm)] px-3.5 text-sm capitalize ${
              value === "loading"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            }`}
          >
            {value}
          </span>
        ))}
      </div>
      <div
        data-kp-surface
        className="mt-12 overflow-hidden rounded-[calc(var(--kp-radius-lg)+0.7rem)] border shadow-[var(--kp-shadow-surface)]"
      >
        <p className="border-b border-border/70 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:px-8">
          loading — {note.line}
        </p>
        <ul className="divide-y divide-border/60">
          {note.checks.map((check) => (
            <li
              key={check}
              className="flex items-center gap-3 px-6 py-4 text-sm text-muted-foreground md:px-8"
            >
              <span
                aria-hidden
                className="size-1.5 shrink-0 rounded-full bg-accent"
              />
              {check}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function HomeStatesDeferred() {
  return <LazyIsland load={load} fallback={<StatesFallback />} />;
}
