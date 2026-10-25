"use client";

import {
  CheckboxGroup as AriaCheckboxGroup,
  FieldError,
  Label,
  Text,
} from "react-aria-components";
import {
  fieldDescriptionClass,
  fieldErrorClass,
  fieldLabelClass,
} from "../../styles/field";
import {
  checkboxGroupClassName,
  checkboxGroupItemsClass,
} from "./checkbox-group.styles";
import type { CheckboxGroupProps } from "./checkbox-group.types";

export function CheckboxGroup({
  children,
  className,
  description,
  errorMessage,
  label,
  ...props
}: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup {...props} className={checkboxGroupClassName(className)}>
      {label ? <Label className={fieldLabelClass}>{label}</Label> : null}
      <div className={checkboxGroupItemsClass}>{children}</div>
      {description ? (
        <Text slot="description" className={fieldDescriptionClass}>
          {description}
        </Text>
      ) : null}
      <FieldError className={fieldErrorClass}>{errorMessage}</FieldError>
    </AriaCheckboxGroup>
  );
}
