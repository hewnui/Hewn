"use client";

import {
  Button,
  Progress,
  Switch,
  useMotionMode,
  type MotionMode,
} from "@hewnui/ui";
import { m } from "motion/react";

const modes: MotionMode[] = ["full", "reduced", "off"];

export function MotionDemo() {
  const {
    motion,
    effectiveMode,
    motionEnabled,
    reducedMotion,
    setMotion,
  } = useMotionMode();

  return (
    <div
      data-kp-surface
      className="space-y-5 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border border-border/70 bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Live mode
          </p>
          <p className="mt-1 text-sm text-foreground">
            Preference <span className="font-medium">{motion}</span>
            <span className="text-border"> · </span>
            Effective <span className="font-medium">{effectiveMode}</span>
            {reducedMotion ? (
              <span className="text-muted-foreground">
                {" "}
                (OS reduced-motion active)
              </span>
            ) : null}
          </p>
        </div>
        <div
          role="group"
          aria-label="Motion mode"
          className="flex flex-wrap gap-1"
        >
          {modes.map((value) => {
            const blocked = reducedMotion && value === "full";
            return (
              <button
                key={value}
                type="button"
                disabled={blocked}
                aria-pressed={motion === value}
                onClick={() => setMotion(value)}
                className={`min-h-10 rounded-[var(--kp-radius-md)] border px-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-[background-color,color,transform,opacity] duration-[var(--kp-motion-duration-fast)] ease-[var(--kp-motion-ease-standard)] active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40 ${
                  motion === value
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border/70 bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <Progress label="Sync" value={68} />
        <div className="flex items-center gap-3">
          <Switch defaultSelected>Alerts</Switch>
          <Button variant="primary">Save</Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[var(--kp-radius-md)] border border-border/60 bg-muted/30 p-4">
        <m.div
          key={effectiveMode}
          className="h-2 w-24 rounded-full bg-accent"
          initial={motionEnabled ? { x: -24, opacity: 0.4 } : false}
          animate={{ x: 0, opacity: 1 }}
          transition={
            motionEnabled
              ? { type: "spring", stiffness: 420, damping: 30 }
              : { duration: 0 }
          }
        />
        <p className="mt-3 text-sm text-muted-foreground">
          {effectiveMode === "full"
            ? "Full mode: springs, press scale, and chart draws run."
            : effectiveMode === "reduced"
              ? "Reduced mode: MotionConfig forces reducedMotion; decorative motion stops."
              : "Off mode: no motion — functional static fallbacks only."}
        </p>
      </div>
    </div>
  );
}
