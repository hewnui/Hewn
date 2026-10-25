import { cn } from "../utils/cn";

export const popoverSurfaceClass = cn(
  "overflow-auto rounded-[var(--kp-radius-panel)] border bg-surface-raised p-1",
  "shadow-[var(--kp-shadow-surface)] outline-none",
);

export const menuItemClass = cn(
  "flex cursor-default items-center gap-2 rounded-[var(--kp-radius-sm)]",
  "px-3 py-2 text-sm outline-none",
  "data-[focused]:bg-muted data-[disabled]:opacity-45",
);

export const fieldTriggerClass = cn(
  "inline-flex min-h-11 w-full max-w-sm items-center justify-between gap-2",
  "rounded-[var(--kp-radius-md)] border bg-surface px-3 text-sm",
  "shadow-[var(--kp-shadow-surface)] outline-none",
  "transition-[transform,background-color,border-color]",
  "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
  "data-[pressed]:scale-[0.96] data-[disabled]:opacity-45",
  "data-[focus-within]:ring-2 data-[focus-within]:ring-ring",
  "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring",
);
