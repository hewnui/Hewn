import { cn } from "../../utils/cn";

export function breadcrumbsClassName(className?: string | undefined) {
  return cn(
    "flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground",
    className,
  );
}

export function breadcrumbItemClassName(className?: string | undefined) {
  return cn("inline-flex min-h-10 items-center gap-1.5", className);
}

export const breadcrumbSeparatorClass =
  "text-muted-foreground/70 select-none";

export const breadcrumbLinkClass = cn(
  "inline-flex min-h-10 items-center rounded-[calc(var(--kp-radius-sm)-0.05rem)] px-1.5",
  "text-muted-foreground outline-none transition-[color,transform,background-color]",
  "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
  "hover:bg-muted/60 hover:text-foreground",
  "pressed:scale-[0.96] data-[pressed]:scale-[0.96]",
  "focus-visible:ring-2 focus-visible:ring-ring/40",
  "data-[current]:pointer-events-none data-[current]:font-medium data-[current]:text-foreground",
  "data-[disabled]:opacity-45",
);

export const breadcrumbCurrentClass =
  "px-1.5 font-medium text-foreground";
