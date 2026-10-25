"use client";

import { drawIn } from "@hewnui/motion";
import { m } from "motion/react";
import { useMotionMode } from "../../providers/motion-provider";
import { seriesColor } from "../../chart/colors";
import { ChartFrame } from "../../chart/frame";
import { linePath } from "../../chart/path";
import { createLinearScales, flattenSeries } from "../../chart/scales";
import { resolveStatus } from "../../chart/status";
import type { ChartDatum, ChartStatus } from "../../chart/types";

export type SparklineProps = {
  data: ChartDatum[] | number[];
  className?: string;
  width?: number;
  height?: number;
  summary: string;
  status?: ChartStatus;
  color?: string;
};

function toPoints(data: ChartDatum[] | number[]): ChartDatum[] {
  if (data.length === 0) return [];
  if (typeof data[0] === "number") {
    return (data as number[]).map((y, x) => ({ x, y }));
  }
  return data as ChartDatum[];
}

export function Sparkline({
  data,
  className,
  width = 160,
  height = 40,
  summary,
  status,
  color,
}: SparklineProps) {
  const { motionEnabled } = useMotionMode();
  const points = toPoints(data);
  const resolved = resolveStatus(points, status);
  const stroke = seriesColor(0, color);

  if (resolved !== "ready") {
    return (
      <ChartFrame
        className={className}
        width={width}
        height={height}
        summary={summary}
        status={resolved}
      />
    );
  }

  const { x, y, xIsNumeric } = createLinearScales(points, {
    width,
    height,
    padding: { top: 4, right: 4, bottom: 4, left: 4 },
  });
  const d = linePath(points, x as never, y as never, xIsNumeric);

  return (
    <ChartFrame
      className={className}
      width={width}
      height={height}
      summary={summary}
    >
      {motionEnabled ? (
        <m.path
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={drawIn}
        />
      ) : (
        <path
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </ChartFrame>
  );
}
