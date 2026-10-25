import { cn } from "../../utils/cn";

export function cardClassName(className?: string) {
  return cn(
    "rounded-[var(--kp-radius-lg)] border border-border bg-surface text-foreground",
    "shadow-[var(--kp-shadow-surface)]",
    className,
  );
}

export function cardHeaderClassName(className?: string) {
  return cn("flex flex-col gap-1 px-4 pb-0 pt-4", className);
}

export function cardBodyClassName(className?: string) {
  return cn("px-4 py-3 text-sm leading-relaxed text-pretty", className);
}

export function cardFooterClassName(className?: string) {
  return cn(
    "flex flex-wrap items-center gap-2 border-t border-border/70 px-4 py-3",
    className,
  );
}
