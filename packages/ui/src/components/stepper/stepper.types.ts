import type { ReactNode } from "react";

export type StepperOrientation = "horizontal" | "vertical";

export type StepStatus =
  | "complete"
  | "current"
  | "upcoming"
  | "error"
  | "optional";

export type StepperProps = {
  children: ReactNode;
  className?: string;
  orientation?: StepperOrientation;
  /** Accessible name for the stepper navigation. */
  "aria-label"?: string;
  /**
   * Zero-based index of the current step. When set, child status is derived
   * unless a step provides an explicit `status`.
   */
  currentIndex?: number;
  /** Called when a clickable completed (or navigable) step is activated. */
  onStepChange?: (index: number) => void;
  /** Allow activating completed steps. Defaults to `true` when `onStepChange` is set. */
  allowGoBack?: boolean;
};

export type StepperStepProps = {
  children: ReactNode;
  className?: string;
  /** Explicit status. Overrides derivation from `currentIndex`. */
  status?: StepStatus;
  /** Marks the step as optional in the label metadata. */
  isOptional?: boolean;
  /** Description under the title. */
  description?: ReactNode;
  /** Zero-based index. Auto-assigned from sibling order when omitted. */
  index?: number;
  /** Force clickability regardless of status. */
  isClickable?: boolean;
  onPress?: () => void;
};

export type UseStepperOptions = {
  /** Total number of steps. */
  count: number;
  defaultIndex?: number;
  index?: number;
  onIndexChange?: (index: number) => void;
};

export type UseStepperResult = {
  currentIndex: number;
  goTo: (index: number) => void;
  next: () => void;
  previous: () => void;
  isFirst: boolean;
  isLast: boolean;
  statusFor: (index: number) => Exclude<StepStatus, "error" | "optional">;
};
