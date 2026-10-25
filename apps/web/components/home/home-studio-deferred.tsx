"use client";

import { LazyIsland } from "@/components/home/lazy-island";

function load() {
  return import("@/components/home/home-studio-ladder").then((m) => ({
    default: m.HomeStudioLadder,
  }));
}

function StudioFallback() {
  return (
    <div
      aria-hidden
      className="min-h-[14rem] border-y border-border/70 bg-[color-mix(in_oklch,var(--kp-muted)_20%,transparent)]"
    />
  );
}

export function HomeStudioDeferred() {
  return <LazyIsland load={load} fallback={<StudioFallback />} />;
}
