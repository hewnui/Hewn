import { cn } from "../../utils/cn";
import { popoverSurfaceClass } from "../../styles/overlays";

export function popoverClassName(className?: string | undefined) {
  return cn(popoverSurfaceClass, "min-w-56 p-3", className);
}

export const popoverTitleClass = "text-sm font-medium text-foreground";

export const popoverBodyClass = "mt-1.5 text-sm text-muted-foreground";
