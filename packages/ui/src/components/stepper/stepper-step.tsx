"use client";

import type { ReactNode } from "react";
import {
  stepperButtonClass,
  stepperButtonVerticalClass,
  stepperConnectorClass,
  stepperDescriptionClass,
  stepperIndicatorClass,
  stepperItemClass,
  stepperOptionalClass,
  stepperTitleClass,
} from "./stepper.styles";
import type {
  StepperOrientation,
  StepperStepProps,
  StepStatus,
} from "./stepper.types";

export type StepperContextValue = {
  orientation: StepperOrientation;
  currentIndex?: number | undefined;
  onStepChange?: ((index: number) => void) | undefined;
  allowGoBack: boolean;
};

export function resolveStatus(
  explicit: StepStatus | undefined,
  index: number,
  currentIndex: number | undefined,
  isOptional: boolean | undefined,
): StepStatus {
  if (explicit) return explicit;
  if (currentIndex === undefined) {
    return isOptional ? "optional" : "upcoming";
  }
  if (index < currentIndex) return "complete";
  if (index === currentIndex) return "current";
  return isOptional ? "optional" : "upcoming";
}

function CheckGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
      <path
        d="M8 3.5v6M8 12.2h.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StepperStepView({
  children,
  className,
  ctx,
  description,
  index = 0,
  isClickable,
  isLast,
  isOptional,
  onPress,
  status: statusProp,
}: StepperStepProps & {
  isLast: boolean;
  ctx: StepperContextValue;
}) {
  const { allowGoBack, currentIndex, onStepChange, orientation } = ctx;
  const status = resolveStatus(statusProp, index, currentIndex, isOptional);
  const clickable =
    isClickable ??
    Boolean(
      onPress ||
        (allowGoBack &&
          onStepChange &&
          (status === "complete" || status === "error")),
    );

  function activate() {
    if (!clickable) return;
    onPress?.();
    onStepChange?.(index);
  }

  const indicator =
    status === "complete" ? (
      <CheckGlyph />
    ) : status === "error" ? (
      <AlertGlyph />
    ) : (
      <span className="tabular-nums">{index + 1}</span>
    );

  const frameClass =
    orientation === "vertical"
      ? stepperButtonVerticalClass(clickable)
      : stepperButtonClass(clickable);

  const body = (
    <>
      <span className={stepperIndicatorClass(status)} aria-hidden>
        {indicator}
      </span>
      <span className="min-w-0">
        <span className={stepperTitleClass}>{children}</span>
        {isOptional || status === "optional" ? (
          <span className={stepperOptionalClass}>Optional</span>
        ) : null}
        {description ? (
          <span className={stepperDescriptionClass}>{description}</span>
        ) : null}
      </span>
    </>
  );

  return (
    <li
      className={stepperItemClass(orientation, className)}
      aria-current={status === "current" ? "step" : undefined}
      data-status={status}
    >
      {!isLast ? (
        <span
          aria-hidden
          className={stepperConnectorClass(orientation, status === "complete")}
        />
      ) : null}
      {clickable ? (
        <button type="button" className={frameClass} onClick={activate}>
          {body}
        </button>
      ) : (
        <div className={frameClass}>{body}</div>
      )}
    </li>
  );
}

/** Public step marker — collected by {@link Stepper}. */
export function StepperStep(_props: StepperStepProps): ReactNode {
  return null;
}
