import { cn } from "../../utils/cn";

export function checkboxClassName(className?: string | undefined) {
  return cn(
    "group flex min-h-10 items-center gap-3 text-sm text-foreground outline-none",
    "disabled:cursor-not-allowed disabled:opacity-45",
    className,
  );
}

export const checkboxBoxClass = cn(
  "relative flex size-5 shrink-0 items-center justify-center",
  "rounded-[calc(var(--kp-radius-sm)-0.125rem)] border",
  "border-[color-mix(in_oklch,var(--kp-foreground)_22%,transparent)]",
  "bg-[color-mix(in_oklch,var(--kp-surface)_88%,var(--kp-foreground)_4%)]",
  "shadow-[inset_0_1px_0_oklch(1_0_0/55%),0_1px_2px_oklch(0_0_0/8%)]",
  "transition-[background-color,border-color,box-shadow,transform]",
  "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
  "group-data-[selected]:border-accent group-data-[selected]:bg-accent",
  "group-data-[selected]:shadow-[inset_0_1px_0_oklch(1_0_0/30%),0_0_0_3px_color-mix(in_oklch,var(--kp-accent)_20%,transparent)]",
  "group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-ring",
  "group-data-[focus-visible]:ring-offset-2 group-data-[focus-visible]:ring-offset-background",
  "group-data-[pressed]:scale-[0.96]",
);

export const checkboxMarkClass =
  "size-3 text-accent-foreground drop-shadow-[0_1px_0_oklch(0_0_0/20%)]";
