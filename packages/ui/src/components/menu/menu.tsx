"use client";

import type { ReactNode } from "react";
import {
  Button,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuTrigger as AriaMenuTrigger,
  Popover,
  Separator,
} from "react-aria-components";
import { menuItemClass, popoverSurfaceClass } from "../../styles/overlays";
import { buttonClassName } from "../button/button.styles";
import { useMotionMode } from "../../providers/motion-provider";

export function MenuTrigger({
  children,
  ...props
}: {
  children: ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}) {
  return <AriaMenuTrigger {...props}>{children}</AriaMenuTrigger>;
}

export function MenuButton({ children }: { children: ReactNode }) {
  const { motionEnabled } = useMotionMode();
  return (
    <Button
      className={buttonClassName({
        pressScale: motionEnabled,
        variant: "secondary",
        size: "md",
      })}
    >
      {children}
    </Button>
  );
}

export function Menu({ children }: { children: ReactNode }) {
  return (
    <Popover className={popoverSurfaceClass} data-kp-surface>
      <AriaMenu className="min-w-44 outline-none">{children}</AriaMenu>
    </Popover>
  );
}

export function MenuItem({
  children,
  id,
  isDisabled,
  onAction,
}: {
  children: ReactNode;
  id?: string;
  isDisabled?: boolean;
  onAction?: () => void;
}) {
  return (
    <AriaMenuItem
      className={menuItemClass}
      {...(id !== undefined ? { id } : {})}
      {...(isDisabled !== undefined ? { isDisabled } : {})}
      {...(onAction !== undefined ? { onAction } : {})}
    >
      {children}
    </AriaMenuItem>
  );
}

export function MenuSeparator() {
  return <Separator className="my-1 border-t" />;
}
