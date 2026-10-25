"use client";

import { LazyIsland } from "@/components/home/lazy-island";

function load() {
  return import("@/components/home/home-motion-interactive").then((m) => ({
    default: m.HomeMotionInteractive,
  }));
}

function MotionFallback() {
  return (
    <div>
      <p className="inline-flex min-h-8 items-center gap-2 rounded-full border border-border/70 bg-[color-mix(in_oklch,var(--kp-background)_60%,transparent)] px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
        Motion full — perpetual demos running
      </p>
      <div
        aria-hidden
        className="mt-14 min-h-[12rem] rounded-[var(--kp-radius-lg)] border border-border/70 bg-[color-mix(in_oklch,var(--kp-background)_50%,transparent)]"
      />
    </div>
  );
}

export function HomeMotionDeferred() {
  return <LazyIsland load={load} fallback={<MotionFallback />} />;
}
