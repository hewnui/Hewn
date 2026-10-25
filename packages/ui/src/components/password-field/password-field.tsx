"use client";

import { useState } from "react";
import {
  Button,
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
  passwordGroupClassName,
  passwordInputClass,
  passwordToggleClass,
} from "./password-field.styles";
import type { PasswordFieldProps } from "./password-field.types";

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
        <path
          d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M2 2.5 14 13.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
      <path
        d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function PasswordField({
  className,
  defaultVisible = false,
  description,
  errorMessage,
  inputClassName: inputClass,
  label,
  placeholder,
  size = "md",
  variant = "outline",
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(defaultVisible);

  return (
    <AriaTextField {...props} className={cn(fieldRootClass, className)}>
      {label ? <Label className={fieldLabelClass}>{label}</Label> : null}
      <Group
        {...fieldSurfaceProps(variant)}
        className={passwordGroupClassName({ size, variant })}
      >
        <Input
          type={visible ? "text" : "password"}
          autoComplete="current-password"
          className={cn(passwordInputClass, inputClass)}
          {...(placeholder !== undefined ? { placeholder } : {})}
        />
        <Button
          type="button"
          className={passwordToggleClass}
          aria-label={visible ? "Hide password" : "Show password"}
          onPress={() => setVisible((value) => !value)}
        >
          <EyeIcon open={visible} />
        </Button>
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
