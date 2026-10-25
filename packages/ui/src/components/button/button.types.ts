import type { ButtonProps as AriaButtonProps } from "react-aria-components";
import type { ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "glass"
  | "soft"
  | "glow"
  | "danger"
  | "danger-outline"
  | "danger-soft";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = Omit<AriaButtonProps, "className" | "children"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
};
