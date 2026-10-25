"use client";

import { hero } from "@/components/home/content";
import { useMotionMode } from "@hewnui/ui";
import { ArrowDownIcon } from "@phosphor-icons/react";
import { m } from "motion/react";
import { memo } from "react";

function HomeHeroCueInner() {
  const { motionEnabled } = useMotionMode();

  return (
    <a
      href={hero.cue.href}
      className="group inline-flex min-h-11 items-center gap-3 text-sm text-muted-foreground transition-[color,transform] hover:text-foreground active:scale-[0.96]"
    >
      <m.span
        aria-hidden
        className="grid size-10 shrink-0 place-items-center rounded-[var(--kp-radius-md)] border border-border/70"
        animate={motionEnabled ? { y: [0, 4, 0] } : { y: 0 }}
        transition={
          motionEnabled
            ? { duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
            : { duration: 0 }
        }
      >
        <ArrowDownIcon className="size-4" weight="bold" />
      </m.span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
        {hero.cue.label}
      </span>
    </a>
  );
}

export const HomeHeroCue = memo(HomeHeroCueInner);
