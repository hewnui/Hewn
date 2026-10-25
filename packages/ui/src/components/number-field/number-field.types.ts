import type { NumberFieldProps as AriaNumberFieldProps } from "react-aria-components";
import type { ReactNode } from "react";
import type { FieldSize, FieldVariant } from "../../styles/field";

export type NumberFieldVariant = FieldVariant;
export type NumberFieldSize = FieldSize;

export type NumberFieldProps = Omit<
  AriaNumberFieldProps,
  "className" | "children"
> & {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  className?: string;
  inputClassName?: string;
  variant?: NumberFieldVariant;
  size?: NumberFieldSize;
};
