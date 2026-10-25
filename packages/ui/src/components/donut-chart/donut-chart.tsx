"use client";

import { pie as d3Pie, arc as d3Arc } from "d3-shape";
import type { ReactNode } from "react";
import { seriesColor } from "../../chart/colors";
import { ChartFrame } from "../../chart/frame";
import {
  ChartInteractionProvider,
  ChartTooltip,
  useChartInteraction,
} from "../../chart/interaction";
import type { ChartStatus, DonutSlice } from "../../chart/types";
import { useMotionMode } from "../../providers/motion-provider";

export type DonutChartProps = {
  slices: DonutSlice[];
  summary: string;
  className?: string;
  width?: number;
  height?: number;
  status?: ChartStatus;
  children?: ReactNode;
};

function resolveDonutStatus(
  slices: DonutSlice[],
  status?: ChartStatus,
): ChartStatus {
  if (status) return status;
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
  return total <= 0 ? "empty" : "ready";
}

function DonutChartRoot({
  slices,
  summary,
  className,
  width = 240,
  height = 240,
  status,
  children,
}: DonutChartProps) {
  const resolved = resolveDonutStatus(slices, status);
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
    <ChartInteractionProvider
      series={slices.map((slice) => ({
        id: slice.id,
        label: slice.label,
        data: [{ x: slice.label, y: slice.value }],
        ...(slice.color !== undefined ? { color: slice.color } : {}),
      }))}
    >
      <div className="relative" style={{ maxWidth: width }}>
        <DonutChartSvg
          slices={slices}
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

function DonutChartSvg({
  slices,
  summary,
  className,
  width,
  height,
}: {
  slices: DonutSlice[];
  summary: string;
  className?: string | undefined;
  width: number;
  height: number;
}) {
  const { motionEnabled } = useMotionMode();
  const { setHover } = useChartInteraction();
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(cx, cy) - 8;
  const layout = d3Pie<DonutSlice>()
    .value((slice) => slice.value)
    .sort(null)(slices);
  const arcGen = d3Arc<(typeof layout)[number]>()
    .innerRadius(radius * 0.58)
    .outerRadius(radius)
    .cornerRadius(motionEnabled ? 2 : 0);

  return (
    <ChartFrame
      className={className}
      width={width}
      height={height}
      summary={summary}
      interactive
    >
      <g transform={`translate(${cx} ${cy})`}>
        {layout.map((item, index) => {
          const color = seriesColor(index, item.data.color);
          const path = arcGen(item);
          if (!path) return null;
          const [px, py] = arcGen.centroid(item);
          const point = { x: "Value", y: item.data.value };
          return (
            <path
              key={item.data.id}
              d={path}
              fill={color}
              tabIndex={0}
              role="button"
              aria-label={`${item.data.label}: ${item.data.value}`}
              className="cursor-pointer outline-none transition-[opacity,filter] duration-[var(--kp-motion-duration)] focus-visible:brightness-110 hover:brightness-110"
              onFocus={() =>
                setHover({
                  seriesId: item.data.id,
                  label: item.data.label,
                  point,
                  color,
                  px: cx + px,
                  py: cy + py,
                })
              }
              onBlur={() => setHover(null)}
              onMouseEnter={() =>
                setHover({
                  seriesId: item.data.id,
                  label: item.data.label,
                  point,
                  color,
                  px: cx + px,
                  py: cy + py,
                })
              }
              onMouseLeave={() => setHover(null)}
            />
          );
        })}
      </g>
    </ChartFrame>
  );
}

export const DonutChart = Object.assign(DonutChartRoot, {
  Tooltip: ChartTooltip,
});
