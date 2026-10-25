"use client";

import { product } from "@/components/home/content-product";
import { LazyIsland } from "@/components/home/lazy-island";

function load() {
  return import("@/components/home/home-product-interactive").then((m) => ({
    default: m.HomeProductInteractive,
  }));
}

function ProductFallback() {
  return (
    <div
      data-kp-surface
      className="rounded-[calc(var(--kp-radius-lg)+0.7rem)] border border-border p-1.5 shadow-[inset_0_1px_0_oklch(1_0_0/12%),var(--kp-shadow-surface)]"
    >
      <div className="overflow-hidden rounded-[var(--kp-radius-lg)] border border-border/70 bg-background p-6 text-foreground md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          {product.brand} · {product.brandMeta}
        </p>
        <p className="mt-1 font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
          {product.sampleCaption}
        </p>
        <p className="mt-4 text-2xl font-semibold tracking-tight">
          {product.lead.value}{" "}
          <span className="text-base font-normal text-muted-foreground">
            {product.lead.label}
          </span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{product.lead.hint}</p>
      </div>
    </div>
  );
}

export function HomeProductDeferred() {
  return <LazyIsland load={load} fallback={<ProductFallback />} />;
}
