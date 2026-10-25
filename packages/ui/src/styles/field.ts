import { cn } from "../utils/cn";

export type FieldVariant = "outline" | "filled" | "flushed" | "glass";
export type FieldSize = "sm" | "md" | "lg";

export const fieldRootClass =
  "flex w-full max-w-sm flex-col gap-1.5 text-sm text-foreground";

export const fieldLabelClass = "font-medium tracking-tight text-foreground";

export const fieldDescriptionClass = "text-xs leading-relaxed text-muted-foreground";

export const fieldErrorClass = "text-xs leading-relaxed text-danger";

const variants: Record<FieldVariant, string> = {
  outline: cn(
    "border border-[color-mix(in_oklch,var(--kp-foreground)_16%,transparent)]",
    "bg-[color-mix(in_oklch,var(--kp-surface)_88%,var(--kp-foreground)_4%)]",
    "shadow-[var(--kp-shadow-surface),inset_0_1px_0_oklch(1_0_0/35%)]",
    "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
    "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
  ),
  filled: cn(
    "border border-transparent",
    "bg-[color-mix(in_oklch,var(--kp-muted)_72%,transparent)]",
    "shadow-[inset_0_1px_0_oklch(1_0_0/18%)]",
    "hover:bg-[color-mix(in_oklch,var(--kp-muted)_88%,transparent)]",
    "focus-visible:border-ring focus-visible:bg-surface focus-visible:ring-2 focus-visible:ring-ring/30",
    "focus-within:border-ring focus-within:bg-surface focus-within:ring-2 focus-within:ring-ring/30",
  ),
  flushed: cn(
    "rounded-none border-0 border-b-2 border-solid bg-transparent px-0",
    "border-b-[color-mix(in_oklch,var(--kp-foreground)_32%,transparent)]",
    "shadow-none",
    "focus-visible:border-b-ring focus-visible:ring-0",
    "focus-within:border-b-ring focus-within:ring-0",
    "focus-within:shadow-[0_1px_0_0_color-mix(in_oklch,var(--kp-ring)_55%,transparent)]",
  ),
  glass: cn(
    "border border-[color-mix(in_oklch,var(--kp-foreground)_14%,transparent)]",
    "bg-[color-mix(in_oklch,var(--kp-surface)_42%,transparent)]",
    "backdrop-blur-md backdrop-saturate-150",
    "shadow-[inset_0_1px_0_oklch(1_0_0/42%),inset_0_0_0_1px_oklch(1_0_0/8%),0_8px_24px_-14px_oklch(0_0_0/28%)]",
    "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
    "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
  ),
};

const sizes: Record<FieldSize, string> = {
  sm: "min-h-9 px-2.5 text-xs rounded-[var(--kp-radius-sm)]",
  md: "min-h-11 px-3 text-sm rounded-[var(--kp-radius-md)]",
  lg: "min-h-12 px-4 text-base rounded-[var(--kp-radius-md)]",
};

export function inputSurfaceClassName({
  className,
  size = "md",
  variant = "outline",
}: {
  className?: string | undefined;
  size?: FieldSize | undefined;
  variant?: FieldVariant | undefined;
} = {}) {
  return cn(
    "w-full text-foreground outline-none",
    "transition-[border-color,box-shadow,background-color,backdrop-filter]",
    "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
    "placeholder:text-muted-foreground",
    "disabled:cursor-not-allowed disabled:opacity-45",
    "invalid:border-danger",
    variants[variant],
    variant !== "flushed"
      ? sizes[size]
      : size === "sm"
        ? "min-h-8 text-xs"
        : size === "lg"
          ? "min-h-11 text-base"
          : "min-h-10 text-sm",
    className,
  );
}

/** @deprecated Prefer inputSurfaceClassName — kept for TextField call sites */
export const inputClassName = inputSurfaceClassName;

/**
 * Under glass material, boxed field variants inherit panel glass.
 * Flushed stays underline-only and must never receive the panel inset ring.
 */
export function fieldSurfaceProps(variant: FieldVariant = "outline") {
  return variant === "flushed"
    ? ({ "data-kp-field": "flushed" } as const)
    : ({ "data-kp-surface": true } as const);
}
