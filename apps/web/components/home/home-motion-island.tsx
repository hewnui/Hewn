"use client";

import { Badge, useMotionMode } from "@hewnui/ui";
import { m } from "motion/react";
import { memo, useEffect, useState } from "react";

const tasks = [
  { id: "ingest", label: "Normalize ledger feed", meta: "Queue · 3,104 rows" },
  { id: "review", label: "Flag 12.4% drift", meta: "Ledger close · FY26 Q1" },
  { id: "ship", label: "Publish ops digest", meta: "Edge cluster · us-east" },
] as const;

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

function MotionIslandInner() {
  const { motionEnabled } = useMotionMode();
  const [order, setOrder] = useState(() => tasks.map((task) => task.id));
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    if (!motionEnabled) return;
    const id = window.setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        const first = next.shift();
        if (first) next.push(first);
        return next;
      });
      setPulse((value) => !value);
    }, 2800);
    return () => window.clearInterval(id);
  }, [motionEnabled]);

  const sorted = order
    .map((id) => tasks.find((task) => task.id === id))
    .filter((task) => task !== undefined);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Priority loop — reordering with layout transitions
        </p>
        <Badge variant="dot" color={pulse ? "success" : "accent"}>
          {pulse ? "Live" : "Syncing"}
        </Badge>
      </div>
      {/* Horizontal on desktop so the reorder reads across the full band. */}
      <ul className="grid gap-3 md:grid-cols-3">
        {sorted.map((task, index) => (
          <m.li
            layout
            key={task.id}
            data-kp-surface
            className="rounded-[var(--kp-radius-lg)] border p-5 shadow-[var(--kp-shadow-surface)] md:p-6"
            transition={motionEnabled ? spring : { duration: 0 }}
          >
            <span className="font-mono text-[11px] tabular-nums text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 text-base font-medium tracking-tight text-balance">
              {task.label}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">{task.meta}</p>
          </m.li>
        ))}
      </ul>
    </div>
  );
}

export const HomeMotionIsland = memo(MotionIslandInner);
