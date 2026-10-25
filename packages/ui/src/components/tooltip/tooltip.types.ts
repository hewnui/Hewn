import type { ReactNode } from "react";

export type OverlayPlacement =
  | "bottom"
  | "bottom left"
  | "bottom right"
  | "bottom start"
  | "bottom end"
  | "top"
  | "top left"
  | "top right"
  | "top start"
  | "top end"
  | "left"
  | "left top"
  | "left bottom"
  | "start"
  | "start top"
  | "start bottom"
  | "right"
  | "right top"
  | "right bottom"
  | "end"
  | "end top"
  | "end bottom";

export type TooltipProps = {
  children: ReactNode;
  className?: string;
  /** Distance from the trigger in pixels. */
  offset?: number;
  placement?: OverlayPlacement;
};

export type TooltipTriggerProps = {
  children: ReactNode;
  delay?: number;
  closeDelay?: number;
  isDisabled?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};
