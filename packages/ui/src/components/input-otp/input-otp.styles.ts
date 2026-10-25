import { cn } from "../../utils/cn";
import {
  inputSurfaceClassName,
  type FieldSize,
  type FieldVariant,
} from "../../styles/field";

export function inputOtpRootClass(className?: string | undefined) {
  return cn(
    "flex w-full max-w-sm flex-col gap-1.5 text-sm text-foreground",
    className,
  );
}

export const inputOtpSlotsClass =
  "flex flex-row flex-nowrap items-center gap-2";

export function inputOtpSlotClassName({
  className,
  size = "md",
  variant = "outline",
}: {
  className?: string | undefined;
  size?: FieldSize | undefined;
  variant?: FieldVariant | undefined;
} = {}) {
  // inputSurfaceClassName includes w-full; cn does not conflict-merge, so pin
  // slot size with max/basis so digits stay in a horizontal OTP row.
  return cn(
    inputSurfaceClassName({ size, variant }),
    "max-w-11 w-11 min-w-11 shrink-0 grow-0 basis-11 px-0 text-center font-mono text-base tabular-nums",
    size === "sm" && "max-w-9 w-9 min-w-9 basis-9",
    size === "lg" && "max-w-12 w-12 min-w-12 basis-12",
    className,
  );
}
