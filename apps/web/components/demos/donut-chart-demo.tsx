"use client";

import { DonutChart } from "@hewnui/ui";

export function DonutChartDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <DonutChart
        summary="Traffic share last 24h"
        slices={[
          { id: "edge", label: "Edge", value: 62 },
          { id: "origin", label: "Origin", value: 27 },
          { id: "retry", label: "Retry", value: 11 },
        ]}
      >
        <DonutChart.Tooltip />
      </DonutChart>
    </div>
  );
}
