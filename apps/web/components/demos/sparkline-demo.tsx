"use client";

import { Sparkline } from "@hewnui/ui";

export function SparklineDemo() {
  return (
    <Sparkline
      data={[4, 6, 5, 9, 7, 11, 10]}
      summary="Signups over the last seven weeks"
      width={180}
      height={40}
    />
  );
}
