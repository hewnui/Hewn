import { cn } from "../../utils/cn";

export function formClassName(className?: string | undefined) {
  return cn("flex w-full max-w-sm flex-col gap-4", className);
}
