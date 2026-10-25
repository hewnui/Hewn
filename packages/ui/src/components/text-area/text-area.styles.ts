import { cn } from "../../utils/cn";
import {
  inputSurfaceClassName,
  type FieldSize,
  type FieldVariant,
} from "../../styles/field";

export function textAreaClassName({
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
    "min-h-[6.5rem] resize-y py-2.5 leading-relaxed",
    className,
  );
}
