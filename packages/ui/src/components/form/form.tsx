"use client";

import { Form as AriaForm } from "react-aria-components";
import { formClassName } from "./form.styles";
import type { FormProps } from "./form.types";

export function Form({ children, className, ...props }: FormProps) {
  return (
    <AriaForm {...props} className={formClassName(className)}>
      {children}
    </AriaForm>
  );
}
