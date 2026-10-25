import type { SliderProps as AriaSliderProps } from "react-aria-components";
import type { ReactNode } from "react";

export type SliderProps = Omit<AriaSliderProps, "className" | "children"> & {
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
  showOutput?: boolean;
};
