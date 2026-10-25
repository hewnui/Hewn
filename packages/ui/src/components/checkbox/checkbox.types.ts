import type { CheckboxProps as AriaCheckboxProps } from "react-aria-components";
import type { ReactNode } from "react";

export type CheckboxProps = Omit<AriaCheckboxProps, "className" | "children"> & {
  children?: ReactNode;
  className?: string;
};
