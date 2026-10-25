import { cn } from "../../utils/cn";
import {
  inputSurfaceClassName,
  type FieldSize,
  type FieldVariant,
} from "../../styles/field";

export function numberGroupClassName({
  className,
  size = "md",
  variant = "outline",
}: {
  className?: string | undefined;
  size?: FieldSize | undefined;
  variant?: FieldVariant | undefined;
} = {}) {
  return cn(
    inputSurfaceClassName({ size, variant }),
    "flex items-stretch gap-0 p-0 tabular-nums",
    variant !== "flushed" && "overflow-hidden",
    className,
  );
}

export const numberInputClass =
  "min-w-0 flex-1 bg-transparent px-3 py-0 text-foreground outline-none tabular-nums placeholder:text-muted-foreground";

export const numberStepperClass = cn(
  "inline-flex size-10 shrink-0 items-center justify-center self-center",
  "text-muted-foreground outline-none",
  "transition-[background-color,color,transform]",
  "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
  "hover:bg-muted/70 hover:text-foreground",
  "pressed:scale-[0.96] data-[pressed]:scale-[0.96]",
  "disabled:cursor-not-allowed disabled:opacity-45",
);
