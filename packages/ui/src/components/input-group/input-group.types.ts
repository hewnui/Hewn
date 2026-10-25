import type { TextFieldProps as AriaTextFieldProps } from "react-aria-components";
import type { ReactNode } from "react";
import type { FieldSize, FieldVariant } from "../../styles/field";

export type InputGroupVariant = FieldVariant;
export type InputGroupSize = FieldSize;

export type InputGroupProps = Omit<
  AriaTextFieldProps,
  "className" | "children"
> & {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  variant?: InputGroupVariant;
  size?: InputGroupSize;
  prefix?: ReactNode;
  suffix?: ReactNode;
  children?: ReactNode;
};

export type InputGroupAffixProps = {
  children: ReactNode;
  className?: string;
};
