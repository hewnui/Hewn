import type { ReactNode } from "react";

export type ColorPickerVariant = "popover" | "inline";

export type ColorPickerProps = {
  /** Accessible label for the picker. */
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  className?: string;
  /** Popover trigger or always-visible panel. Defaults to "popover". */
  variant?: ColorPickerVariant;
  /** Controlled hex value (e.g. "#1a6b4a"). */
  value?: string;
  /** Uncontrolled initial hex value. Defaults to "#1a6b4a". */
  defaultValue?: string;
  /** Called with a normalized hex string when the color changes. */
  onChange?: (hex: string) => void;
  /** Swatch preset hex colors. */
  presets?: string[];
  /** Show the alpha channel slider. Defaults to true. */
  showAlpha?: boolean;
  /**
   * Show a read-only OKLCH readout beside hex.
   * React Aria color spaces are rgb/hsl/hsb; OKLCH is display-only.
   */
  showOklch?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  /** Hidden input name for HTML form submission of the hex value. */
  name?: string;
};

export type ColorPickerPanelProps = {
  showAlpha: boolean;
  showOklch: boolean;
  presets: string[];
  isDisabled?: boolean | undefined;
};
