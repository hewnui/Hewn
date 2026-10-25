"use client";

import { drawIn } from "@hewnui/motion";
import { m } from "motion/react";
import type { ReactNode } from "react";
import { AxisLabels, GridLines } from "../../chart/axes";
import { seriesColor } from "../../chart/colors";
import { ChartFrame } from "../../chart/frame";
import {
  ChartInteractionProvider,
  ChartTooltip,
  useChartInteraction,
} from "../../chart/interaction";
import { linePath } from "../../chart/path";
import { createLinearScales, flattenSeries } from "../../chart/scales";
import { resolveStatus } from "../../chart/status";
import type { ChartSeries, ChartStatus } from "../../chart/types";
import { useMotionMode } from "../../providers/motion-provider";

export type LineChartProps = {
  series: ChartSeries[];
  summary: string;
  className?: string;
  width?: number;
  height?: number;
  status?: ChartStatus;
  children?: ReactNode;
};

function LineChartRoot({
  series,
  summary,
  className,
  width = 480,
  height = 240,
  status,
  children,
}: LineChartProps) {
  const resolved = resolveStatus(series, status);
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

  return (
    <ChartInteractionProvider series={series}>
      <div className="relative" style={{ maxWidth: width }}>
        <LineChartSvg
          series={series}
          summary={summary}
          className={className}
          width={width}
          height={height}
        />
        {children}
      </div>
    </ChartInteractionProvider>
  );
}

function LineChartSvg({
  series,
  summary,
  className,
  width,
  height,
}: {
  series: ChartSeries[];
  summary: string;
  className?: string | undefined;
  width: number;
  height: number;
}) {
  const { motionEnabled } = useMotionMode();
  const { setHover } = useChartInteraction();
  const flat = flattenSeries(series);
  const scales = createLinearScales(flat, { width, height });
  const { x, y, pad, xIsNumeric } = scales;

  return (
    <ChartFrame
      className={className}
      width={width}
      height={height}
      summary={summary}
      interactive
    >
      <GridLines x={x as never} y={y as never} width={width} height={height} pad={pad} />
      <AxisLabels x={x as never} y={y as never} height={height} pad={pad} />
      {series.map((item, index) => {
        const color = seriesColor(index, item.color);
        const d = linePath(item.data, x as never, y as never, xIsNumeric);
        return (
          <g key={item.id}>
            {motionEnabled ? (
              <m.path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={drawIn}
              />
            ) : (
              <path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {item.data.map((point) => {
              const raw = xIsNumeric ? (point.x as number) : String(point.x);
              const px = x(raw as never) ?? 0;
              const py = y(point.y) ?? 0;
              return (
                <circle
                  key={`${item.id}-${String(point.x)}`}
                  cx={px}
                  cy={py}
                  r={4}
                  fill={color}
                  className="cursor-pointer opacity-0 transition-opacity duration-[var(--kp-motion-duration-fast)] hover:opacity-100 focus-visible:opacity-100"
                  tabIndex={0}
                  role="button"
                  aria-label={`${item.label}: ${String(point.x)}, ${point.y}`}
                  onFocus={() =>
                    setHover({
                      seriesId: item.id,
                      label: item.label,
                      point,
                      color,
                      px,
                      py,
                    })
                  }
                  onBlur={() => setHover(null)}
                  onMouseEnter={() =>
                    setHover({
                      seriesId: item.id,
                      label: item.label,
                      point,
                      color,
                      px,
                      py,
                    })
                  }
                  onMouseLeave={() => setHover(null)}
                />
              );
            })}
          </g>
        );
      })}
    </ChartFrame>
  );
}

export const LineChart = Object.assign(LineChartRoot, {
  Tooltip: ChartTooltip,
});
