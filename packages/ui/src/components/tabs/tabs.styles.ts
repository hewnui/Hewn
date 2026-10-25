import { cn } from "../../utils/cn";

export type TabsVariant = "pills" | "line" | "solid" | "glass";

const listVariants: Record<TabsVariant, string> = {
  pills: cn(
    "relative inline-flex max-w-full gap-0.5 overflow-x-auto rounded-[var(--kp-radius-md)] p-1",
    "border border-[color-mix(in_oklch,var(--kp-foreground)_12%,transparent)]",
    "bg-[color-mix(in_oklch,var(--kp-muted)_72%,transparent)]",
    "shadow-[inset_0_1px_2px_oklch(0_0_0/8%)]",
  ),
  line: cn(
    "relative inline-flex max-w-full gap-4 overflow-x-auto border-b",
    "border-[color-mix(in_oklch,var(--kp-foreground)_14%,transparent)] pb-0.5",
  ),
  solid: cn(
    "relative inline-flex max-w-full gap-1 overflow-x-auto rounded-[var(--kp-radius-md)] p-1.5",
    "bg-surface border border-[color-mix(in_oklch,var(--kp-foreground)_10%,transparent)]",
    "shadow-[var(--kp-shadow-surface)]",
  ),
  glass: cn(
    "relative inline-flex max-w-full gap-0.5 overflow-x-auto rounded-[var(--kp-radius-md)] p-1",
    "border border-[color-mix(in_oklch,var(--kp-foreground)_16%,transparent)]",
    "bg-[color-mix(in_oklch,var(--kp-surface)_45%,transparent)]",
    "backdrop-blur-md backdrop-saturate-150",
    "shadow-[inset_0_1px_0_oklch(1_0_0/30%)]",
  ),
};

export function tabsListClass(className?: string, variant: TabsVariant = "pills") {
  return cn(listVariants[variant], className);
}

export function tabClass(variant: TabsVariant = "pills") {
  return cn(
    "relative z-10 inline-flex min-h-10 min-w-10 items-center justify-center",
    variant === "line"
      ? "pb-2.5 pt-1.5 px-1 text-sm font-medium text-muted-foreground outline-none transition-colors duration-[var(--kp-motion-duration)] data-[selected]:text-foreground data-[hovered]:text-foreground"
      : variant === "solid"
        ? "rounded-[calc(var(--kp-radius-md)-0.25rem)] px-3.5 text-sm font-medium text-muted-foreground outline-none transition-[color,transform] duration-[var(--kp-motion-duration)] data-[selected]:text-accent-foreground data-[hovered]:text-foreground data-[pressed]:scale-[0.96]"
        : "rounded-[calc(var(--kp-radius-md)-0.2rem)] px-3.5 text-sm font-medium text-muted-foreground outline-none transition-[color,transform] duration-[var(--kp-motion-duration)] data-[selected]:text-foreground data-[hovered]:text-foreground data-[pressed]:scale-[0.96]",
    "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring",
    "data-[focus-visible]:ring-offset-2 data-[focus-visible]:ring-offset-background",
  );
}

export function tabIndicatorClass(variant: TabsVariant = "pills") {
  if (variant === "line") {
    return cn(
      "absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
      "bg-accent shadow-[0_0_8px_var(--kp-accent)]",
    );
  }
  if (variant === "solid") {
    return cn(
      "absolute inset-0 -z-0 rounded-[calc(var(--kp-radius-md)-0.25rem)]",
      "bg-accent shadow-sm",
    );
  }
  if (variant === "glass") {
    return cn(
      "absolute inset-0 -z-0 rounded-[calc(var(--kp-radius-md)-0.2rem)]",
      "bg-[color-mix(in_oklch,var(--kp-surface-raised)_85%,white)]",
      "backdrop-blur-sm shadow-[0_1px_2px_oklch(0_0_0/12%),inset_0_1px_0_oklch(1_0_0/60%)]",
      "ring-1 ring-[color-mix(in_oklch,var(--kp-foreground)_12%,transparent)]",
    );
  }
  return cn(
    "absolute inset-0 -z-0 rounded-[calc(var(--kp-radius-md)-0.2rem)]",
    "bg-[color-mix(in_oklch,var(--kp-surface-raised)_92%,white)]",
    "shadow-[0_1px_2px_oklch(0_0_0/10%),0_6px_16px_-10px_oklch(0_0_0/28%),inset_0_1px_0_oklch(1_0_0/70%)]",
    "ring-1 ring-[color-mix(in_oklch,var(--kp-foreground)_10%,transparent)]",
  );
}

export const tabPanelClass = cn(
  "mt-4 text-sm leading-relaxed text-muted-foreground text-pretty outline-none",
  "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring",
);
