import type { BadgeProps } from "./badge.types";
import { badgeClassName, dotClassName } from "./badge.styles";

export function Badge({
  children,
  className,
  color = "accent",
  size = "md",
  variant = "soft",
  ...props
}: BadgeProps) {
  return (
    <span
      className={badgeClassName({ className, color, size, variant })}
      {...props}
    >
      {variant === "dot" ? (
        <span aria-hidden className={dotClassName(color)} />
      ) : null}
      {children}
    </span>
  );
}
