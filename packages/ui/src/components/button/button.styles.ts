import { cn } from "../../utils/cn";
import type { ButtonSize, ButtonVariant } from "./button.types";

const variants: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-accent text-accent-foreground",
    "shadow-[0_1px_2px_oklch(0_0_0/14%),0_8px_20px_-12px_color-mix(in_oklch,var(--kp-accent)_55%,transparent),inset_0_1px_0_oklch(1_0_0/28%)]",
    "hover:brightness-[1.05] hover:shadow-[0_1px_2px_oklch(0_0_0/16%),0_12px_28px_-14px_color-mix(in_oklch,var(--kp-accent)_62%,transparent),inset_0_1px_0_oklch(1_0_0/34%)]",
  ),
  secondary: cn(
    "border border-[color-mix(in_oklch,var(--kp-foreground)_14%,transparent)]",
    "bg-[color-mix(in_oklch,var(--kp-surface)_94%,var(--kp-foreground)_3%)] text-foreground",
    "shadow-[0_1px_2px_oklch(0_0_0/8%),inset_0_1px_0_oklch(1_0_0/55%)]",
    "hover:bg-muted hover:border-[color-mix(in_oklch,var(--kp-foreground)_20%,transparent)]",
  ),
  outline: cn(
    "border border-[color-mix(in_oklch,var(--kp-foreground)_20%,transparent)]",
    "bg-transparent text-foreground",
    "hover:bg-[color-mix(in_oklch,var(--kp-foreground)_6%,transparent)] hover:border-[color-mix(in_oklch,var(--kp-foreground)_30%,transparent)]",
  ),
  ghost: cn(
    "bg-transparent text-foreground",
    "hover:bg-[color-mix(in_oklch,var(--kp-muted)_80%,transparent)]",
    "hover:shadow-[inset_0_1px_0_oklch(1_0_0/35%)]",
  ),
  glass: cn(
    "border border-[color-mix(in_oklch,var(--kp-foreground)_16%,transparent)]",
    "bg-[color-mix(in_oklch,var(--kp-surface)_45%,transparent)] text-foreground",
    "backdrop-blur-md backdrop-saturate-150",
    "shadow-[inset_0_1px_0_oklch(1_0_0/30%),0_4px_16px_-4px_oklch(0_0_0/12%)]",
    "hover:bg-[color-mix(in_oklch,var(--kp-surface)_60%,transparent)] hover:border-[color-mix(in_oklch,var(--kp-foreground)_25%,transparent)]",
  ),
  soft: cn(
    "bg-[color-mix(in_oklch,var(--kp-accent)_14%,transparent)] text-accent font-semibold",
    "hover:bg-[color-mix(in_oklch,var(--kp-accent)_22%,transparent)]",
  ),
  glow: cn(
    "bg-accent text-accent-foreground font-semibold",
    "shadow-[0_0_20px_-3px_color-mix(in_oklch,var(--kp-accent)_65%,transparent),0_1px_2px_oklch(0_0_0/14%),inset_0_1px_0_oklch(1_0_0/28%)]",
    "hover:shadow-[0_0_28px_0px_color-mix(in_oklch,var(--kp-accent)_80%,transparent),0_1px_2px_oklch(0_0_0/16%),inset_0_1px_0_oklch(1_0_0/34%)] hover:brightness-[1.05]",
  ),
  danger: cn(
    "bg-danger text-accent-foreground",
    "shadow-[0_1px_2px_oklch(0_0_0/14%),0_8px_20px_-12px_color-mix(in_oklch,var(--kp-danger)_50%,transparent),inset_0_1px_0_oklch(1_0_0/24%)]",
    "hover:brightness-[1.05]",
  ),
  "danger-outline": cn(
    "border border-[color-mix(in_oklch,var(--kp-danger)_40%,transparent)]",
    "bg-transparent text-danger",
    "hover:bg-[color-mix(in_oklch,var(--kp-danger)_10%,transparent)] hover:border-danger",
  ),
  "danger-soft": cn(
    "bg-[color-mix(in_oklch,var(--kp-danger)_14%,transparent)] text-danger font-semibold",
    "hover:bg-[color-mix(in_oklch,var(--kp-danger)_22%,transparent)]",
  ),
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 gap-1.5 rounded-[var(--kp-radius-sm)] px-3 text-sm",
  md: "min-h-11 gap-2 rounded-[var(--kp-radius-md)] px-4 text-sm",
  lg: "min-h-12 gap-2.5 rounded-[var(--kp-radius-md)] px-5 text-base",
};

export function buttonClassName({
  className,
  isDisabled,
  isLoading,
  pressScale,
  size = "md",
  variant = "primary",
}: {
  className?: string | undefined;
  isDisabled?: boolean | undefined;
  isLoading?: boolean | undefined;
  pressScale: boolean;
  size?: ButtonSize | undefined;
  variant?: ButtonVariant | undefined;
}) {
  return cn(
    "relative inline-flex items-center justify-center font-medium outline-none",
    "transition-[transform,background-color,color,box-shadow,filter,opacity,border-color]",
    "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-45",
    pressScale && "active:scale-[0.96]",
    variants[variant],
    sizes[size],
    (isDisabled || isLoading) && "pointer-events-none",
    isLoading && "opacity-80",
    className,
  );
}

export function buttonControlAttr(variant: ButtonVariant = "primary") {
  return `button-${variant}` as const;
}
