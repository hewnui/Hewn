"use client";

import { useMotionMode } from "@hewnui/ui";
import { m } from "motion/react";
import type { ReactNode } from "react";

export function DockDivider() {
  return (
    <span aria-hidden className="mx-0.5 h-7 w-px shrink-0 bg-border/80" />
  );
}

export function ThemeSwatch({
  active,
  theme,
  label,
  onSelect,
}: {
  active: boolean;
  theme: string;
  label: string;
  onSelect: () => void;
}) {
  const { motionEnabled } = useMotionMode();
  const mode = theme === "ember" ? "dark" : "light";

  return (
    <button
      type="button"
      aria-label={`${label} theme`}
      aria-pressed={active}
      title={label}
      onClick={onSelect}
      className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-[transform,background-color] duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)] hover:bg-muted/50 active:scale-[0.96]"
    >
      {active ? (
        motionEnabled ? (
          <m.span
            layoutId="appearance-theme-ring"
            aria-hidden
            className="absolute inset-0.5 rounded-full border-2 border-accent"
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        ) : (
          <span
            aria-hidden
            className="absolute inset-0.5 rounded-full border-2 border-accent"
          />
        )
      ) : null}
      <span
        aria-hidden
        data-theme={theme}
        data-mode={mode}
        className="relative size-3.5 rounded-full bg-accent shadow-[inset_0_1px_0_oklch(1_0_0/35%),0_0_0_1px_oklch(0_0_0/14%)]"
      />
    </button>
  );
}

export function InstrumentSegment({
  active,
  children,
  label,
  onSelect,
}: {
  active: boolean;
  children: ReactNode;
  label: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      title={label}
      onClick={onSelect}
      className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center rounded-lg border border-transparent px-2 text-xs font-medium capitalize text-muted-foreground transition-[transform,background-color,color,box-shadow,border-color] duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)] hover:bg-muted/55 hover:text-foreground active:scale-[0.96] aria-pressed:border-accent/45 aria-pressed:bg-surface-raised aria-pressed:text-accent aria-pressed:shadow-[var(--kp-shadow-surface)]"
    >
      <span className="inline-flex size-4 shrink-0 items-center justify-center">
        {children}
      </span>
    </button>
  );
}
