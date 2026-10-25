import type { TextFieldProps as AriaTextFieldProps } from "react-aria-components";
import type { ReactNode } from "react";
import type { FieldSize, FieldVariant } from "../../styles/field";

export type TextAreaVariant = FieldVariant;
export type TextAreaSize = FieldSize;

export type TextAreaProps = Omit<AriaTextFieldProps, "className" | "children"> & {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  placeholder?: string;
  className?: string;
  textAreaClassName?: string;
  variant?: TextAreaVariant;
  size?: TextAreaSize;
  rows?: number;
};
