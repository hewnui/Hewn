"use client";

import {
  ChartLineUpIcon,
  CursorClickIcon,
  ListBulletsIcon,
  PulseIcon,
  SquaresFourIcon,
  TextboxIcon,
} from "@phosphor-icons/react";
import type { ThemeLabLevel } from "./types";
import { THEME_LAB_LEVELS } from "./types";

const icons: Record<
  ThemeLabLevel,
  React.ComponentType<{ className?: string; weight?: "regular" | "bold" }>
> = {
  foundation: SquaresFourIcon,
  actions: CursorClickIcon,
  forms: TextboxIcon,
  navigation: ListBulletsIcon,
  data: ChartLineUpIcon,
  feedback: PulseIcon,
};

export function ThemeLabLevelNav({
  active,
  onSelect,
}: {
  active: ThemeLabLevel;
  onSelect: (level: ThemeLabLevel) => void;
}) {
  return (
    <nav aria-label="Theme Lab levels" className="min-w-0">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground lg:mb-3">
        Inspect by level
      </p>
      <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
        {THEME_LAB_LEVELS.map(({ id, label, hint }) => {
          const Icon = icons[id];
          const selected = active === id;
          return (
            <li key={id} className="shrink-0 lg:shrink">
              <button
                type="button"
                onClick={() => onSelect(id)}
                aria-current={selected ? "true" : undefined}
                className={[
                  "flex min-h-10 w-full min-w-[9.5rem] items-start gap-2.5 rounded-[var(--kp-radius-md)] border px-3 py-2 text-left transition-[background-color,border-color,color,transform] duration-150 lg:min-w-0",
                  selected
                    ? "border-ring bg-muted text-foreground"
                    : "border-border bg-surface text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground",
                  "active:scale-[0.98]",
                ].join(" ")}
              >
                <Icon
                  className="mt-0.5 size-4 shrink-0"
                  weight={selected ? "bold" : "regular"}
                />
                <span className="block min-w-0">
                  <span className="block text-sm font-medium">{label}</span>
                  <span className="hidden text-xs leading-snug text-muted-foreground lg:block">
                    {hint}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
