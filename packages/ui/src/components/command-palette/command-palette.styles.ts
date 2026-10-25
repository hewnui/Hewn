import { cn } from "../../utils/cn";
import { menuItemClass } from "../../styles/overlays";

export const commandOverlayClass = cn(
  "fixed inset-0 z-50 flex items-start justify-center",
  "bg-[color-mix(in_oklch,var(--kp-foreground)_28%,transparent)]",
  "px-4 pt-[min(20vh,8rem)]",
  "transition-[opacity] duration-[var(--kp-motion-duration)]",
  "ease-[cubic-bezier(0.2,0,0,1)]",
  "entering:opacity-100 exiting:opacity-0",
  "data-[entering]:opacity-100 data-[exiting]:opacity-0",
);

export function commandPanelClass(className?: string | undefined) {
  return cn(
    "flex w-full max-w-lg flex-col overflow-hidden",
    "rounded-[var(--kp-radius-panel)] border bg-surface-raised",
    "shadow-[var(--kp-shadow-surface)] outline-none",
    "transition-[opacity,transform] duration-[var(--kp-motion-duration)]",
    "ease-[cubic-bezier(0.2,0,0,1)]",
    "data-[entering]:opacity-100 data-[entering]:translate-y-0",
    "data-[exiting]:opacity-0 data-[exiting]:-translate-y-1",
    "motion-reduce:transition-none motion-reduce:transform-none",
    className,
  );
}

export function commandInputWrapClass(className?: string | undefined) {
  return cn(
    "flex min-h-11 items-center gap-2 border-b px-3",
    "border-[color-mix(in_oklch,var(--kp-foreground)_12%,transparent)]",
    className,
  );
}

export const commandInputClass = cn(
  "min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none",
  "placeholder:text-muted-foreground",
);

export function commandListClass(className?: string | undefined) {
  return cn(
    "max-h-[min(50vh,22rem)] overflow-auto p-1.5 outline-none",
    className,
  );
}

export function commandGroupClass(className?: string | undefined) {
  return cn("mt-1 first:mt-0", className);
}

export const commandGroupHeadingClass = cn(
  "px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em]",
  "text-muted-foreground",
);

export function commandItemClass(className?: string | undefined) {
  return cn(
    menuItemClass,
    "min-h-10 justify-between gap-3",
    "transition-[transform,background-color] duration-[var(--kp-motion-duration)]",
    "ease-[cubic-bezier(0.2,0,0,1)]",
    "data-[pressed]:scale-[0.96]",
    className,
  );
}

export const commandItemLabelClass =
  "inline-flex min-w-0 items-center gap-2 text-pretty";

export const commandItemIconClass =
  "inline-flex size-4 shrink-0 items-center justify-center text-muted-foreground";

export const commandShortcutClass = cn(
  "ms-auto shrink-0 rounded-[var(--kp-radius-sm)] border px-1.5 py-0.5",
  "border-[color-mix(in_oklch,var(--kp-foreground)_14%,transparent)]",
  "font-mono text-[10px] tabular-nums text-muted-foreground",
);

export const commandEmptyClass =
  "px-3 py-8 text-center text-sm text-muted-foreground text-pretty";

export const commandLoadingClass =
  "flex items-center justify-center gap-2 px-3 py-8 text-sm text-muted-foreground";
