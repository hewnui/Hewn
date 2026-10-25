import { cn } from "../../utils/cn";

export function sliderClassName(className?: string | undefined) {
  return cn(
    "flex w-full max-w-sm flex-col gap-2 text-sm text-foreground",
    "disabled:cursor-not-allowed disabled:opacity-45",
    className,
  );
}

export const sliderHeaderClass = "flex items-baseline justify-between gap-3";

export const sliderOutputClass =
  "font-mono text-xs tabular-nums text-muted-foreground";

export const sliderTrackClass = cn(
  "relative h-10 w-full",
  "before:absolute before:top-1/2 before:h-1.5 before:w-full before:-translate-y-1/2",
  "before:rounded-full before:bg-[color-mix(in_oklch,var(--kp-muted)_85%,var(--kp-foreground)_8%)]",
  "before:shadow-[inset_0_1px_0_oklch(0_0_0/8%)]",
);

export const sliderFillClass = cn(
  "absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-accent",
  "shadow-[inset_0_1px_0_oklch(1_0_0/25%)]",
);

export const sliderThumbClass = cn(
  "top-1/2 size-5 -translate-y-1/2 rounded-full border",
  "border-[color-mix(in_oklch,var(--kp-foreground)_18%,transparent)]",
  "bg-surface shadow-[var(--kp-shadow-surface),inset_0_1px_0_oklch(1_0_0/55%)]",
  "outline-none transition-[box-shadow,transform]",
  "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
  "dragging:scale-[0.96] data-[dragging]:scale-[0.96]",
  "focus-visible:ring-2 focus-visible:ring-ring/40",
);
