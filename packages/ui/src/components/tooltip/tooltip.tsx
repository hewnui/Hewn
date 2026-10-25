"use client";

import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
} from "react-aria-components";
import { tooltipClassName } from "./tooltip.styles";
import type { TooltipProps, TooltipTriggerProps } from "./tooltip.types";

export function TooltipTrigger({
  children,
  closeDelay = 0,
  delay = 400,
  ...props
}: TooltipTriggerProps) {
  return (
    <AriaTooltipTrigger
      delay={delay}
      closeDelay={closeDelay}
      {...props}
    >
      {children}
    </AriaTooltipTrigger>
  );
}

export function Tooltip({
  children,
  className,
  offset = 8,
  placement = "top",
}: TooltipProps) {
  return (
    <AriaTooltip
      offset={offset}
      placement={placement}
      className={tooltipClassName(className)}
      data-kp-control="tooltip"
    >
      {children}
    </AriaTooltip>
  );
}
