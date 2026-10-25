"use client";

import { Button as AriaButton } from "react-aria-components";
import { useMotionMode } from "../../providers/motion-provider";
import { Spinner } from "../spinner";
import { buttonClassName, buttonControlAttr } from "./button.styles";
import type { ButtonProps } from "./button.types";

export function Button({
  children,
  className,
  isDisabled,
  isLoading = false,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  const { motionEnabled } = useMotionMode();
  const disabled = Boolean(isDisabled || isLoading);

  return (
    <AriaButton
      {...props}
      data-kp-control={buttonControlAttr(variant)}
      isDisabled={disabled}
      aria-busy={isLoading || undefined}
      className={buttonClassName({
        className,
        isDisabled: disabled,
        isLoading,
        pressScale: motionEnabled,
        size,
        variant,
      })}
    >
      {isLoading ? <Spinner /> : null}
      <span className={isLoading ? "opacity-90" : undefined}>{children}</span>
    </AriaButton>
  );
}
