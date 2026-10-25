import { cn } from "../../utils/cn";
import type { PaginationSize } from "./pagination.types";

const sizes: Record<PaginationSize, string> = {
  sm: "min-h-10 min-w-10 px-2.5 text-xs rounded-[var(--kp-radius-sm)]",
  md: "min-h-11 min-w-11 px-3 text-sm rounded-[var(--kp-radius-md)]",
  lg: "min-h-12 min-w-12 px-3.5 text-base rounded-[var(--kp-radius-md)]",
};

export function paginationRootClass(className?: string) {
  return cn("inline-flex max-w-full flex-col gap-2", className);
}

export function paginationListClass() {
  return "flex flex-wrap items-center gap-1.5 m-0 list-none p-0";
}

export function paginationItemClass(
  size: PaginationSize = "md",
  {
    isCurrent = false,
    isNav = false,
  }: { isCurrent?: boolean; isNav?: boolean } = {},
) {
  return cn(
    "inline-flex items-center justify-center font-medium tabular-nums outline-none",
    "border border-[color-mix(in_oklch,var(--kp-foreground)_14%,transparent)]",
    "bg-[color-mix(in_oklch,var(--kp-surface)_90%,var(--kp-foreground)_3%)] text-foreground",
    "shadow-[var(--kp-shadow-surface),inset_0_1px_0_oklch(1_0_0/35%)]",
    "transition-[transform,background-color,border-color,color,box-shadow]",
    "duration-[var(--kp-motion-duration)] ease-[cubic-bezier(0.2,0,0,1)]",
    "hover:bg-muted data-[pressed]:scale-[0.96] pressed:scale-[0.96]",
    "focus-visible:ring-2 focus-visible:ring-ring/40",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
    "disabled:pointer-events-none disabled:opacity-45",
    sizes[size],
    isNav && "gap-1.5 px-3",
    isCurrent &&
      cn(
        "border-transparent bg-accent text-accent-foreground",
        "shadow-[0_1px_2px_oklch(0_0_0/14%),inset_0_1px_0_oklch(1_0_0/28%)]",
        "hover:brightness-[1.05]",
      ),
  );
}

export function paginationEllipsisClass(size: PaginationSize = "md") {
  return cn(
    "inline-flex items-center justify-center text-muted-foreground",
    "font-mono tabular-nums",
    sizes[size],
  );
}
