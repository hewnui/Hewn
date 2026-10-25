"use client";

import { positions } from "@/components/home/content";
import { useMotionMode } from "@hewnui/ui";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";

const dwell = 5200;

export function HomePositionsInteractive() {
  const { motionEnabled } = useMotionMode();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const active = positions[index] ?? positions[0]!;
  const rotating = playing && motionEnabled;

  useEffect(() => {
    if (!rotating) return;
    const id = window.setTimeout(() => {
      setIndex((value) => (value + 1) % positions.length);
    }, dwell);
    return () => window.clearTimeout(id);
  }, [rotating, index]);

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        {motionEnabled ? (
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            className="inline-flex min-h-10 items-center gap-2 rounded-full px-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-[color,background-color,transform] hover:bg-muted/50 hover:text-foreground active:scale-[0.96]"
          >
            {playing ? (
              <PauseIcon aria-hidden className="size-3.5" weight="fill" />
            ) : (
              <PlayIcon aria-hidden className="size-3.5" weight="fill" />
            )}
            {playing ? "Pause" : "Play"}
          </button>
        ) : null}
      </div>

      <div className="grid gap-10 md:grid-cols-[1.4fr_0.6fr] md:items-end">
        <div className="min-h-[220px]">
          <AnimatePresence mode="wait" initial={false}>
            <m.p
              key={active.id}
              initial={motionEnabled ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: motionEnabled ? -12 : 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="max-w-[24ch] text-3xl font-semibold leading-[1.15] tracking-tight text-balance md:max-w-[30ch] md:text-5xl"
            >
              {active.statement}
            </m.p>
          </AnimatePresence>
        </div>

        <div
          role="group"
          aria-label="House rules"
          className="flex flex-col gap-2 md:items-end"
        >
          {positions.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
              className="inline-flex min-h-10 items-center justify-between gap-4 rounded-[var(--kp-radius-md)] border px-3 text-left text-sm transition-[transform,background-color,border-color] hover:bg-muted/40 active:scale-[0.96] aria-pressed:border-accent aria-pressed:bg-accent/10 md:min-w-[16rem]"
            >
              <span>{item.label}</span>
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                0{i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
