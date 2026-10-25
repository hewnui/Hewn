import type { ReactNode } from "react";
import type { OverlayPlacement } from "../tooltip/tooltip.types";

export type PopoverProps = {
  children: ReactNode;
  className?: string;
  placement?: OverlayPlacement;
  offset?: number;
};

export type PopoverTriggerProps = {
  children: ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};
