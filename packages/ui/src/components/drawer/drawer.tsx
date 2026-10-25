"use client";

import type { ReactNode } from "react";
import {
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import { Button } from "../button";
import { cn } from "../../utils/cn";

export function DrawerTrigger(props: {
  children: ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}) {
  return <AriaDialogTrigger {...props} />;
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
      <path
        d="M4 4l8 8M12 4l-8 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Drawer({
  children,
  className,
  side = "right",
  title,
}: {
  children: ReactNode;
  className?: string | undefined;
  side?: "left" | "right";
  title: ReactNode;
}) {
  return (
    <ModalOverlay
      isDismissable
      className="fixed inset-0 z-50 bg-[color-mix(in_oklch,var(--kp-foreground)_28%,transparent)]"
    >
      <Modal
        className={cn(
          "fixed inset-y-0 z-50 flex w-full max-w-md outline-none",
          side === "right" ? "right-0" : "left-0",
        )}
      >
        <AriaDialog
          data-kp-surface
          className={cn(
            "flex h-full w-full flex-col border p-5 shadow-[var(--kp-shadow-surface)] outline-none",
            side === "right" ? "border-l" : "border-r",
            className,
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <Heading
              slot="title"
              className="text-lg font-semibold tracking-tight text-balance"
            >
              {title}
            </Heading>
            <Button
              slot="close"
              variant="ghost"
              size="sm"
              aria-label="Close drawer"
              className="min-h-10 min-w-10 shrink-0 px-0"
            >
              <CloseGlyph />
            </Button>
          </div>
          <div className="mt-4 flex-1 overflow-auto text-sm text-muted-foreground text-pretty">
            {children}
          </div>
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}
