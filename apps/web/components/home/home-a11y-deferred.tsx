"use client";

import { LazyIsland } from "@/components/home/lazy-island";

function load() {
  return import("@/components/home/home-a11y-interactive").then((m) => ({
    default: m.HomeA11yInteractive,
  }));
}

function A11yFallback() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-sm text-muted-foreground">
        Interactive controls hydrate when this section is near the viewport —
        keyboard map above is always in the document.
      </p>
      <p className="shrink-0 border-l-2 border-accent/50 pl-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">
        Tab through this row.
        <br />
        The ring is intentional.
      </p>
    </div>
  );
}

export function HomeA11yDeferred() {
  return <LazyIsland load={load} fallback={<A11yFallback />} />;
}
