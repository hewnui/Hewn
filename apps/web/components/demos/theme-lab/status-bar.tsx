"use client";

import {
  themePacks,
  useMaterial,
  useMotionMode,
  useRadius,
  useTheme,
} from "@hewnui/ui";

const chips = [
  "theme",
  "mode",
  "material",
  "radius",
  "motion",
] as const;

export function ThemeLabStatusBar() {
  const { mode, theme } = useTheme();
  const { material } = useMaterial();
  const { radius } = useRadius();
  const { effectiveMode, reducedMotion } = useMotionMode();
  const motionLabel = reducedMotion
    ? `${effectiveMode} (os)`
    : effectiveMode;

  const values: Record<(typeof chips)[number], string> = {
    theme,
    mode,
    material,
    radius,
    motion: motionLabel,
  };

  return (
    <header
      data-kp-surface
      className="rounded-[calc(var(--kp-radius-lg)+0.35rem)] border bg-surface px-4 py-4 shadow-[var(--kp-shadow-surface)] md:px-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Active configuration
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight capitalize text-balance">
            {theme} · {mode}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sidebar appearance controls style this page and the docs shell.
            Modes: {themePacks[theme].join(", ")}.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 lg:grid-cols-5">
          {chips.map((key) => (
            <div key={key} className="min-w-[5.5rem]">
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {key}
              </dt>
              <dd className="mt-0.5 text-sm font-medium capitalize tabular-nums text-foreground">
                {values[key]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
