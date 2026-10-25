import { cn } from "../../utils/cn";

/** CSS-driven spinner — animation lives in theme tokens, not Tailwind arbitrary values. */
export function Spinner({
  className,
}: {
  className?: string | undefined;
}) {
  return <span aria-hidden className={cn("kp-spinner", className)} />;
}
