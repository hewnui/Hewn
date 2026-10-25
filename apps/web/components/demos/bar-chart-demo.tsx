"use client";

import { BarChart } from "@hewnui/ui";

const series = [
  {
    id: "open",
    label: "Open",
    data: [
      { x: "Mon", y: 4 },
      { x: "Tue", y: 6 },
      { x: "Wed", y: 3 },
      { x: "Thu", y: 7 },
    ],
  },
  {
    id: "closed",
    label: "Closed",
    data: [
      { x: "Mon", y: 2 },
      { x: "Tue", y: 5 },
      { x: "Wed", y: 4 },
      { x: "Thu", y: 6 },
    ],
  },
];

export function BarChartDemo() {
  return (
    <BarChart series={series} summary="Tickets by status" width={420} height={220}>
      <BarChart.Tooltip />
    </BarChart>
  );
}
