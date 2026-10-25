"use client";

import { useMotionMode } from "@hewnui/ui";
import { m } from "motion/react";
import { memo } from "react";

/** Static spark bars — no interval ticks above the fold. */
const values = [22, 30, 26, 38, 34, 44, 40, 52, 46, 58] as const;

const width = 72;
const height = 48;
const padX = 4;
const padY = 4;

function HomeHeroChartInner() {
  const { motionEnabled } = useMotionMode();
  const max = Math.max(...values);
  const barCount = values.length;
  const gap = 1.6;
  const barWidth = (width - padX * 2 - gap * (barCount - 1)) / barCount;

  return (
    <div
      data-kp-surface
      aria-hidden
      className="relative flex size-16 items-end justify-center overflow-hidden rounded-[var(--kp-radius-lg)] border bg-surface/85 p-1.5 shadow-[var(--kp-shadow-surface)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-2 top-1.5 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="relative h-full w-full overflow-visible"
      >
        {values.map((value, index) => {
          const barHeight = Math.max(4, (value / max) * (height - padY * 2));
          const x = padX + index * (barWidth + gap);
          const y = height - padY - barHeight;
          const isLast = index === values.length - 1;

          return (
            <m.rect
              key={`bar-${index}`}
              x={x}
              width={barWidth}
              rx={1.2}
              fill="var(--kp-accent)"
              fillOpacity={isLast ? 1 : 0.35 + index * 0.05}
              initial={motionEnabled ? { height: 4, y: height - padY - 4 } : false}
              animate={{ height: barHeight, y }}
              transition={
                motionEnabled
                  ? {
                      type: "spring",
                      stiffness: 120,
                      damping: 18,
                      delay: index * 0.03,
                    }
                  : { duration: 0 }
              }
            />
          );
        })}
      </svg>
    </div>
  );
}

export const HomeHeroChart = memo(HomeHeroChartInner);
