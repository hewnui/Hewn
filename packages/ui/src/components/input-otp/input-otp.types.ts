import type { ReactNode } from "react";
import type { FieldSize, FieldVariant } from "../../styles/field";

export type InputOtpVariant = FieldVariant;
export type InputOtpSize = FieldSize;

export type InputOtpProps = {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  className?: string;
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  name?: string;
  autoFocus?: boolean;
  variant?: InputOtpVariant;
  size?: InputOtpSize;
  "aria-label"?: string;
};
