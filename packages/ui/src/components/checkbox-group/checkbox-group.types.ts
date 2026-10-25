import type { CheckboxGroupProps as AriaCheckboxGroupProps } from "react-aria-components";
import type { ReactNode } from "react";

export type CheckboxGroupProps = Omit<
  AriaCheckboxGroupProps,
  "className" | "children"
> & {
  children: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  className?: string;
};
