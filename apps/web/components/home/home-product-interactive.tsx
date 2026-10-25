"use client";

import { HomeProductActivity } from "@/components/home/home-product-activity";
import { HomeProductChrome } from "@/components/home/home-product-chrome";
import { HomeProductMetrics } from "@/components/home/home-product-metrics";

export function HomeProductInteractive() {
  return (
    <div
      data-kp-surface
      className="rounded-[calc(var(--kp-radius-lg)+0.7rem)] border border-border p-1.5 shadow-[inset_0_1px_0_oklch(1_0_0/12%),var(--kp-shadow-surface)]"
    >
      <div className="overflow-hidden rounded-[var(--kp-radius-lg)] border border-border/70 bg-background text-foreground">
        <HomeProductChrome />
        <div className="grid lg:grid-cols-[minmax(0,1.7fr)_minmax(16rem,0.78fr)]">
          <HomeProductMetrics />
          <HomeProductActivity />
        </div>
      </div>
    </div>
  );
}
