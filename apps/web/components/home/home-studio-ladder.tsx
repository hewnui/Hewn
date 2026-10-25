"use client";

import { studio } from "@/components/home/content-product";
import { useMotionMode } from "@hewnui/ui";
import { m } from "motion/react";
import { memo } from "react";

const sweep = {
  duration: 9,
  repeat: Number.POSITIVE_INFINITY,
  ease: "easeInOut" as const,
};

function HomeStudioLadderInner() {
  const { motionEnabled } = useMotionMode();

  return (
    // Backdrop is deliberately off-background so the palest swatches still read.
    <div className="relative border-y border-border/70 bg-[color-mix(in_oklch,var(--kp-foreground)_9%,var(--kp-background))]">
      {motionEnabled ? (
        <m.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 z-10 w-[28%] bg-gradient-to-r from-transparent via-[color-mix(in_oklch,var(--kp-foreground)_7%,transparent)] to-transparent"
          animate={{ x: ["-40%", "460%"] }}
          transition={sweep}
        />
      ) : null}

      <ul
        tabIndex={0}
        role="list"
        aria-label="Theme Studio ladder"
        className="m-0 grid list-none auto-cols-[minmax(7.5rem,1fr)] grid-flow-col overflow-x-auto overscroll-x-contain p-0"
      >
        {studio.ladder.map((entry) => (
          <li
            key={entry.token}
            className="group relative flex min-w-0 flex-col not-last:border-r not-last:border-border/70"
          >
            <div className="relative flex h-40 items-end overflow-hidden md:h-56">
              <span
                aria-hidden
                className="w-full origin-bottom transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-[1.06]"
                style={{
                  height: `${entry.height}%`,
                  background: `var(${entry.token})`,
                  boxShadow: "inset 0 1px 0 oklch(1 0 0 / 14%)",
                }}
              />
              {"clamped" in entry && entry.clamped ? (
                <span className="absolute inset-x-2 top-2 rounded-full border border-accent/40 bg-[color-mix(in_oklch,var(--kp-background)_82%,transparent)] px-2 py-1 text-center font-mono text-[9px] leading-tight uppercase tracking-[0.1em] text-accent">
                  {studio.clampNote}
                </span>
              ) : null}
            </div>

            <div className="border-t border-border/70 px-3 py-3">
              <p className="truncate font-mono text-[10px] tracking-tight text-foreground">
                {entry.token}
              </p>
              <p className="mt-1 truncate text-[11px] text-muted-foreground">
                {entry.role}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const HomeStudioLadder = memo(HomeStudioLadderInner);
