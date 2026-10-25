"use client";

import {
  FieldError,
  Input,
  Label,
  Text,
  TextField as AriaTextField,
} from "react-aria-components";
import { cn } from "../../utils/cn";
import {
  fieldDescriptionClass,
  fieldErrorClass,
  fieldLabelClass,
  fieldRootClass,
  fieldSurfaceProps,
  inputClassName,
} from "../../styles/field";
import type { TextFieldProps } from "./text-field.types";

export function TextField({
  className,
  description,
  errorMessage,
  inputClassName: inputClass,
  label,
  placeholder,
  size = "md",
  variant = "outline",
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField {...props} className={cn(fieldRootClass, className)}>
      {label ? <Label className={fieldLabelClass}>{label}</Label> : null}
      <Input
        {...fieldSurfaceProps(variant)}
        className={inputClassName({ className: inputClass, size, variant })}
        {...(placeholder !== undefined ? { placeholder } : {})}
      />
      {description ? (
        <Text slot="description" className={fieldDescriptionClass}>
          {description}
        </Text>
      ) : null}
      <FieldError className={fieldErrorClass}>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
