"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ChartDatum, ChartSeries } from "./types";

export type ChartHover = {
  seriesId: string;
  label: string;
  point: ChartDatum;
  color: string;
  px: number;
  py: number;
} | null;

type ChartInteractionValue = {
  hover: ChartHover;
  setHover: (next: ChartHover) => void;
  series: ChartSeries[];
};

const ChartInteractionContext = createContext<ChartInteractionValue | null>(
  null,
);

export function ChartInteractionProvider({
  series,
  children,
}: {
  series: ChartSeries[];
  children: ReactNode;
}) {
  const [hover, setHover] = useState<ChartHover>(null);
  const value = useMemo(
    () => ({ hover, setHover, series }),
    [hover, series],
  );
  return (
    <ChartInteractionContext.Provider value={value}>
      {children}
    </ChartInteractionContext.Provider>
  );
}

export function useChartInteraction() {
  const ctx = useContext(ChartInteractionContext);
  if (!ctx) {
    throw new Error("Chart.Tooltip must be used within a chart root");
  }
  return ctx;
}

export function ChartTooltip() {
  const { hover } = useChartInteraction();
  if (!hover) return null;

  return (
    <div
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-[var(--kp-radius-sm)] border border-border bg-surface-raised px-2 py-1 text-xs shadow-[0_8px_24px_color-mix(in_oklch,var(--kp-foreground)_12%,transparent)]"
      style={{ left: hover.px, top: hover.py }}
      role="tooltip"
    >
      <p className="font-medium text-foreground">{hover.label}</p>
      <p className="font-mono tabular-nums text-muted-foreground">
        {String(hover.point.x)} · {hover.point.y}
      </p>
    </div>
  );
}
