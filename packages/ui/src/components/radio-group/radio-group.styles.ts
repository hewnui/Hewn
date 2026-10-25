import { cn } from "../../utils/cn";

export function radioGroupClassName(className?: string | undefined) {
  return cn(
    "flex w-full max-w-sm flex-col gap-2.5 text-sm text-foreground",
    className,
  );
}

export function radioGroupItemsClass(
  orientation: "horizontal" | "vertical" = "vertical",
) {
  return cn(
    "flex",
    orientation === "horizontal"
      ? "flex-row flex-wrap gap-x-1 gap-y-1"
      : "flex-col gap-1",
  );
}

export function radioClassName(className?: string | undefined) {
  return cn(
    "group flex min-h-11 items-center gap-3 rounded-[var(--kp-radius-md)] px-2.5 py-1.5",
    "text-sm text-foreground outline-none",
    "transition-[background-color,transform,color]",
    "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
    "hover:bg-[color-mix(in_oklch,var(--kp-muted)_52%,transparent)]",
    "data-[selected]:bg-[color-mix(in_oklch,var(--kp-accent)_10%,transparent)]",
    "data-[selected]:font-medium",
    "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/45",
    "data-[focus-visible]:ring-offset-2 data-[focus-visible]:ring-offset-background",
    "data-[pressed]:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-45",
    className,
  );
}

export const radioControlClass = cn(
  "relative flex size-5 shrink-0 items-center justify-center",
  "rounded-full border",
  "border-[color-mix(in_oklch,var(--kp-foreground)_36%,transparent)]",
  "bg-[color-mix(in_oklch,var(--kp-surface)_82%,var(--kp-foreground)_8%)]",
  "shadow-[inset_0_1px_0_oklch(1_0_0/45%),inset_0_0_0_1px_oklch(1_0_0/4%)]",
  "transition-[background-color,border-color,box-shadow,transform]",
  "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
  "group-hover:border-[color-mix(in_oklch,var(--kp-foreground)_48%,transparent)]",
  "group-data-[selected]:border-accent group-data-[selected]:bg-accent",
  "group-data-[selected]:shadow-[inset_0_1px_0_oklch(1_0_0/38%)]",
  "group-data-[pressed]:scale-[0.96]",
);

export const radioDotClass = cn(
  "size-2 rounded-full",
  "bg-[color-mix(in_oklch,var(--kp-accent-foreground)_94%,white)]",
  "shadow-[inset_0_1px_0_oklch(1_0_0/35%),0_1px_1px_oklch(0_0_0/18%)]",
);
