import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant = "solid" | "soft" | "outline" | "glass" | "dot";
export type BadgeColor = "accent" | "muted" | "danger" | "success" | "warning";
export type BadgeSize = "sm" | "md" | "lg";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  className?: string;
};
