import type { TextFieldProps as AriaTextFieldProps } from "react-aria-components";
import type { ReactNode } from "react";
import type { FieldSize, FieldVariant } from "../../styles/field";

export type PasswordFieldVariant = FieldVariant;
export type PasswordFieldSize = FieldSize;

export type PasswordFieldProps = Omit<
  AriaTextFieldProps,
  "className" | "children" | "type"
> & {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  variant?: PasswordFieldVariant;
  size?: PasswordFieldSize;
  defaultVisible?: boolean;
};
