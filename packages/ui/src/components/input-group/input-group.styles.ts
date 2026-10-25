import { cn } from "../../utils/cn";
import {
  inputSurfaceClassName,
  type FieldSize,
  type FieldVariant,
} from "../../styles/field";

export function inputGroupClassName({
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
    "flex items-center gap-2",
    className,
  );
}

export const inputGroupInputClass =
  "min-w-0 flex-1 bg-transparent p-0 text-foreground outline-none placeholder:text-muted-foreground";

export function inputGroupAffixClass(className?: string | undefined) {
  return cn("shrink-0 text-xs font-medium text-muted-foreground", className);
}
