"use client";

import { product } from "@/components/home/content-product";
import { HomeProductPulse } from "@/components/home/home-product-pulse";
import { Button, useMotionMode } from "@hewnui/ui";
import { CheckIcon, LightningIcon } from "@phosphor-icons/react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";

export function HomeProductChrome() {
  const { motionEnabled } = useMotionMode();
  const [queued, setQueued] = useState(false);

  useEffect(() => {
    if (!queued) return;
    const id = window.setTimeout(() => setQueued(false), 1600);
    return () => window.clearTimeout(id);
  }, [queued]);

  return (
    <header className="flex flex-wrap items-center gap-3 border-b border-border/80 px-4 py-3 md:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="grid size-9 place-items-center rounded-[var(--kp-radius-md)] bg-accent text-sm font-semibold text-accent-foreground shadow-[inset_0_1px_0_oklch(1_0_0/28%)]"
          aria-hidden
        >
          N
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-foreground">
            {product.brand}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {product.brandMeta}
          </p>
          <p className="mt-0.5 font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
            {product.sampleCaption}
          </p>
        </div>
      </div>

      <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-muted/35 px-3">
        <HomeProductPulse live />
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          {product.liveLabel}
        </span>
      </span>

      <div className="ml-auto flex items-center gap-2">
        <Button size="sm" onPress={() => setQueued(true)}>
          <span className="inline-flex items-center gap-1.5">
            <span className="relative inline-flex min-w-[1.1rem] items-center justify-center">
              <AnimatePresence initial={false} mode="popLayout">
                <m.span
                  key={queued ? "check" : "bolt"}
                  className="inline-flex"
                  initial={
                    motionEnabled
                      ? { opacity: 0, scale: 0.25, filter: "blur(4px)" }
                      : false
                  }
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                >
                  {queued ? (
                    <CheckIcon className="size-3.5" weight="bold" />
                  ) : (
                    <LightningIcon className="size-3.5" weight="bold" />
                  )}
                </m.span>
              </AnimatePresence>
            </span>
            {queued ? product.queued : product.action}
          </span>
        </Button>
        <div className="hidden items-center gap-2 rounded-full border border-border bg-muted/30 py-1 pl-1 pr-3 sm:flex">
          <span
            className="grid size-8 place-items-center rounded-full bg-[color-mix(in_oklch,var(--kp-accent)_22%,var(--kp-muted))] text-[11px] font-semibold text-accent"
            aria-hidden
          >
            {product.operatorMark}
          </span>
          <span className="leading-tight">
            <span className="block text-xs font-medium text-foreground">
              {product.operator}
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              {product.operatorShift}
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
