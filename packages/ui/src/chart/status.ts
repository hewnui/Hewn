import type { ChartDatum, ChartSeries, ChartStatus } from "./types";

export function resolveStatus(
  series: ChartSeries[] | ChartDatum[],
  status?: ChartStatus,
): ChartStatus {
  if (status) return status;
  const points = Array.isArray(series) && series.length > 0 && "data" in series[0]!
    ? (series as ChartSeries[]).flatMap((s) => s.data)
    : (series as ChartDatum[]);
  return points.length === 0 ? "empty" : "ready";
}

export function formatTick(value: number | string): string {
  if (typeof value === "string") return value;
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(1);
}
