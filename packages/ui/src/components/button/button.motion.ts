import { durations, springs } from "@hewnui/motion";
import type { Transition, Variants } from "motion/react";

export const buttonPressTransition = springs.snappy;

export const loadingIconVariants = {
  hidden: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
} satisfies Variants;

export const loadingIconTransition = {
  type: "spring",
  duration: durations.base,
  bounce: 0,
} satisfies Transition;
