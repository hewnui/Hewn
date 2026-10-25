"use client";

import { springs } from "@hewnui/motion";
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
import { createBandScales, flattenSeries } from "../../chart/scales";
import { resolveStatus } from "../../chart/status";
import type { ChartSeries, ChartStatus } from "../../chart/types";
import { useMotionMode } from "../../providers/motion-provider";

export type BarChartProps = {
  series: ChartSeries[];
  summary: string;
  className?: string;
  width?: number;
  height?: number;
  status?: ChartStatus;
  children?: ReactNode;
};

function BarChartRoot({
  series,
  summary,
  className,
  width = 480,
  height = 240,
  status,
  children,
}: BarChartProps) {
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
        <BarChartSvg
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

function BarChartSvg({
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
  const { x, y, pad, categories } = createBandScales(flat, { width, height });
  const baseline = y(0) ?? height - pad.bottom;
  const groupCount = Math.max(1, series.length);
  const band = x.bandwidth();
  const barW = band / groupCount;

  return (
    <ChartFrame
      className={className}
      width={width}
      height={height}
      summary={summary}
      interactive
    >
      <GridLines x={x as never} y={y as never} width={width} height={height} pad={pad} />
      <AxisLabels
        x={x as never}
        y={y as never}
        height={height}
        pad={pad}
        xIsBand
      />
      {series.map((item, seriesIndex) => {
        const color = seriesColor(seriesIndex, item.color);
        return (
          <g key={item.id}>
            {item.data.map((point) => {
              const category = String(point.x);
              if (!categories.includes(category)) return null;
              const px = (x(category) ?? 0) + barW * seriesIndex;
              const py = y(point.y) ?? baseline;
              const barH = Math.max(0, baseline - py);
              const barProps = {
                x: px,
                y: py,
                width: Math.max(1, barW - 2),
                height: barH,
                rx: 4,
                fill: color,
                tabIndex: 0,
                role: "button" as const,
                "aria-label": `${item.label}: ${category}, ${point.y}`,
                className:
                  "cursor-pointer outline-none focus-visible:stroke-ring",
                onFocus: () =>
                  setHover({
                    seriesId: item.id,
                    label: item.label,
                    point,
                    color,
                    px: px + barW / 2,
                    py,
                  }),
                onBlur: () => setHover(null),
                onMouseEnter: () =>
                  setHover({
                    seriesId: item.id,
                    label: item.label,
                    point,
                    color,
                    px: px + barW / 2,
                    py,
                  }),
                onMouseLeave: () => setHover(null),
              };

              return motionEnabled ? (
                <m.rect
                  key={`${item.id}-${category}`}
                  {...barProps}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  transition={springs.snappy}
                />
              ) : (
                <rect key={`${item.id}-${category}`} {...barProps} />
              );
            })}
          </g>
        );
      })}
    </ChartFrame>
  );
}

export const BarChart = Object.assign(BarChartRoot, {
  Tooltip: ChartTooltip,
});
