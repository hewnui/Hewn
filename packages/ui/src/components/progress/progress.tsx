"use client";

import { ProgressBar as AriaProgressBar, Label } from "react-aria-components";
import { cn } from "../../utils/cn";

export type ProgressVariant = "default" | "gradient" | "glass" | "success" | "danger";
export type ProgressSize = "sm" | "md" | "lg";

const trackSizes: Record<ProgressSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const fillVariants: Record<ProgressVariant, string> = {
  default: "bg-accent shadow-[inset_0_1px_0_oklch(1_0_0/30%)]",
  gradient: "bg-gradient-to-r from-accent to-[color-mix(in_oklch,var(--kp-accent)_75%,white)] shadow-[inset_0_1px_0_oklch(1_0_0/40%)]",
  glass: "bg-accent backdrop-blur-sm shadow-[inset_0_1px_0_oklch(1_0_0/40%)]",
  success: "bg-success shadow-[inset_0_1px_0_oklch(1_0_0/30%)]",
  danger: "bg-danger shadow-[inset_0_1px_0_oklch(1_0_0/30%)]",
};

export function Progress({
  className,
  label,
  value = 0,
  minValue = 0,
  maxValue = 100,
  isIndeterminate,
  size = "md",
  variant = "default",
}: {
  className?: string | undefined;
  label?: string;
  value?: number;
  minValue?: number;
  maxValue?: number;
  isIndeterminate?: boolean;
  size?: ProgressSize;
  variant?: ProgressVariant;
}) {
  return (
    <AriaProgressBar
      className={cn("flex w-full max-w-sm flex-col gap-2 text-sm", className)}
      value={value}
      minValue={minValue}
      maxValue={maxValue}
      {...(isIndeterminate !== undefined ? { isIndeterminate } : {})}
    >
      {({ percentage = 0 }) => (
        <>
          <div className="flex items-center justify-between gap-3">
            {label ? <Label className="font-medium">{label}</Label> : null}
            {!isIndeterminate ? (
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {Math.round(percentage)}%
              </span>
            ) : (
              <span className="font-mono text-xs text-muted-foreground">…</span>
            )}
          </div>
          <div
            data-kp-control="progress-track"
            className={cn(
              "relative overflow-hidden rounded-full border border-[color-mix(in_oklch,var(--kp-foreground)_12%,transparent)]",
              variant === "glass"
                ? "bg-[color-mix(in_oklch,var(--kp-surface)_45%,transparent)] backdrop-blur-md backdrop-saturate-150"
                : "bg-[color-mix(in_oklch,var(--kp-muted)_75%,transparent)] shadow-[inset_0_1px_1px_oklch(0_0_0/12%)]",
              trackSizes[size],
            )}
          >
            <div
              className={cn(
                "h-full w-full origin-left rounded-full transition-transform duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
                fillVariants[variant],
                isIndeterminate &&
                  "absolute inset-y-0 !w-1/3 kp-progress-indeterminate motion-reduce:animate-pulse",
              )}
              style={
                isIndeterminate
                  ? undefined
                  : {
                      transform: `scaleX(${Math.max(0, Math.min(1, percentage / 100))})`,
                    }
              }
            />
          </div>
        </>
      )}
    </AriaProgressBar>
  );
}
