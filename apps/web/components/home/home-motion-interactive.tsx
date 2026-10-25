"use client";

import { HomeMotionIsland } from "@/components/home/home-motion-island";
import { useMotionMode } from "@hewnui/ui";

export function HomeMotionInteractive() {
  const { motionEnabled, reducedMotion, effectiveMode } = useMotionMode();

  const status = reducedMotion
    ? `System reduced-motion · effective ${effectiveMode}`
    : motionEnabled
      ? "Motion full — perpetual demos running"
      : `Motion ${effectiveMode} — static proof only`;

  return (
    <div>
      <p className="inline-flex min-h-8 items-center gap-2 rounded-full border border-border/70 bg-[color-mix(in_oklch,var(--kp-background)_60%,transparent)] px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        <span
          aria-hidden
          className={`size-1.5 rounded-full ${
            motionEnabled ? "bg-accent" : "bg-muted-foreground/60"
          }`}
        />
        {status}
      </p>
      <div className="mt-14">
        <HomeMotionIsland />
      </div>
    </div>
  );
}
