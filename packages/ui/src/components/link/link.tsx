"use client";

import { Link as AriaLink } from "react-aria-components";
import { linkClassName } from "./link.styles";
import type { LinkProps } from "./link.types";

export function Link({
  children,
  className,
  variant = "accent",
  ...props
}: LinkProps) {
  return (
    <AriaLink
      {...props}
      className={linkClassName({ className, variant })}
    >
      {children}
    </AriaLink>
  );
}
