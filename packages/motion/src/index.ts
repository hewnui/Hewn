export {
  durations,
  easings,
  motionCssVars,
  type MotionDuration,
  type MotionEasing,
} from "./tokens";

export {
  springs,
  springSnappy,
  springSoft,
  enterTransition,
  type MotionSpring,
} from "./springs";

export {
  motionModes,
  resolveMotionMode,
  isMotionMode,
  parseMotionPreference,
  coerceMotionMode,
  motionConfigReduced,
  type MotionMode,
} from "./resolve";

export { iconState, fadeIn, drawIn, iconPop } from "./presets";
export { loadMotionFeatures } from "./features";
