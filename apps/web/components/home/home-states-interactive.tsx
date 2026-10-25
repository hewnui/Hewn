"use client";

import {
  StateStage,
  stateNotes,
  type StateMode,
} from "@/components/home/home-states-stage";
import { useMotionMode } from "@hewnui/ui";
import { AnimatePresence, m } from "motion/react";
import { useId, useState } from "react";

const modes: StateMode[] = ["loading", "empty", "error", "ready"];

export function HomeStatesInteractive() {
  const { motionEnabled } = useMotionMode();
  const [mode, setMode] = useState<StateMode>("loading");
  const indicatorId = useId();
  const note = stateNotes[mode];

  return (
    <>
      <div
        role="group"
        aria-label="Preview state"
        className="inline-flex w-fit gap-1 rounded-[var(--kp-radius-md)] border border-border/70 bg-[color-mix(in_oklch,var(--kp-background)_65%,transparent)] p-1"
      >
        {modes.map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={mode === value}
            onClick={() => setMode(value)}
            className="relative inline-flex min-h-11 items-center rounded-[var(--kp-radius-sm)] px-3.5 text-sm capitalize transition-colors aria-pressed:text-accent-foreground"
          >
            {mode === value ? (
              <m.span
                aria-hidden
                layoutId={indicatorId}
                className="absolute inset-0 rounded-[var(--kp-radius-sm)] bg-accent"
                transition={
                  motionEnabled
                    ? { type: "spring", stiffness: 260, damping: 26 }
                    : { duration: 0 }
                }
              />
            ) : null}
            <span className="relative">{value}</span>
          </button>
        ))}
      </div>

      <div
        data-kp-surface
        className="mt-12 overflow-hidden rounded-[calc(var(--kp-radius-lg)+0.7rem)] border shadow-[var(--kp-shadow-surface)]"
      >
        <p
          aria-live="polite"
          className="border-b border-border/70 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:px-8"
        >
          {mode} — {note.line}
        </p>
        <div className="grid md:grid-cols-[1.15fr_0.85fr]">
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={mode}
                initial={motionEnabled ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: motionEnabled ? -6 : 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <StateStage mode={mode} />
              </m.div>
            </AnimatePresence>
          </div>
          <ul className="divide-y divide-border/60 border-t border-border/70 md:border-t-0 md:border-l">
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
      </div>
    </>
  );
}
