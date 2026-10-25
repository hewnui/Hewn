import type { LinkProps as AriaLinkProps } from "react-aria-components";
import type { ReactNode } from "react";

export type LinkVariant = "accent" | "muted" | "underline";

export type LinkProps = Omit<AriaLinkProps, "className" | "children"> & {
  children?: ReactNode;
  className?: string;
  variant?: LinkVariant;
};
