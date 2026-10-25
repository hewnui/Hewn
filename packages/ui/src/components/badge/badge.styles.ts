import { cn } from "../../utils/cn";
import type { BadgeColor, BadgeSize, BadgeVariant } from "./badge.types";

const colorStyles: Record<
  BadgeColor,
  { solid: string; soft: string; outline: string; dotBg: string }
> = {
  accent: {
    solid: "bg-accent text-accent-foreground",
    soft: "bg-[color-mix(in_oklch,var(--kp-accent)_16%,transparent)] text-accent font-semibold",
    outline: "border-[color-mix(in_oklch,var(--kp-accent)_40%,transparent)] text-accent",
    dotBg: "bg-accent",
  },
  muted: {
    solid: "bg-muted text-foreground",
    soft: "bg-[color-mix(in_oklch,var(--kp-foreground)_10%,transparent)] text-foreground",
    outline: "border-[color-mix(in_oklch,var(--kp-foreground)_20%,transparent)] text-foreground",
    dotBg: "bg-foreground",
  },
  danger: {
    solid: "bg-danger text-danger-foreground",
    // Soft fills are pale — mix toward black so label text clears WCAG AA.
    soft: "bg-danger-subtle text-[color-mix(in_oklch,var(--kp-danger)_58%,black)] font-semibold",
    outline: "border-danger-border text-[color-mix(in_oklch,var(--kp-danger)_58%,black)]",
    dotBg: "bg-danger",
  },
  success: {
    solid: "bg-success text-success-foreground",
    soft: "bg-success-subtle text-[color-mix(in_oklch,var(--kp-success)_58%,black)] font-semibold",
    outline: "border-success-border text-[color-mix(in_oklch,var(--kp-success)_58%,black)]",
    dotBg: "bg-success",
  },
  warning: {
    solid: "bg-warning text-warning-foreground",
    soft: "bg-warning-subtle text-warning-foreground font-semibold",
    outline: "border-warning-border text-warning-foreground",
    dotBg: "bg-warning",
  },
};

const sizes: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs rounded-full gap-1 min-h-5",
  md: "px-2.5 py-0.5 text-xs font-medium rounded-full gap-1.5 min-h-6",
  lg: "px-3 py-1 text-sm font-medium rounded-full gap-2 min-h-7",
};

export function badgeClassName({
  className,
  color = "accent",
  size = "md",
  variant = "soft",
}: {
  className?: string | undefined;
  color?: BadgeColor | undefined;
  size?: BadgeSize | undefined;
  variant?: BadgeVariant | undefined;
}) {
  const palette = colorStyles[color];

  let variantStyle = palette.soft;
  if (variant === "solid") variantStyle = palette.solid;
  if (variant === "outline") variantStyle = `border ${palette.outline} bg-transparent`;
  if (variant === "glass") {
    variantStyle = cn(
      "border border-[color-mix(in_oklch,var(--kp-foreground)_14%,transparent)]",
      "bg-[color-mix(in_oklch,var(--kp-surface)_50%,transparent)] text-foreground",
      "backdrop-blur-md backdrop-saturate-150",
      "shadow-[inset_0_1px_0_oklch(1_0_0/25%)]",
    );
  }
  if (variant === "dot") {
    variantStyle = `bg-[color-mix(in_oklch,var(--kp-foreground)_8%,transparent)] text-foreground`;
  }

  return cn(
    "inline-flex items-center justify-center font-medium tracking-tight",
    "transition-colors duration-[var(--kp-motion-duration)]",
    sizes[size],
    variantStyle,
    className,
  );
}

export function dotClassName(color: BadgeColor = "accent") {
  return cn("h-1.5 w-1.5 rounded-full", colorStyles[color].dotBg);
}
