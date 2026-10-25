/** Duration tokens in seconds for Motion `transition.duration`. */
export const durations = {
  instant: 0,
  fast: 0.12,
  base: 0.2,
  slow: 0.36,
} as const;

export type MotionDuration = keyof typeof durations;

/** Cubic-bezier tuples for Motion `transition.ease`. */
export const easings = {
  standard: [0.2, 0, 0, 1] as const,
  emphasized: [0.16, 1, 0.3, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
  linear: "linear" as const,
} as const;

export type MotionEasing = keyof typeof easings;

/** CSS custom property names mirrored in `@hewnui/themes/motion.css`. */
export const motionCssVars = {
  durationInstant: "--kp-motion-duration-instant",
  durationFast: "--kp-motion-duration-fast",
  durationBase: "--kp-motion-duration",
  durationSlow: "--kp-motion-duration-slow",
  easeStandard: "--kp-motion-ease-standard",
  easeEmphasized: "--kp-motion-ease-emphasized",
  easeExit: "--kp-motion-ease-exit",
  easeLinear: "--kp-motion-ease-linear",
  ease: "--kp-motion-ease",
  stiffness: "--kp-motion-stiffness",
  damping: "--kp-motion-damping",
} as const;
