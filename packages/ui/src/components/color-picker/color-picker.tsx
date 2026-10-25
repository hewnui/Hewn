"use client";

import {
  Button,
  ColorPicker as AriaColorPicker,
  ColorSwatch,
  Dialog,
  DialogTrigger,
  Label,
  Popover,
  Text,
  parseColor,
} from "react-aria-components";
import {
  fieldDescriptionClass,
  fieldErrorClass,
  fieldLabelClass,
} from "../../styles/field";
import { ColorPickerPanel } from "./color-picker.panel";
import {
  colorPickerClassName,
  colorPickerPopoverClass,
  colorPickerSwatchPreviewClass,
  colorPickerTriggerClass,
  defaultColorPresets,
} from "./color-picker.styles";
import type { ColorPickerProps } from "./color-picker.types";

type ParsedColor = ReturnType<typeof parseColor>;

function toHex(color: ParsedColor | string): string {
  if (typeof color === "string") {
    try {
      return parseColor(color).toString("hex");
    } catch {
      return color;
    }
  }
  return color.toString("hex");
}

export function ColorPicker({
  className,
  defaultValue = "#1a6b4a",
  description,
  errorMessage,
  isDisabled,
  isRequired,
  label,
  name,
  onChange,
  presets = defaultColorPresets,
  showAlpha = true,
  showOklch = true,
  value,
  variant = "popover",
}: ColorPickerProps) {
  const handleChange = (color: ParsedColor) => {
    onChange?.(toHex(color));
  };

  const panel = (
    <ColorPickerPanel
      showAlpha={showAlpha}
      showOklch={showOklch}
      presets={presets}
      isDisabled={isDisabled}
    />
  );

  return (
    <AriaColorPicker
      {...(value !== undefined ? { value } : {})}
      {...(value === undefined ? { defaultValue } : {})}
      onChange={handleChange}
    >
      {({ color }) => {
        const hex = toHex(color);
        return (
          <div className={colorPickerClassName(className)}>
            {label ? <Label className={fieldLabelClass}>{label}</Label> : null}

            {variant === "inline" ? (
              panel
            ) : (
              <DialogTrigger>
                <Button
                  className={colorPickerTriggerClass}
                  data-kp-surface
                  {...(isDisabled ? { isDisabled: true } : {})}
                  {...(isRequired ? { "aria-required": true } : {})}
                >
                  <ColorSwatch
                    className={colorPickerSwatchPreviewClass}
                    color={color}
                  />
                  <span className="font-mono text-sm tabular-nums">{hex}</span>
                </Button>
                <Popover className={colorPickerPopoverClass} data-kp-surface>
                  <Dialog className="outline-none">{panel}</Dialog>
                </Popover>
              </DialogTrigger>
            )}

            {description ? (
              <Text slot="description" className={fieldDescriptionClass}>
                {description}
              </Text>
            ) : null}
            {errorMessage ? (
              <p className={fieldErrorClass} role="alert">
                {errorMessage}
              </p>
            ) : null}
            {name ? (
              <input
                type="hidden"
                name={name}
                value={hex}
                readOnly
                required={isRequired}
              />
            ) : null}
          </div>
        );
      }}
    </AriaColorPicker>
  );
}
