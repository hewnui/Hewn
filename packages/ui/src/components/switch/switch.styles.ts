import { cn } from "../../utils/cn";

export function switchClassName(className?: string | undefined) {
  return cn(
    "group inline-flex min-h-10 items-center gap-3 text-sm text-foreground outline-none",
    "disabled:cursor-not-allowed disabled:opacity-45",
    className,
  );
}

export const switchTrackClass = cn(
  "relative h-7 w-12 shrink-0 rounded-full border p-0.5",
  "border-[color-mix(in_oklch,var(--kp-foreground)_20%,transparent)]",
  "bg-[color-mix(in_oklch,var(--kp-muted)_82%,var(--kp-foreground)_10%)]",
  "shadow-[inset_0_1px_2px_oklch(0_0_0/14%),inset_0_-1px_0_oklch(1_0_0/18%)]",
  "transition-[background-color,border-color,box-shadow,transform]",
  "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
  "group-data-[selected]:border-accent group-data-[selected]:bg-accent",
  "group-data-[selected]:shadow-[inset_0_1px_0_oklch(1_0_0/28%),0_0_0_3px_color-mix(in_oklch,var(--kp-accent)_24%,transparent),0_8px_18px_-10px_color-mix(in_oklch,var(--kp-accent)_55%,transparent)]",
  "group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-ring",
  "group-data-[focus-visible]:ring-offset-2 group-data-[focus-visible]:ring-offset-background",
  "group-data-[pressed]:scale-[0.96]",
  "group-disabled:opacity-100",
);

export const switchThumbClass = cn(
  "block size-5 rounded-full",
  "bg-[color-mix(in_oklch,var(--kp-surface-raised)_92%,white)]",
  "shadow-[0_1px_2px_oklch(0_0_0/22%),0_4px_10px_oklch(0_0_0/12%),inset_0_1px_0_oklch(1_0_0/85%)]",
  "transition-[transform,box-shadow] duration-[var(--kp-motion-duration)]",
  "ease-[var(--kp-motion-ease-standard)]",
  "translate-x-0 group-data-[selected]:translate-x-5",
  "group-data-[selected]:shadow-[0_1px_2px_oklch(0_0_0/18%),0_6px_14px_oklch(0_0_0/16%),inset_0_1px_0_oklch(1_0_0/90%)]",
);
