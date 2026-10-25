import type { Transition } from "motion/react";

export const springs = {
  snappy: {
    type: "spring",
    stiffness: 420,
    damping: 30,
    mass: 0.7,
  },
  soft: {
    type: "spring",
    stiffness: 280,
    damping: 28,
    mass: 0.9,
  },
  enter: {
    type: "spring",
    stiffness: 340,
    damping: 30,
    mass: 0.8,
  },
} as const satisfies Record<string, Transition>;

export type MotionSpring = keyof typeof springs;

/** @deprecated Prefer `springs.snappy`. */
export const springSnappy = springs.snappy;

/** @deprecated Prefer `springs.soft`. */
export const springSoft = springs.soft;

/** @deprecated Prefer `springs.enter`. */
export const enterTransition = springs.enter;
