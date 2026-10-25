"use client";

import { LazyIsland } from "@/components/home/lazy-island";

function load() {
  return import("@/components/home/home-material-interactive").then((m) => ({
    default: m.HomeMaterialInteractive,
  }));
}

function MaterialFallback() {
  return (
    <div className="relative overflow-hidden">
      <div className="relative grid border-y border-border/70 md:grid-cols-2">
        <div className="flex min-h-[19rem] flex-col justify-end border-b border-border/70 p-6 md:min-h-[24rem] md:border-r md:border-b-0 md:p-10">
          <div className="flex min-h-[9rem] flex-col justify-between rounded-[var(--kp-radius-lg)] border border-white/12 bg-surface p-5 shadow-[var(--kp-shadow-surface)] md:min-h-[11rem]">
            <span className="text-lg font-semibold tracking-tight">Solid</span>
            <span className="mt-6 block max-w-[34ch] text-sm leading-relaxed text-pretty text-muted-foreground">
              Opaque surface, tinted layered shadow, no compositing cost.
            </span>
          </div>
        </div>
        <div className="flex min-h-[19rem] flex-col justify-end p-6 md:min-h-[24rem] md:p-10">
          <div className="flex min-h-[9rem] flex-col justify-between rounded-[var(--kp-radius-lg)] border border-white/12 bg-[color-mix(in_oklch,var(--kp-surface)_45%,transparent)] p-5 shadow-[var(--kp-shadow-surface),inset_0_1px_0_oklch(1_0_0/22%)] md:min-h-[11rem]">
            <span className="text-lg font-semibold tracking-tight">Glass</span>
            <span className="mt-6 block max-w-[34ch] text-sm leading-relaxed text-pretty text-muted-foreground">
              Tinted frost, saturation lift, and a 1px inner refraction edge.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeMaterialIsland() {
  return <LazyIsland load={load} fallback={<MaterialFallback />} />;
}
