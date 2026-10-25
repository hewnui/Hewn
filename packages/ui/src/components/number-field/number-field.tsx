"use client";

import {
  Button,
  FieldError,
  Group,
  Input,
  Label,
  NumberField as AriaNumberField,
  Text,
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
  numberGroupClassName,
  numberInputClass,
  numberStepperClass,
} from "./number-field.styles";
import type { NumberFieldProps } from "./number-field.types";

function StepIcon({ direction }: { direction: "up" | "down" }) {
  return (
    <svg viewBox="0 0 12 12" className="size-3.5" aria-hidden>
      <path
        d={
          direction === "up"
            ? "M2.5 7.5 6 4l3.5 3.5"
            : "M2.5 4.5 6 8l3.5-3.5"
        }
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NumberField({
  className,
  description,
  errorMessage,
  inputClassName: inputClass,
  label,
  size = "md",
  variant = "outline",
  ...props
}: NumberFieldProps) {
  return (
    <AriaNumberField {...props} className={cn(fieldRootClass, className)}>
      {label ? <Label className={fieldLabelClass}>{label}</Label> : null}
      <Group
        {...fieldSurfaceProps(variant)}
        className={numberGroupClassName({ size, variant })}
      >
        <Button slot="decrement" className={numberStepperClass}>
          <StepIcon direction="down" />
        </Button>
        <Input className={cn(numberInputClass, "text-center", inputClass)} />
        <Button slot="increment" className={numberStepperClass}>
          <StepIcon direction="up" />
        </Button>
      </Group>
      {description ? (
        <Text slot="description" className={fieldDescriptionClass}>
          {description}
        </Text>
      ) : null}
      <FieldError className={fieldErrorClass}>{errorMessage}</FieldError>
    </AriaNumberField>
  );
}
