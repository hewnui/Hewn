import { cn } from "../../utils/cn";

export function checkboxGroupClassName(className?: string | undefined) {
  return cn(
    "flex w-full max-w-sm flex-col gap-2 text-sm text-foreground",
    className,
  );
}

export const checkboxGroupItemsClass = "flex flex-col gap-1";
