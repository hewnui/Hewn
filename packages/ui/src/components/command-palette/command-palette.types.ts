import type { ReactNode } from "react";
import type { Key } from "react-aria-components";

export type CommandPaletteTriggerProps = {
  children: ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

export type CommandPaletteProps = {
  children: ReactNode;
  className?: string;
  /** Accessible name for the dialog. Defaults to "Command palette". */
  "aria-label"?: string;
};

export type CommandPaletteInputProps = {
  className?: string;
  placeholder?: string;
  "aria-label"?: string;
  autoFocus?: boolean;
};

export type CommandPaletteListProps = {
  children: ReactNode;
  className?: string;
  /** Shown while async results load. */
  isLoading?: boolean;
  /** Empty copy when the filter matches nothing. */
  emptyLabel?: ReactNode;
  /** Accessible name for the command list. */
  "aria-label"?: string;
};

export type CommandPaletteGroupProps = {
  children: ReactNode;
  heading: ReactNode;
  className?: string;
  id?: Key;
};

export type CommandPaletteItemProps = {
  children: ReactNode;
  id: string;
  textValue?: string;
  icon?: ReactNode;
  shortcut?: ReactNode;
  isDisabled?: boolean;
  onAction?: () => void;
  className?: string;
};

export type CommandPaletteRecentProps = {
  children: ReactNode;
  heading?: ReactNode;
  className?: string;
};

export type UseCommandPaletteHotkeyOptions = {
  /** Called with `true` when the hotkey fires. */
  onOpenChange: (isOpen: boolean) => void;
  /** Defaults to `true`. */
  isEnabled?: boolean;
  /** Letter key, defaults to `"k"`. */
  key?: string;
  /**
   * When `false`, the hotkey is ignored while focus is in an input,
   * textarea, select, or contenteditable. Defaults to `true` so ⌘/Ctrl+K
   * still opens from form fields (common command-palette UX).
   */
  enableOnFormTags?: boolean;
};
