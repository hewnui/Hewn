"use client";

import { useContext, useId } from "react";
import {
  ColorArea,
  ColorField,
  ColorPickerStateContext,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorThumb,
  Input,
  Label,
  SliderTrack,
} from "react-aria-components";
import { fieldLabelClass } from "../../styles/field";
import { hexToOklchDisplay } from "./color-picker.oklch";
import {
  colorAreaClass,
  colorFieldClass,
  colorFieldInputClass,
  colorOklchReadoutClass,
  colorPickerPanelClass,
  colorSliderClass,
  colorSliderTrackClass,
  colorSwatchClass,
  colorSwatchItemClass,
  colorSwatchPickerClass,
  colorThumbClass,
} from "./color-picker.styles";
import type { ColorPickerPanelProps } from "./color-picker.types";

export function ColorPickerPanel({
  showAlpha,
  showOklch,
  presets,
  isDisabled,
}: ColorPickerPanelProps) {
  const oklchId = useId();
  const colorState = useContext(ColorPickerStateContext);
  const hex = colorState?.color.toString("hex") ?? "#000000";
  const oklch = showOklch ? hexToOklchDisplay(hex) : null;
  const disabledProps = isDisabled ? { isDisabled: true as const } : {};

  return (
    <div className={colorPickerPanelClass}>
      <ColorArea
        aria-label="Saturation and brightness"
        colorSpace="hsb"
        xChannel="saturation"
        yChannel="brightness"
        className={colorAreaClass}
        {...disabledProps}
      >
        <ColorThumb className={colorThumbClass} />
      </ColorArea>

      <ColorSlider
        channel="hue"
        colorSpace="hsb"
        className={colorSliderClass}
        {...disabledProps}
      >
        <Label className={fieldLabelClass}>Hue</Label>
        <SliderTrack className={colorSliderTrackClass}>
          <ColorThumb className={colorThumbClass} />
        </SliderTrack>
      </ColorSlider>

      {showAlpha ? (
        <ColorSlider channel="alpha" className={colorSliderClass} {...disabledProps}>
          <Label className={fieldLabelClass}>Alpha</Label>
          <SliderTrack className={colorSliderTrackClass}>
            <ColorThumb className={colorThumbClass} />
          </SliderTrack>
        </ColorSlider>
      ) : null}

      <ColorField className={colorFieldClass} {...disabledProps}>
        <Label className={fieldLabelClass}>Hex</Label>
        <Input className={colorFieldInputClass} />
      </ColorField>

      {showOklch ? (
        <div className="flex flex-col gap-1">
          <span className={fieldLabelClass} id={oklchId}>
            OKLCH
          </span>
          <output
            className={colorOklchReadoutClass}
            aria-labelledby={oklchId}
            aria-live="polite"
          >
            {oklch ?? "—"}
          </output>
        </div>
      ) : null}

      {presets.length > 0 ? (
        <ColorSwatchPicker
          aria-label="Color presets"
          className={colorSwatchPickerClass}
        >
          {presets.map((color) => (
            <ColorSwatchPickerItem
              key={color}
              color={color}
              className={colorSwatchItemClass}
            >
              <ColorSwatch className={colorSwatchClass} />
            </ColorSwatchPickerItem>
          ))}
        </ColorSwatchPicker>
      ) : null}
    </div>
  );
}
