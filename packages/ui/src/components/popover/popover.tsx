"use client";

import type { ReactNode } from "react";
import {
  Dialog,
  DialogTrigger,
  Heading,
  Popover as AriaPopover,
} from "react-aria-components";
import {
  popoverBodyClass,
  popoverClassName,
  popoverTitleClass,
} from "./popover.styles";
import type { PopoverProps, PopoverTriggerProps } from "./popover.types";

export function PopoverTrigger(props: PopoverTriggerProps) {
  return <DialogTrigger {...props} />;
}

export function Popover({
  children,
  className,
  offset = 8,
  placement = "bottom start",
}: PopoverProps) {
  return (
    <AriaPopover
      placement={placement}
      offset={offset}
      className={popoverClassName(className)}
      data-kp-surface
    >
      <Dialog className="outline-none">{children}</Dialog>
    </AriaPopover>
  );
}

export function PopoverTitle({ children }: { children: ReactNode }) {
  return (
    <Heading slot="title" className={popoverTitleClass}>
      {children}
    </Heading>
  );
}

export function PopoverBody({ children }: { children: ReactNode }) {
  return <div className={popoverBodyClass}>{children}</div>;
}
