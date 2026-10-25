"use client";

import { product } from "@/components/home/content-product";
import { useElementWidth } from "@/components/home/use-element-width";
import { AreaChart, Sparkline } from "@hewnui/ui";

const volume = [
  {
    id: "jobs",
    label: "Jobs",
    data: [
      { x: "00:00", y: 6.2 },
      { x: "03:00", y: 4.8 },
      { x: "06:00", y: 7.1 },
      { x: "09:00", y: 12.4 },
      { x: "12:00", y: 14.9 },
      { x: "15:00", y: 13.6 },
      { x: "18:00", y: 15.8 },
      { x: "21:00", y: 12.1 },
      { x: "24:00", y: 7.9 },
    ],
  },
];

const latencyTrend = [48, 44, 46, 39, 36, 34, 31, 28, 26, 22];
const errorTrend = [0.42, 0.38, 0.4, 0.33, 0.31, 0.29, 0.26, 0.24, 0.22, 0.21];

const cell = "px-5 py-5 md:px-6 md:py-6";
const statLabel =
  "font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground";

function Stat({
  label,
  value,
  delta,
  trend,
  summary,
}: {
  label: string;
  value: string;
  delta: string;
  trend: number[];
  summary: string;
}) {
  return (
    <div className={`flex flex-col justify-between gap-5 ${cell}`}>
      <div>
        <p className={statLabel}>{label}</p>
        <p className="mt-2 font-mono text-2xl font-medium tabular-nums text-foreground">
          {value}
          <span className="ml-1.5 text-sm text-accent">{delta}</span>
        </p>
      </div>
      <Sparkline
        data={trend}
        summary={summary}
        width={120}
        height={28}
        className="opacity-70"
      />
    </div>
  );
}

export function HomeProductMetrics() {
  const [chartRef, chartWidth] = useElementWidth<HTMLDivElement>(640);

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_0%_0%,color-mix(in_oklch,var(--kp-accent)_16%,transparent),transparent_58%)]"
      />

      <div className="relative grid divide-y divide-border/70 md:grid-cols-[1.35fr_1fr_1fr] md:divide-x md:divide-y-0">
        <div className={cell}>
          <p className={statLabel}>{product.lead.label}</p>
          <p className="mt-2 font-mono text-5xl font-medium leading-none tracking-tighter tabular-nums text-foreground md:text-[3.25rem]">
            {product.lead.value}
          </p>
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <span className="inline-flex min-h-7 items-center rounded-full bg-accent/12 px-2.5 font-mono text-xs tabular-nums text-accent">
              {product.lead.delta}
            </span>
            <span className="text-sm text-muted-foreground">
              {product.lead.hint}
            </span>
          </div>
        </div>

        <Stat
          label={product.latency.label}
          value={product.latency.value}
          delta={product.latency.delta}
          trend={latencyTrend}
          summary="p95 latency trending down over the last ten windows"
        />
        <Stat
          label={product.errors.label}
          value={product.errors.value}
          delta={product.errors.delta}
          trend={errorTrend}
          summary="Error rate trending down over the last ten windows"
        />
      </div>

      <div className="relative border-t border-border/70 px-5 pb-5 pt-4 md:px-6 md:pb-6">
        <div className="flex items-baseline justify-between gap-3">
          <p className={statLabel}>{product.chartLabel}</p>
          <p className={statLabel}>{product.chartUnit}</p>
        </div>
        <div ref={chartRef} className="mt-3">
          <AreaChart
            series={volume}
            summary="Jobs routed per three-hour window across the last day, peaking at 15,800 in the 18:00 window"
            width={chartWidth}
            height={140}
          >
            <AreaChart.Tooltip />
          </AreaChart>
        </div>
      </div>
    </section>
  );
}
