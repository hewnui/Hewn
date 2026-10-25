import type { TextFieldProps as AriaTextFieldProps } from "react-aria-components";
import type { ReactNode } from "react";
import type { FieldSize, FieldVariant } from "../../styles/field";

export type TextFieldVariant = FieldVariant;
export type TextFieldSize = FieldSize;

export type TextFieldProps = Omit<AriaTextFieldProps, "className" | "children"> & {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  variant?: TextFieldVariant;
  size?: TextFieldSize;
};
