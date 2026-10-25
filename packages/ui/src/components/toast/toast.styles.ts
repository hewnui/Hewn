import { cn } from "../../utils/cn";

export type ToastTone = "default" | "success" | "danger" | "warning" | "info";

const toneVars: Record<ToastTone, string> = {
  default:
    "[--toast-tone:var(--kp-foreground)] [--toast-tone-soft:color-mix(in_oklch,var(--kp-foreground)_12%,transparent)]",
  success: "[--toast-tone:var(--kp-success)] [--toast-tone-soft:var(--kp-success-subtle)]",
  danger: "[--toast-tone:var(--kp-danger)] [--toast-tone-soft:var(--kp-danger-subtle)]",
  warning: "[--toast-tone:var(--kp-warning)] [--toast-tone-soft:var(--kp-warning-subtle)]",
  info: "[--toast-tone:var(--kp-info)] [--toast-tone-soft:var(--kp-info-subtle)]",
};

export function toastViewportClassName() {
  return cn(
    "pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col-reverse items-stretch gap-2.5 px-4",
    "sm:inset-x-auto sm:end-4 sm:bottom-5 sm:w-[min(100%-2rem,22.5rem)]",
  );
}

export function toastItemClassName(tone: ToastTone = "default") {
  return cn(
    "pointer-events-auto relative w-full overflow-hidden",
    "rounded-[var(--kp-radius-panel)] border",
    "border-[color-mix(in_oklch,var(--toast-tone)_28%,var(--kp-border))]",
    // Opaque fallback; glass material upgrades fill/blur via data-kp-control="toast".
    "bg-[color-mix(in_oklch,var(--kp-surface-raised)_88%,var(--toast-tone)_12%)]",
    "shadow-[inset_0_1px_0_oklch(1_0_0/14%),inset_0_0_0_1px_oklch(1_0_0/5%),var(--kp-shadow-surface)]",
    toneVars[tone],
  );
}

export function toastBodyClassName() {
  return "relative flex gap-3 px-3.5 py-3.5 pe-2";
}

export function toastIconWellClassName() {
  return cn(
    "relative mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full",
    "bg-[var(--toast-tone-soft)] text-[var(--toast-tone)]",
    "shadow-[inset_0_1px_0_oklch(1_0_0/22%),inset_0_0_0_1px_color-mix(in_oklch,var(--toast-tone)_18%,transparent)]",
  );
}

export function toastIconClassName() {
  return "size-4";
}

export function toastMetaClassName() {
  return "font-mono text-[10px] uppercase tracking-[0.14em] text-[color-mix(in_oklch,var(--toast-tone)_82%,var(--kp-muted-foreground))]";
}

export function toastTitleClassName() {
  return "mt-0.5 text-sm font-medium tracking-tight text-foreground text-pretty";
}

export function toastDescriptionClassName() {
  return "mt-1 text-xs leading-relaxed text-muted-foreground text-pretty";
}

export function toastDismissClassName() {
  return cn(
    "inline-flex size-10 shrink-0 items-center justify-center self-start",
    "rounded-[var(--kp-radius-md)] text-muted-foreground",
    "transition-[background-color,color,transform]",
    "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
    "hover:bg-muted/55 hover:text-foreground active:scale-[0.96]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45",
  );
}

export function toastProgressTrackClassName() {
  return "absolute inset-x-0 bottom-0 h-0.5 bg-[color-mix(in_oklch,var(--toast-tone)_12%,transparent)]";
}

export function toastProgressBarClassName() {
  return "h-full origin-left bg-[var(--toast-tone)]";
}

export const toastToneLabel: Record<ToastTone, string> = {
  default: "Notice",
  success: "Success",
  danger: "Error",
  warning: "Warning",
  info: "Info",
};
