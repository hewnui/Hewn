"use client";

import type { ReactNode } from "react";
import {
  Autocomplete,
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Input,
  Menu,
  Modal,
  ModalOverlay,
  SearchField,
  useFilter,
} from "react-aria-components";
import { Spinner } from "../spinner";
import {
  CommandPaletteGroup,
  CommandPaletteItem,
  CommandPaletteRecent,
} from "./command-palette-items";
import {
  commandEmptyClass,
  commandInputClass,
  commandInputWrapClass,
  commandListClass,
  commandLoadingClass,
  commandOverlayClass,
  commandPanelClass,
} from "./command-palette.styles";
import type {
  CommandPaletteInputProps,
  CommandPaletteListProps,
  CommandPaletteProps,
  CommandPaletteTriggerProps,
} from "./command-palette.types";

export {
  CommandPaletteGroup,
  CommandPaletteItem,
  CommandPaletteRecent,
};

export function CommandPaletteTrigger(props: CommandPaletteTriggerProps) {
  return <AriaDialogTrigger {...props} />;
}

function SearchGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-muted-foreground" aria-hidden>
      <circle cx="7" cy="7" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10.2 10.2 13.5 13.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CommandPalette({
  children,
  className,
  "aria-label": ariaLabel = "Command palette",
}: CommandPaletteProps) {
  const { contains } = useFilter({ sensitivity: "base" });

  return (
    <ModalOverlay className={commandOverlayClass} isDismissable>
      <Modal className="outline-none" aria-label={ariaLabel}>
        <AriaDialog
          aria-label={ariaLabel}
          className={commandPanelClass(className)}
          data-kp-surface
          data-kp-control="command-palette"
        >
          <Autocomplete filter={contains}>{children}</Autocomplete>
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}

export function CommandPaletteInput({
  "aria-label": ariaLabel = "Search commands",
  autoFocus = true,
  className,
  placeholder = "Type a command…",
}: CommandPaletteInputProps) {
  return (
    <SearchField
      aria-label={ariaLabel}
      autoFocus={autoFocus}
      className={commandInputWrapClass(className)}
    >
      <SearchGlyph />
      <Input placeholder={placeholder} className={commandInputClass} />
    </SearchField>
  );
}

export function CommandPaletteList({
  "aria-label": ariaLabel = "Commands",
  children,
  className,
  emptyLabel = "No commands found.",
  isLoading = false,
}: CommandPaletteListProps) {
  if (isLoading) {
    return (
      <div className={commandLoadingClass} role="status" aria-live="polite">
        <Spinner />
        <span>Loading commands…</span>
      </div>
    );
  }

  return (
    <Menu
      aria-label={ariaLabel}
      className={commandListClass(className)}
      renderEmptyState={() => (
        <div className={commandEmptyClass} role="status">
          {emptyLabel}
        </div>
      )}
    >
      {children}
    </Menu>
  );
}

/** Presentational empty slot for custom empty UI outside Menu filtering. */
export function CommandPaletteEmpty({ children }: { children: ReactNode }) {
  return <div className={commandEmptyClass}>{children}</div>;
}

export function CommandPaletteLoading({ children }: { children?: ReactNode }) {
  return (
    <div className={commandLoadingClass} role="status" aria-live="polite">
      <Spinner />
      <span>{children ?? "Loading commands…"}</span>
    </div>
  );
}
