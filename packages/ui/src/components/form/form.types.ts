import type { FormProps as AriaFormProps } from "react-aria-components";
import type { ReactNode } from "react";

export type FormProps = Omit<AriaFormProps, "className" | "children"> & {
  children: ReactNode;
  className?: string;
};
