import { cn } from "../../utils/cn";

export const dialogOverlayClass =
  "fixed inset-0 z-50 bg-[color-mix(in_oklch,var(--kp-foreground)_28%,transparent)]";

export const dialogModalClass =
  "fixed inset-0 z-50 flex items-center justify-center p-4";

export function dialogPanelClass(className?: string | undefined) {
  return cn(
    "w-full max-w-md rounded-[var(--kp-radius-panel)] border bg-surface p-5",
    "shadow-[var(--kp-shadow-surface)] outline-none",
    className,
  );
}

export const dialogTitleClass =
  "text-lg font-semibold tracking-tight text-balance";

export const dialogBodyClass = "mt-2 text-sm text-muted-foreground text-pretty";

export const dialogActionsClass = "mt-6 flex flex-wrap justify-end gap-2";
