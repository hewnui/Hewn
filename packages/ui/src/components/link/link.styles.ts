import { cn } from "../../utils/cn";
import type { LinkVariant } from "./link.types";

const variants: Record<LinkVariant, string> = {
  accent: "text-accent hover:brightness-[1.08]",
  muted: "text-muted-foreground hover:text-foreground",
  underline:
    "text-foreground underline decoration-[color-mix(in_oklch,var(--kp-foreground)_28%,transparent)] underline-offset-4 hover:decoration-foreground",
};

export function linkClassName({
  className,
  variant = "accent",
}: {
  className?: string | undefined;
  variant?: LinkVariant | undefined;
} = {}) {
  return cn(
    "inline-flex min-h-10 items-center rounded-[calc(var(--kp-radius-sm)-0.05rem)]",
    "outline-none transition-[color,transform,text-decoration-color,filter]",
    "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
    "pressed:scale-[0.96] data-[pressed]:scale-[0.96]",
    "focus-visible:ring-2 focus-visible:ring-ring/40",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
    variants[variant],
    className,
  );
}
