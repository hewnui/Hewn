import { cn } from "../../utils/cn";
import {
  inputSurfaceClassName,
  type FieldSize,
  type FieldVariant,
} from "../../styles/field";

export function searchGroupClassName({
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
    "flex items-center gap-1.5",
    className,
  );
}

export const searchInputClass =
  "min-w-0 flex-1 bg-transparent p-0 text-foreground outline-none placeholder:text-muted-foreground";

export const searchClearClass = cn(
  "inline-flex size-10 shrink-0 items-center justify-center rounded-[calc(var(--kp-radius-sm)-0.05rem)]",
  "text-muted-foreground outline-none",
  "transition-[background-color,color,transform,opacity]",
  "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
  "hover:bg-muted/70 hover:text-foreground",
  "pressed:scale-[0.96] data-[pressed]:scale-[0.96]",
);
