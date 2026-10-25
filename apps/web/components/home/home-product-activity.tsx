"use client";

import { productActivity } from "@/components/home/content-product";
import { HomeProductPulse } from "@/components/home/home-product-pulse";
import { useMotionMode } from "@hewnui/ui";
import { m } from "motion/react";

const list = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function HomeProductActivity() {
  const { motionEnabled } = useMotionMode();

  return (
    <section className="border-t border-border/80 bg-[color-mix(in_oklch,var(--kp-muted)_22%,transparent)] px-4 py-4 md:px-5 md:py-5 lg:border-t-0 lg:border-l">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          Live stream
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          {productActivity.length} events
        </p>
      </div>
      <m.ol
        className="relative space-y-1"
        initial={motionEnabled ? "hidden" : false}
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={list}
      >
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[4.5px] w-px bg-border"
        />
        {productActivity.map((event) => (
          <m.li
            key={event.id}
            variants={item}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={
              event.live
                ? "relative rounded-[var(--kp-radius-md)] bg-[color-mix(in_oklch,var(--kp-accent)_10%,transparent)] px-2 py-2.5"
                : "relative px-2 py-2.5"
            }
          >
            <div className="flex gap-3">
              <span className="relative mt-1 bg-[color-mix(in_oklch,var(--kp-muted)_22%,var(--kp-background))]">
                <HomeProductPulse live={event.live} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">
                    {event.title}
                  </p>
                  <time className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] tabular-nums text-muted-foreground">
                    {event.time}
                  </time>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-pretty text-muted-foreground">
                  {event.detail}
                </p>
              </div>
            </div>
          </m.li>
        ))}
      </m.ol>
    </section>
  );
}
