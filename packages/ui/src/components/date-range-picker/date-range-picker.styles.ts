import { cn } from "../../utils/cn";

export function dateRangePickerClassName(className?: string | undefined) {
  return cn(
    "flex w-full max-w-md flex-col gap-1.5 text-sm text-foreground",
    className,
  );
}

export const dateRangeGroupClass = cn(
  "inline-flex min-h-11 w-full items-center gap-1",
  "rounded-[var(--kp-radius-md)] border bg-surface px-2 text-sm",
  "shadow-[var(--kp-shadow-surface)] outline-none",
  "transition-[transform,background-color,border-color]",
  "duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)]",
  "data-[disabled]:opacity-45",
  "data-[focus-within]:ring-2 data-[focus-within]:ring-ring",
);

export const dateRangeInputClass =
  "flex flex-1 gap-0.5 tabular-nums outline-none";

export const dateRangeSegmentClass = cn(
  "rounded px-0.5 outline-none",
  "data-[placeholder]:text-muted-foreground",
  "data-[focused]:bg-muted",
);

export const dateRangeTriggerClass = cn(
  "inline-flex min-h-10 min-w-10 items-center justify-center",
  "rounded-[var(--kp-radius-sm)] text-muted-foreground outline-none",
  "transition-[transform,color]",
  "duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)]",
  "data-[pressed]:scale-[0.96]",
  "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring",
);

export const dateRangePopoverClass = cn(
  "overflow-auto rounded-[var(--kp-radius-panel)] border bg-surface-raised p-3",
  "shadow-[var(--kp-shadow-surface)] outline-none",
);

export const dateRangeDialogClass = "flex flex-col gap-3 outline-none sm:flex-row";

export const dateRangePresetsClass = cn(
  "flex shrink-0 flex-row flex-wrap gap-1 sm:w-36 sm:flex-col",
);

export const dateRangePresetButtonClass = cn(
  "inline-flex min-h-10 items-center justify-start rounded-[var(--kp-radius-sm)]",
  "px-3 text-left text-sm text-foreground outline-none",
  "transition-[transform,background-color]",
  "duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)]",
  "hover:bg-muted data-[pressed]:scale-[0.96]",
  "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring",
);

export const dateRangeNavButtonClass = cn(
  "inline-flex min-h-10 min-w-10 items-center justify-center",
  "rounded-[var(--kp-radius-sm)] outline-none",
  "transition-[transform]",
  "duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)]",
  "data-[pressed]:scale-[0.96]",
  "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring",
);

export const dateRangeCellClass = cn(
  "size-9 rounded-[var(--kp-radius-sm)] text-center outline-none tabular-nums",
  "transition-[background-color,color,transform]",
  "duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)]",
  "data-[hovered]:bg-muted",
  "data-[selected]:bg-[color-mix(in_oklch,var(--kp-accent)_22%,transparent)]",
  "data-[selected]:text-foreground",
  "data-[selection-start]:bg-accent data-[selection-start]:text-accent-foreground",
  "data-[selection-end]:bg-accent data-[selection-end]:text-accent-foreground",
  "data-[disabled]:opacity-35 data-[unavailable]:opacity-35",
  "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring",
  "data-[pressed]:scale-[0.96]",
);
