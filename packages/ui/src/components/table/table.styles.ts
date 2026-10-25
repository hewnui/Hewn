import { cn } from "../../utils/cn";

export function tableShellClass(className?: string | undefined) {
  return cn(
    "overflow-x-auto rounded-[var(--kp-radius-panel)] border",
    "border-[color-mix(in_oklch,var(--kp-foreground)_12%,transparent)]",
    "shadow-[var(--kp-shadow-surface)]",
    className,
  );
}

export function tableRootClass(className?: string | undefined) {
  return cn(
    "w-full caption-bottom border-separate border-spacing-0 text-sm",
    "bg-transparent",
    className,
  );
}

export const tableHeaderClass =
  "bg-[color-mix(in_oklch,var(--kp-muted)_55%,transparent)]";

export function tableColumnClass(className?: string | undefined) {
  return cn(
    "h-11 px-4 text-left align-middle text-xs font-semibold tracking-wide",
    "text-muted-foreground outline-none",
    "transition-[color,background-color] duration-[var(--kp-motion-duration)]",
    "ease-[var(--kp-motion-ease-standard)]",
    "data-[hovered]:text-foreground",
    "data-[focus-visible]:ring-2 data-[focus-visible]:ring-inset data-[focus-visible]:ring-ring",
    "data-[allows-sorting]:cursor-pointer",
    className,
  );
}

export function tableRowClass(className?: string | undefined) {
  return cn(
    "outline-none transition-[background-color,transform]",
    "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
    "data-[hovered]:bg-[color-mix(in_oklch,var(--kp-muted)_45%,transparent)]",
    "data-[selected]:bg-[color-mix(in_oklch,var(--kp-accent)_12%,transparent)]",
    "data-[focus-visible]:ring-2 data-[focus-visible]:ring-inset data-[focus-visible]:ring-ring",
    "data-[disabled]:opacity-45",
    className,
  );
}

export function tableCellClass(className?: string | undefined) {
  return cn(
    "border-t border-[color-mix(in_oklch,var(--kp-foreground)_8%,transparent)]",
    "px-4 py-3 align-middle text-foreground tabular-nums",
    "[&:first-child]:font-medium [&:first-child]:[font-variant-numeric:normal]",
    className,
  );
}

export const tableEmptyClass =
  "flex min-h-36 flex-col items-center justify-center gap-2 px-4 py-10 text-center";

export const tableLoadingClass =
  "flex min-h-44 w-full items-center justify-center px-2 py-6 text-sm";
