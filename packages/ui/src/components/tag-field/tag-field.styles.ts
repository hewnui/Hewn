import { cn } from "../../utils/cn";
import type { FieldSize, FieldVariant } from "../../styles/field";
import { fieldSurfaceProps } from "../../styles/field";
import { menuItemClass, popoverSurfaceClass } from "../../styles/overlays";

export { fieldSurfaceProps };

const variants: Record<FieldVariant, string> = {
  outline: cn(
    "border border-[color-mix(in_oklch,var(--kp-foreground)_16%,transparent)]",
    "bg-[color-mix(in_oklch,var(--kp-surface)_88%,var(--kp-foreground)_4%)]",
    "shadow-[var(--kp-shadow-surface),inset_0_1px_0_oklch(1_0_0/35%)]",
    "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
  ),
  filled: cn(
    "border border-transparent",
    "bg-[color-mix(in_oklch,var(--kp-muted)_72%,transparent)]",
    "shadow-[inset_0_1px_0_oklch(1_0_0/18%)]",
    "hover:bg-[color-mix(in_oklch,var(--kp-muted)_88%,transparent)]",
    "focus-within:border-ring focus-within:bg-surface focus-within:ring-2 focus-within:ring-ring/30",
  ),
  flushed: cn(
    "rounded-none border-0 border-b-2 border-solid bg-transparent px-0",
    "border-b-[color-mix(in_oklch,var(--kp-foreground)_32%,transparent)]",
    "shadow-none focus-within:border-b-ring focus-within:ring-0",
    "focus-within:shadow-[0_1px_0_0_color-mix(in_oklch,var(--kp-ring)_55%,transparent)]",
  ),
  glass: cn(
    "border border-[color-mix(in_oklch,var(--kp-foreground)_14%,transparent)]",
    "bg-[color-mix(in_oklch,var(--kp-surface)_42%,transparent)]",
    "backdrop-blur-md backdrop-saturate-150",
    "shadow-[inset_0_1px_0_oklch(1_0_0/42%),inset_0_0_0_1px_oklch(1_0_0/8%),0_8px_24px_-14px_oklch(0_0_0/28%)]",
    "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
  ),
};

const sizes: Record<FieldSize, string> = {
  sm: "min-h-10 gap-1.5 px-2 py-1.5 text-xs rounded-[var(--kp-radius-sm)]",
  md: "min-h-11 gap-2 px-2.5 py-2 text-sm rounded-[var(--kp-radius-md)]",
  lg: "min-h-12 gap-2 px-3 py-2.5 text-base rounded-[var(--kp-radius-md)]",
};

export function tagFieldShellClass(
  className?: string,
  size: FieldSize = "md",
  variant: FieldVariant = "outline",
) {
  return cn(
    "flex w-full flex-wrap items-center text-foreground outline-none",
    "transition-[border-color,box-shadow,background-color,backdrop-filter]",
    "duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)]",
    "invalid:border-danger",
    variants[variant],
    variant === "flushed"
      ? size === "sm"
        ? "min-h-10 gap-1.5 py-1 text-xs"
        : size === "lg"
          ? "min-h-12 gap-2 py-2 text-base"
          : "min-h-11 gap-2 py-1.5 text-sm"
      : sizes[size],
    className,
  );
}

export function tagFieldInputClass(size: FieldSize = "md") {
  return cn(
    "min-w-[8ch] flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
    size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm",
  );
}

export function tagFieldToggleClass() {
  return cn(
    "inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center",
    "rounded-[var(--kp-radius-sm)] text-muted-foreground outline-none",
    "transition-[transform,color,background-color]",
    "duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)]",
    "hover:bg-muted data-[pressed]:scale-[0.96]",
    "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/40",
  );
}

export function tagFieldTagClass() {
  return cn(
    "inline-flex max-w-full items-center gap-0.5",
    "rounded-[var(--kp-radius-sm)] border pl-2 text-xs font-medium",
    "border-[color-mix(in_oklch,var(--kp-foreground)_14%,transparent)]",
    "bg-[color-mix(in_oklch,var(--kp-muted)_70%,transparent)] text-foreground",
    "outline-none transition-[transform,background-color,border-color]",
    "duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)]",
    "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/40",
    "data-[disabled]:opacity-45",
  );
}

export function tagFieldRemoveClass() {
  return cn(
    "inline-flex min-h-10 min-w-10 items-center justify-center",
    "rounded-[var(--kp-radius-sm)] text-muted-foreground outline-none",
    "transition-[transform,color,background-color]",
    "duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)]",
    "hover:bg-[color-mix(in_oklch,var(--kp-foreground)_8%,transparent)]",
    "hover:text-foreground data-[pressed]:scale-[0.96]",
    "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/40",
  );
}

export const tagFieldListClass = "outline-none";

export const tagFieldItemClass = cn(
  menuItemClass,
  "data-[selected]:font-medium data-[disabled]:opacity-45",
);

export const tagFieldPopoverClass = cn(
  popoverSurfaceClass,
  "min-w-[var(--trigger-width)]",
);

export const tagFieldTagListClass =
  "flex min-w-0 flex-1 flex-wrap items-center gap-1.5 outline-none";

export const tagFieldEmptyClass =
  "px-1 text-xs text-muted-foreground text-pretty";

export const tagFieldListEmptyClass =
  "px-3 py-2 text-sm text-muted-foreground text-pretty";
