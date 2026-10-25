"use client";

import {
  type ClipboardEvent,
  type KeyboardEvent,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "../../utils/cn";
import {
  fieldDescriptionClass,
  fieldErrorClass,
  fieldLabelClass,
  fieldSurfaceProps,
} from "../../styles/field";
import {
  inputOtpRootClass,
  inputOtpSlotClassName,
  inputOtpSlotsClass,
} from "./input-otp.styles";
import type { InputOtpProps } from "./input-otp.types";

function normalize(value: string, length: number) {
  return value.replace(/\D/g, "").slice(0, length);
}

function toDigits(value: string, length: number) {
  const chars = normalize(value, length).split("");
  return Array.from({ length }, (_, index) => chars[index] ?? "");
}

export function InputOtp({
  "aria-label": ariaLabel,
  autoFocus,
  className,
  defaultValue = "",
  description,
  errorMessage,
  isDisabled,
  isInvalid,
  isRequired,
  label,
  length = 6,
  name,
  onChange,
  onComplete,
  size = "md",
  value,
  variant = "outline",
}: InputOtpProps) {
  const reactId = useId();
  const labelId = `${reactId}-label`;
  const descriptionId = `${reactId}-description`;
  const errorId = `${reactId}-error`;
  const controlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(() =>
    normalize(defaultValue, length),
  );
  const current = controlled ? normalize(value, length) : uncontrolled;
  const digits = toDigits(current, length);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  function commit(next: string) {
    const normalized = normalize(next, length);
    if (!controlled) setUncontrolled(normalized);
    onChange?.(normalized);
    if (normalized.length === length) onComplete?.(normalized);
  }

  function focusIndex(index: number) {
    refs.current[Math.max(0, Math.min(length - 1, index))]?.focus();
  }

  function handleChange(index: number, raw: string) {
    const digit = normalize(raw, 1);
    const next = digits.map((item, i) => (i === index ? digit : item)).join("");
    commit(next);
    if (digit) focusIndex(index + 1);
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace") {
      event.preventDefault();
      if (digits[index]) {
        commit(digits.map((item, i) => (i === index ? "" : item)).join(""));
      } else {
        focusIndex(index - 1);
        commit(digits.map((item, i) => (i === index - 1 ? "" : item)).join(""));
      }
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusIndex(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusIndex(index + 1);
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    commit(event.clipboardData.getData("text"));
  }

  const describedBy = [
    description ? descriptionId : null,
    isInvalid && errorMessage ? errorId : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      role="group"
      aria-labelledby={label ? labelId : undefined}
      aria-label={label ? undefined : ariaLabel ?? "One-time code"}
      aria-describedby={describedBy || undefined}
      aria-disabled={isDisabled || undefined}
      aria-invalid={isInvalid || undefined}
      aria-required={isRequired || undefined}
      className={inputOtpRootClass(className)}
    >
      {label ? (
        <span id={labelId} className={fieldLabelClass}>
          {label}
        </span>
      ) : null}
      <div className={inputOtpSlotsClass}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(node) => {
              refs.current[index] = node;
            }}
            {...fieldSurfaceProps(variant)}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            autoFocus={autoFocus && index === 0}
            disabled={isDisabled}
            aria-label={`Digit ${index + 1} of ${length}`}
            maxLength={1}
            value={digit}
            className={cn(
              inputOtpSlotClassName({ size, variant }),
              isInvalid && "border-danger",
            )}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            onFocus={(event) => event.target.select()}
          />
        ))}
      </div>
      {name ? <input type="hidden" name={name} value={current} /> : null}
      {description ? (
        <p id={descriptionId} className={fieldDescriptionClass}>
          {description}
        </p>
      ) : null}
      {isInvalid && errorMessage ? (
        <p id={errorId} className={fieldErrorClass} role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
