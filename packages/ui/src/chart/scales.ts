import { extent, max, min } from "d3-array";
import { scaleBand, scaleLinear, scalePoint } from "d3-scale";
import type { ChartDatum, ChartSeries, ChartSize } from "./types";
import { DEFAULT_PADDING } from "./types";

export function flattenSeries(series: ChartSeries[]): ChartDatum[] {
  return series.flatMap((item) => item.data);
}

export function xDomain(data: ChartDatum[]): Array<number | string> {
  const values = data.map((d) => d.x);
  const allNumeric = values.every((v) => typeof v === "number");
  if (allNumeric) {
    const [lo, hi] = extent(values as number[]) as [number, number];
    return [lo, hi];
  }
  return [...new Set(values.map(String))];
}

export function yDomain(data: ChartDatum[], includeZero = false): [number, number] {
  const ys = data.map((d) => d.y);
  let lo = min(ys) ?? 0;
  let hi = max(ys) ?? 1;
  if (includeZero) {
    lo = Math.min(0, lo);
    hi = Math.max(0, hi);
  }
  if (lo === hi) {
    lo -= 1;
    hi += 1;
  }
  return [lo, hi];
}

export function createLinearScales(
  data: ChartDatum[],
  size: ChartSize,
  opts?: { includeZero?: boolean },
) {
  const pad = { ...DEFAULT_PADDING, ...size.padding };
  const innerW = Math.max(1, size.width - pad.left - pad.right);
  const innerH = Math.max(1, size.height - pad.top - pad.bottom);
  const xd = xDomain(data);
  const yd = yDomain(data, opts?.includeZero);

  const xIsNumeric = xd.length === 2 && typeof xd[0] === "number";
  const x = xIsNumeric
    ? scaleLinear()
        .domain(xd as [number, number])
        .range([pad.left, pad.left + innerW])
    : scalePoint<string>()
        .domain(xd.map(String))
        .range([pad.left, pad.left + innerW])
        .padding(0.2);

  const y = scaleLinear()
    .domain(yd)
    .nice()
    .range([pad.top + innerH, pad.top]);

  return { x, y, pad, innerW, innerH, xIsNumeric };
}

export function createBandScales(
  data: ChartDatum[],
  size: ChartSize,
  opts?: { includeZero?: boolean },
) {
  const pad = { ...DEFAULT_PADDING, ...size.padding };
  const innerW = Math.max(1, size.width - pad.left - pad.right);
  const innerH = Math.max(1, size.height - pad.top - pad.bottom);
  const categories = [...new Set(data.map((d) => String(d.x)))];
  const yd = yDomain(data, opts?.includeZero ?? true);

  const x = scaleBand<string>()
    .domain(categories)
    .range([pad.left, pad.left + innerW])
    .padding(0.24);

  const y = scaleLinear()
    .domain(yd)
    .nice()
    .range([pad.top + innerH, pad.top]);

  return { x, y, pad, innerW, innerH, categories };
}
