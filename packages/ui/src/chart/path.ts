import { area as d3Area, line as d3Line, curveMonotoneX } from "d3-shape";
import type { ChartDatum } from "./types";

type XScale = { (value: number | string): number | undefined };
type YScale = { (value: number): number | undefined };

export function linePath(
  data: ChartDatum[],
  x: XScale,
  y: YScale,
  xIsNumeric: boolean,
): string {
  const generator = d3Line<ChartDatum>()
    .x((d) => {
      const raw = xIsNumeric ? (d.x as number) : String(d.x);
      return x(raw) ?? 0;
    })
    .y((d) => y(d.y) ?? 0)
    .curve(curveMonotoneX)
    .defined((d) => Number.isFinite(d.y));

  return generator(data) ?? "";
}

export function areaPath(
  data: ChartDatum[],
  x: XScale,
  y: YScale,
  xIsNumeric: boolean,
  y0: number,
): string {
  const generator = d3Area<ChartDatum>()
    .x((d) => {
      const raw = xIsNumeric ? (d.x as number) : String(d.x);
      return x(raw) ?? 0;
    })
    .y0(y0)
    .y1((d) => y(d.y) ?? y0)
    .curve(curveMonotoneX)
    .defined((d) => Number.isFinite(d.y));

  return generator(data) ?? "";
}
