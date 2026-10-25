"use client";

import { AreaChart, Sparkline } from "@hewnui/ui";

const throughput = [
  {
    id: "req",
    label: "Requests",
    data: [
      { x: 1, y: 18 },
      { x: 2, y: 24 },
      { x: 3, y: 21 },
      { x: 4, y: 29 },
      { x: 5, y: 27 },
      { x: 6, y: 34 },
      { x: 7, y: 31 },
      { x: 8, y: 38 },
      { x: 9, y: 36 },
      { x: 10, y: 42 },
    ],
  },
];

const sideMetrics = [
  {
    label: "p95 latency",
    value: "184ms",
    delta: "-11ms",
    spark: [42, 38, 40, 33, 31, 29, 27, 24, 22, 19],
  },
  {
    label: "Error rate",
    value: "0.38%",
    delta: "-0.09%",
    spark: [8, 7, 9, 6, 5, 6, 4, 5, 3, 4],
  },
  {
    label: "Cache hit",
    value: "91.4%",
    delta: "+2.1%",
    spark: [72, 74, 76, 78, 80, 83, 85, 87, 89, 91],
  },
] as const;

export function StudioDashboardMetrics() {
  return (
    <section className="grid border-b border-border lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.9fr)]">
      <div className="border-b border-border px-5 py-5 md:px-6 lg:border-b-0 lg:border-r">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Request volume · 24h
            </p>
            <p className="mt-1 font-mono text-3xl font-medium tracking-tight tabular-nums text-foreground md:text-4xl">
              128,402
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-mono tabular-nums text-accent">+12.4%</span>
              {" "}vs prior window
            </p>
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <AreaChart
            series={throughput}
            summary="Request volume over the last ten intervals"
            width={520}
            height={168}
          >
            <AreaChart.Tooltip />
          </AreaChart>
        </div>
      </div>
      <ul className="divide-y divide-border">
        {sideMetrics.map(({ label, value, delta, spark }) => (
          <li
            key={label}
            className="flex items-end justify-between gap-4 px-5 py-4 md:px-6"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {label}
              </p>
              <p className="mt-1 font-mono text-xl font-medium tabular-nums text-foreground">
                {value}
              </p>
              <p className="mt-0.5 font-mono text-xs tabular-nums text-muted-foreground">
                {delta}
              </p>
            </div>
            <Sparkline
              data={[...spark]}
              summary={`${label} trend`}
              width={96}
              height={36}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
