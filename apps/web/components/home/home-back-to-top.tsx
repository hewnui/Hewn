"use client";

import { useMotionMode } from "@hewnui/ui";
import { ArrowUpIcon } from "@phosphor-icons/react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

export function HomeBackToTop() {
  const { motionEnabled } = useMotionMode();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setVisible(value > 480);
  });

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: motionEnabled ? "smooth" : "auto",
    });
  }

  return (
    <AnimatePresence>
      {visible ? (
        <m.button
          key="back-to-top"
          type="button"
          aria-label="Back to top"
          onClick={scrollTop}
          data-kp-surface
          className="fixed right-4 bottom-4 z-40 inline-flex size-11 items-center justify-center rounded-full border border-white/10 shadow-[var(--kp-shadow-surface),inset_0_1px_0_oklch(1_0_0/12%)] md:right-6 md:bottom-6"
          initial={motionEnabled ? { opacity: 0, y: 12, scale: 0.92 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            motionEnabled
              ? { opacity: 0, y: 10, scale: 0.94 }
              : { opacity: 0 }
          }
          transition={motionEnabled ? spring : { duration: 0 }}
          {...(motionEnabled ? { whileTap: { scale: 0.96 } } : {})}
        >
          <ArrowUpIcon aria-hidden className="size-4" weight="bold" />
        </m.button>
      ) : null}
    </AnimatePresence>
  );
}
