import { cn } from "../../utils/cn";

export function colorPickerClassName(className?: string | undefined) {
  return cn(
    "flex w-full max-w-sm flex-col gap-1.5 text-sm text-foreground",
    className,
  );
}

export const colorPickerTriggerClass = cn(
  "inline-flex min-h-11 w-full items-center gap-3",
  "rounded-[var(--kp-radius-md)] border bg-surface px-3 text-sm",
  "shadow-[var(--kp-shadow-surface)] outline-none",
  "transition-[transform,background-color,border-color]",
  "duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)]",
  "data-[pressed]:scale-[0.96] data-[disabled]:opacity-45",
  "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring",
);

export const colorPickerSwatchPreviewClass = cn(
  "size-8 shrink-0 rounded-[var(--kp-radius-sm)] border",
  "border-[color-mix(in_oklch,var(--kp-foreground)_18%,transparent)]",
  "shadow-[inset_0_1px_0_oklch(1_0_0/35%)]",
);

export const colorPickerPopoverClass = cn(
  "overflow-auto rounded-[var(--kp-radius-panel)] border bg-surface-raised p-3",
  "shadow-[var(--kp-shadow-surface)] outline-none",
);

export const colorPickerPanelClass = "flex w-[16.5rem] flex-col gap-3 outline-none";

export const colorAreaClass = cn(
  "h-36 w-full rounded-[var(--kp-radius-md)]",
  "shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--kp-foreground)_12%,transparent)]",
  "forced-color-adjust-none",
);

export const colorThumbClass = cn(
  "size-5 rounded-full border-2 border-white",
  "shadow-[0_1px_2px_oklch(0_0_0/35%)] outline-none",
  "transition-[transform]",
  "duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)]",
  "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring",
  "data-[dragging]:scale-[0.96]",
);

export const colorSliderClass = "flex flex-col gap-1.5";

export const colorSliderTrackClass = cn(
  "relative h-10 w-full rounded-full",
  "bg-[var(--react-aria-color-slider-track-background)]",
  "forced-color-adjust-none",
);

export const colorFieldClass = "flex flex-col gap-1.5";

export const colorFieldInputClass = cn(
  "min-h-10 w-full rounded-[var(--kp-radius-md)] border bg-surface px-3",
  "font-mono text-sm tabular-nums outline-none",
  "transition-[border-color,box-shadow]",
  "duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)]",
  "focus-visible:ring-2 focus-visible:ring-ring/30",
);

export const colorSwatchPickerClass = "flex flex-wrap gap-2";

export const colorSwatchItemClass = cn(
  "inline-flex min-h-10 min-w-10 items-center justify-center rounded-[var(--kp-radius-sm)]",
  "outline-none transition-[transform,box-shadow]",
  "duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)]",
  "data-[selected]:ring-2 data-[selected]:ring-ring",
  "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring",
  "data-[pressed]:scale-[0.96]",
);

export const colorSwatchClass = cn(
  "size-8 rounded-[var(--kp-radius-sm)] border",
  "border-[color-mix(in_oklch,var(--kp-foreground)_16%,transparent)]",
);

export const colorOklchReadoutClass =
  "font-mono text-xs tabular-nums text-muted-foreground";

export const defaultColorPresets = [
  "#1a6b4a",
  "#0f766e",
  "#334155",
  "#b45309",
  "#9a3412",
  "#e7e5e4",
  "#0c0a09",
  "#f8fafc",
];
