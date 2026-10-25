export type ChartDatum = {
  x: number | string;
  y: number;
};

export type ChartSeries = {
  id: string;
  label: string;
  data: ChartDatum[];
  /** Optional CSS color; defaults to accent ramp. */
  color?: string;
};

export type ChartStatus = "ready" | "loading" | "empty" | "error";

export type DonutSlice = {
  id: string;
  label: string;
  value: number;
  color?: string;
};

export type ChartSize = {
  width: number;
  height: number;
  padding?: { top: number; right: number; bottom: number; left: number };
};

export const DEFAULT_PADDING = {
  top: 12,
  right: 12,
  bottom: 28,
  left: 36,
} as const;
