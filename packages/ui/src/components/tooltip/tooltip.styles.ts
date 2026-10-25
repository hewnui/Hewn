import { cn } from "../../utils/cn";

export function tooltipClassName(className?: string | undefined) {
  return cn(
    "z-50 max-w-xs rounded-[var(--kp-radius-sm)] border px-2.5 py-1.5 text-xs font-medium",
    "border-[color-mix(in_oklch,var(--kp-foreground)_22%,transparent)]",
    // Solid inverse chrome — never data-kp-surface (glass !important washes kill contrast).
    "bg-[var(--kp-foreground)] text-[var(--kp-background)]",
    "shadow-[var(--kp-shadow-surface)] outline-none",
    "transition-[opacity,transform] duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
    "data-[entering]:opacity-100 data-[exiting]:opacity-0",
    className,
  );
}
