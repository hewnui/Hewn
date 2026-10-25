import { cn } from "../../utils/cn";

export type SelectVariant = "outline" | "filled" | "flushed" | "glass";

const triggerVariants: Record<SelectVariant, string> = {
  outline: cn(
    "rounded-[var(--kp-radius-md)] border px-3",
    "border-[color-mix(in_oklch,var(--kp-foreground)_16%,transparent)]",
    "bg-[color-mix(in_oklch,var(--kp-surface)_88%,var(--kp-foreground)_4%)]",
    "shadow-[var(--kp-shadow-surface),inset_0_1px_0_oklch(1_0_0/35%)]",
    "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring",
  ),
  filled: cn(
    "rounded-[var(--kp-radius-md)] border border-transparent px-3",
    "bg-[color-mix(in_oklch,var(--kp-muted)_72%,transparent)]",
    "shadow-[inset_0_1px_0_oklch(1_0_0/18%)]",
    "hover:bg-[color-mix(in_oklch,var(--kp-muted)_88%,transparent)]",
    "data-[focus-visible]:border-ring data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/30",
  ),
  flushed: cn(
    "rounded-none border-0 border-b-2 border-solid bg-transparent px-0",
    "border-b-[color-mix(in_oklch,var(--kp-foreground)_32%,transparent)]",
    "shadow-none",
    "data-[focus-visible]:border-b-ring data-[focus-visible]:ring-0",
    "data-[focus-visible]:shadow-[0_1px_0_0_color-mix(in_oklch,var(--kp-ring)_55%,transparent)]",
  ),
  glass: cn(
    "rounded-[var(--kp-radius-md)] border px-3",
    "border-[color-mix(in_oklch,var(--kp-foreground)_14%,transparent)]",
    "bg-[color-mix(in_oklch,var(--kp-surface)_42%,transparent)]",
    "backdrop-blur-md backdrop-saturate-150",
    "shadow-[inset_0_1px_0_oklch(1_0_0/42%),inset_0_0_0_1px_oklch(1_0_0/8%),0_8px_24px_-14px_oklch(0_0_0/28%)]",
    "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring",
  ),
};

export function selectTriggerClass(className?: string, variant: SelectVariant = "outline") {
  return cn(
    "inline-flex min-h-11 min-w-52 items-center justify-between gap-3 text-sm outline-none",
    "transition-[transform,background-color,border-color,box-shadow]",
    "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
    "data-[pressed]:scale-[0.96] data-[disabled]:opacity-45",
    triggerVariants[variant],
    className,
  );
}

export const selectValueClass = "truncate text-foreground";

export const selectPopoverClass = cn(
  "min-w-[var(--trigger-width)] overflow-auto rounded-[var(--kp-radius-panel)]",
  "border bg-surface-raised p-1 shadow-[var(--kp-shadow-surface)] outline-none",
);

export const selectItemClass = cn(
  "flex cursor-default items-center rounded-[var(--kp-radius-sm)]",
  "px-3 py-2 text-sm outline-none",
  "data-[focused]:bg-muted data-[selected]:font-medium",
);
