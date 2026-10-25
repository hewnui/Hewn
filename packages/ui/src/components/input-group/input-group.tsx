"use client";

import {
  FieldError,
  Group,
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
} from "../../styles/field";
import {
  inputGroupAffixClass,
  inputGroupClassName,
  inputGroupInputClass,
} from "./input-group.styles";
import type {
  InputGroupAffixProps,
  InputGroupProps,
} from "./input-group.types";

function Prefix({ children, className }: InputGroupAffixProps) {
  return <span className={inputGroupAffixClass(className)}>{children}</span>;
}

function Suffix({ children, className }: InputGroupAffixProps) {
  return <span className={inputGroupAffixClass(className)}>{children}</span>;
}

function InputGroupInput({
  className,
  ...props
}: {
  className?: string;
  placeholder?: string;
}) {
  return <Input className={cn(inputGroupInputClass, className)} {...props} />;
}

function InputGroupRoot({
  children,
  className,
  description,
  errorMessage,
  inputClassName: inputClass,
  label,
  placeholder,
  prefix,
  size = "md",
  suffix,
  variant = "outline",
  ...props
}: InputGroupProps) {
  const composed = Boolean(children);

  return (
    <AriaTextField {...props} className={cn(fieldRootClass, className)}>
      {label ? <Label className={fieldLabelClass}>{label}</Label> : null}
      <Group
        {...fieldSurfaceProps(variant)}
        className={inputGroupClassName({ size, variant })}
      >
        {composed ? (
          children
        ) : (
          <>
            {prefix ? <Prefix>{prefix}</Prefix> : null}
            <Input
              className={cn(inputGroupInputClass, inputClass)}
              {...(placeholder !== undefined ? { placeholder } : {})}
            />
            {suffix ? <Suffix>{suffix}</Suffix> : null}
          </>
        )}
      </Group>
      {description ? (
        <Text slot="description" className={fieldDescriptionClass}>
          {description}
        </Text>
      ) : null}
      <FieldError className={fieldErrorClass}>{errorMessage}</FieldError>
    </AriaTextField>
  );
}

export const InputGroup = Object.assign(InputGroupRoot, {
  Prefix,
  Suffix,
  Input: InputGroupInput,
});
