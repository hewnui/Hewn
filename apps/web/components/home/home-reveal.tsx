"use client";

import { useMotionMode } from "@hewnui/ui";
import { m } from "motion/react";
import type { ReactNode } from "react";

export function HomeReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { motionEnabled } = useMotionMode();

  if (!motionEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </m.div>
  );
}
