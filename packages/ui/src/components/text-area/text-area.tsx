"use client";

import {
  FieldError,
  Label,
  Text,
  TextArea as AriaTextArea,
  TextField as AriaTextField,
} from "react-aria-components";
import { cn } from "../../utils/cn";
import {
  fieldDescriptionClass,
  fieldErrorClass,
  fieldLabelClass,
  fieldRootClass,
  fieldSurfaceProps,
} from "../../styles/field";
import { textAreaClassName } from "./text-area.styles";
import type { TextAreaProps } from "./text-area.types";

export function TextArea({
  className,
  description,
  errorMessage,
  label,
  placeholder,
  rows = 4,
  size = "md",
  textAreaClassName: areaClass,
  variant = "outline",
  ...props
}: TextAreaProps) {
  return (
    <AriaTextField {...props} className={cn(fieldRootClass, className)}>
      {label ? <Label className={fieldLabelClass}>{label}</Label> : null}
      <AriaTextArea
        {...fieldSurfaceProps(variant)}
        rows={rows}
        className={textAreaClassName({ className: areaClass, size, variant })}
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
