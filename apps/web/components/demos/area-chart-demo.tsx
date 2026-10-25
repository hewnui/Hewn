"use client";

import { AreaChart } from "@hewnui/ui";

const series = [
  {
    id: "users",
    label: "Active",
    data: [
      { x: 1, y: 20 },
      { x: 2, y: 28 },
      { x: 3, y: 24 },
      { x: 4, y: 35 },
      { x: 5, y: 32 },
    ],
  },
];

export function AreaChartDemo() {
  return (
    <AreaChart
      series={series}
      summary="Active users this month"
      width={420}
      height={220}
    >
      <AreaChart.Tooltip />
    </AreaChart>
  );
}
