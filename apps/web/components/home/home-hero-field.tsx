"use client";

import { useMotionMode } from "@hewnui/ui";
import { m } from "motion/react";
import { memo } from "react";

const drift = {
  duration: 16,
  repeat: Number.POSITIVE_INFINITY,
  ease: "easeInOut" as const,
};

/**
 * Motion-only overlays. Base gradients/orbs come from HomeHeroFieldStatic so
 * first paint does not wait on this client chunk.
 */
function HomeHeroFieldInner() {
  const { motionEnabled } = useMotionMode();
  if (!motionEnabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden contain-strict"
    >
      <m.div
        className="absolute -top-[12%] left-[4%] size-[min(52vw,28rem)] rounded-full bg-[color-mix(in_oklch,var(--kp-glass-tint)_55%,transparent)] blur-3xl"
        animate={{ x: [0, 48, -24, 0], y: [0, 32, -18, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ ...drift, duration: 18 }}
      />
      <m.div
        className="absolute top-[8%] right-[-8%] size-[min(48vw,24rem)] rounded-full bg-[color-mix(in_oklch,var(--kp-accent)_22%,transparent)] blur-3xl"
        animate={{ x: [0, -56, 20, 0], y: [0, 40, -28, 0], scale: [1, 0.94, 1.1, 1] }}
        transition={{ ...drift, duration: 22, delay: 0.4 }}
      />
      <m.div
        className="absolute bottom-[-18%] left-[28%] size-[min(60vw,32rem)] rounded-full bg-[color-mix(in_oklch,var(--kp-accent)_12%,transparent)] blur-3xl"
        animate={{ x: [0, 36, -40, 0], y: [0, -24, 16, 0], scale: [1, 1.06, 0.92, 1] }}
        transition={{ ...drift, duration: 26, delay: 0.8 }}
      />
      <m.div
        className="absolute top-[36%] left-[42%] size-40 rounded-full border border-accent/20"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, color-mix(in oklch, var(--kp-accent) 28%, transparent), transparent 70%)",
        }}
        animate={{
          rotate: [0, 28, -12, 0],
          scale: [1, 1.12, 0.98, 1],
          opacity: [0.35, 0.55, 0.4, 0.35],
        }}
        transition={{ ...drift, duration: 20 }}
      />
      <m.div
        className="absolute inset-x-[-20%] top-[18%] h-px origin-left bg-gradient-to-r from-transparent via-accent/35 to-transparent"
        animate={{ x: ["-15%", "35%", "-15%"], opacity: [0.15, 0.45, 0.15] }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export const HomeHeroField = memo(HomeHeroFieldInner);
