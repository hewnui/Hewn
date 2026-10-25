"use client";

import type { ReactNode } from "react";
import {
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import {
  dialogActionsClass,
  dialogBodyClass,
  dialogModalClass,
  dialogOverlayClass,
  dialogPanelClass,
  dialogTitleClass,
} from "./dialog.styles";

export function DialogTrigger(props: {
  children: ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}) {
  return <AriaDialogTrigger {...props} />;
}

export function Dialog({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title: ReactNode;
}) {
  return (
    <ModalOverlay className={dialogOverlayClass} isDismissable>
      <Modal className={dialogModalClass}>
        <AriaDialog className={dialogPanelClass(className)} data-kp-surface>
          <Heading slot="title" className={dialogTitleClass}>
            {title}
          </Heading>
          {children}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}

export function DialogBody({ children }: { children: ReactNode }) {
  return <div className={dialogBodyClass}>{children}</div>;
}

export function DialogActions({ children }: { children: ReactNode }) {
  return <div className={dialogActionsClass}>{children}</div>;
}
