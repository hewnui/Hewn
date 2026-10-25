import { cn } from "../../utils/cn";

export function Skeleton({
  className,
}: {
  className?: string | undefined;
}) {
  return (
    <div
      aria-hidden
      data-kp-control="skeleton"
      className={cn(
        "animate-pulse rounded-[var(--kp-radius-md)]",
        "bg-[color-mix(in_oklch,var(--kp-muted)_88%,var(--kp-foreground)_6%)]",
        "shadow-[inset_0_1px_0_oklch(1_0_0/35%)]",
        className ?? "h-4 w-full",
      )}
    />
  );
}
