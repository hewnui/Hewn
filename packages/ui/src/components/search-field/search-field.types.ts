import type { SearchFieldProps as AriaSearchFieldProps } from "react-aria-components";
import type { ReactNode } from "react";
import type { FieldSize, FieldVariant } from "../../styles/field";

export type SearchFieldVariant = FieldVariant;
export type SearchFieldSize = FieldSize;

export type SearchFieldProps = Omit<
  AriaSearchFieldProps,
  "className" | "children"
> & {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  variant?: SearchFieldVariant;
  size?: SearchFieldSize;
};
