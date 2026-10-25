"use client";

import { LineChart } from "@hewnui/ui";

const series = [
  {
    id: "rev",
    label: "Revenue",
    data: [
      { x: "Mon", y: 12 },
      { x: "Tue", y: 18 },
      { x: "Wed", y: 15 },
      { x: "Thu", y: 22 },
      { x: "Fri", y: 19 },
    ],
  },
];

export function LineChartDemo() {
  return (
    <LineChart series={series} summary="Revenue by weekday" width={420} height={220}>
      <LineChart.Tooltip />
    </LineChart>
  );
}
