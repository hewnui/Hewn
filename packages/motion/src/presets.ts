import type { Variants } from "motion/react";
import { durations, easings } from "./tokens";
import { springs } from "./springs";

export const iconState = {
  hidden: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
} satisfies Variants;

export const fadeIn = {
  duration: durations.base,
} as const;

export const drawIn = {
  duration: durations.slow,
  ease: easings.standard,
} as const;

export const iconPop = {
  ...springs.snappy,
  bounce: 0,
} as const;
