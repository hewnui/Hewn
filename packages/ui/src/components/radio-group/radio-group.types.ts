import type {
  RadioGroupProps as AriaRadioGroupProps,
  RadioProps as AriaRadioProps,
} from "react-aria-components";
import type { ReactNode } from "react";

export type RadioGroupProps = Omit<
  AriaRadioGroupProps,
  "className" | "children"
> & {
  children: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export type RadioProps = Omit<AriaRadioProps, "className" | "children"> & {
  children?: ReactNode;
  className?: string;
};
