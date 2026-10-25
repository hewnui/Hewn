"use client";

import {
  Children,
  isValidElement,
  useMemo,
  type ReactElement,
} from "react";
import { stepperListClass } from "./stepper.styles";
import {
  StepperStep,
  StepperStepView,
  type StepperContextValue,
} from "./stepper-step";
import type { StepperProps, StepperStepProps } from "./stepper.types";

export { StepperStep };

export function Stepper({
  "aria-label": ariaLabel = "Progress",
  allowGoBack,
  children,
  className,
  currentIndex,
  onStepChange,
  orientation = "horizontal",
}: StepperProps) {
  const canGoBack = allowGoBack ?? Boolean(onStepChange);
  const ctx = useMemo<StepperContextValue>(
    () => ({
      orientation,
      allowGoBack: canGoBack,
      ...(currentIndex !== undefined ? { currentIndex } : {}),
      ...(onStepChange !== undefined ? { onStepChange } : {}),
    }),
    [canGoBack, currentIndex, onStepChange, orientation],
  );

  const steps = Children.toArray(children).filter(isValidElement) as ReactElement<
    StepperStepProps
  >[];

  return (
    <nav aria-label={ariaLabel} data-kp-control="stepper">
      <ol className={stepperListClass(orientation, className)}>
        {steps.map((step, i) => (
          <StepperStepView
            key={step.key ?? step.props.index ?? i}
            {...step.props}
            ctx={ctx}
            index={step.props.index ?? i}
            isLast={i === steps.length - 1}
          />
        ))}
      </ol>
    </nav>
  );
}
