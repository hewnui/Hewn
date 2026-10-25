"use client";

import {
  Label,
  Slider as AriaSlider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
  Text,
} from "react-aria-components";
import {
  fieldDescriptionClass,
  fieldLabelClass,
} from "../../styles/field";
import {
  sliderClassName,
  sliderFillClass,
  sliderHeaderClass,
  sliderOutputClass,
  sliderThumbClass,
  sliderTrackClass,
} from "./slider.styles";
import type { SliderProps } from "./slider.types";

export function Slider({
  className,
  description,
  label,
  showOutput = true,
  ...props
}: SliderProps) {
  return (
    <AriaSlider {...props} className={sliderClassName(className)}>
      <div className={sliderHeaderClass}>
        {label ? <Label className={fieldLabelClass}>{label}</Label> : null}
        {showOutput ? (
          <SliderOutput className={sliderOutputClass} />
        ) : null}
      </div>
      <SliderTrack className={sliderTrackClass}>
        {({ state }) => (
          <>
            <div
              className={sliderFillClass}
              style={{ width: `${state.getThumbPercent(0) * 100}%` }}
            />
            <SliderThumb className={sliderThumbClass} index={0} />
          </>
        )}
      </SliderTrack>
      {description ? (
        <Text slot="description" className={fieldDescriptionClass}>
          {description}
        </Text>
      ) : null}
    </AriaSlider>
  );
}
