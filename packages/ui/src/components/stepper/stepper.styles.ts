import { cn } from "../../utils/cn";
import type { StepperOrientation, StepStatus } from "./stepper.types";

export function stepperListClass(
  orientation: StepperOrientation,
  className?: string | undefined,
) {
  return cn(
    "m-0 flex list-none p-0",
    orientation === "horizontal"
      ? "flex-row flex-wrap items-start gap-0"
      : "flex-col gap-0",
    className,
  );
}

export function stepperItemClass(
  orientation: StepperOrientation,
  className?: string | undefined,
) {
  return cn(
    "relative flex",
    orientation === "horizontal"
      ? "min-w-0 flex-1 flex-col items-center gap-2 px-1"
      : "flex-row items-start gap-3",
    className,
  );
}

export function stepperConnectorClass(
  orientation: StepperOrientation,
  complete: boolean,
) {
  return cn(
    "pointer-events-none absolute bg-[color-mix(in_oklch,var(--kp-foreground)_14%,transparent)]",
    "transition-[background-color] duration-[var(--kp-motion-duration)]",
    "ease-[cubic-bezier(0.2,0,0,1)]",
    complete && "bg-accent",
    orientation === "horizontal"
      ? "start-[calc(50%+1.1rem)] end-[calc(-50%+1.1rem)] top-[1.15rem] h-px"
      : "start-[1.15rem] top-[2.4rem] bottom-[-0.15rem] w-px",
  );
}

const indicatorTone: Record<StepStatus, string> = {
  complete: cn(
    "border-accent bg-accent text-accent-foreground",
    "shadow-[inset_0_1px_0_oklch(1_0_0/28%)]",
  ),
  current: cn(
    "border-accent bg-[color-mix(in_oklch,var(--kp-accent)_16%,transparent)]",
    "text-accent ring-2 ring-ring ring-offset-2 ring-offset-background",
  ),
  upcoming:
    "border-[color-mix(in_oklch,var(--kp-foreground)_18%,transparent)] bg-surface text-muted-foreground",
  error: cn(
    "border-danger bg-[color-mix(in_oklch,var(--kp-danger)_14%,transparent)]",
    "text-danger",
  ),
  optional:
    "border-dashed border-[color-mix(in_oklch,var(--kp-foreground)_22%,transparent)] bg-surface text-muted-foreground",
};

export function stepperIndicatorClass(status: StepStatus) {
  return cn(
    "relative z-10 inline-flex size-10 shrink-0 items-center justify-center",
    "rounded-full border text-sm font-medium tabular-nums outline-none",
    "transition-[transform,background-color,border-color,color,box-shadow]",
    "duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)]",
    indicatorTone[status],
  );
}

export function stepperButtonClass(clickable: boolean) {
  return cn(
    "flex w-full flex-col items-center gap-2 text-center outline-none",
    "rounded-[var(--kp-radius-md)]",
    clickable &&
      "cursor-pointer transition-[transform] duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-ring",
    !clickable && "cursor-default",
  );
}

export function stepperButtonVerticalClass(clickable: boolean) {
  return cn(
    "flex min-h-10 w-full flex-row items-start gap-3 text-start outline-none",
    "rounded-[var(--kp-radius-md)]",
    clickable &&
      "cursor-pointer transition-[transform] duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-ring",
    !clickable && "cursor-default",
  );
}

export const stepperTitleClass =
  "text-sm font-medium tracking-tight text-balance text-foreground";

export const stepperDescriptionClass =
  "mt-0.5 text-xs leading-relaxed text-pretty text-muted-foreground";

export const stepperOptionalClass =
  "mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground";
