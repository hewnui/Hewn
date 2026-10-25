import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export function Empty({
  title,
  children,
  action,
  className,
}: {
  title: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-start gap-2 rounded-[var(--kp-radius-lg)] border border-dashed border-border px-4 py-6",
        "bg-[color-mix(in_oklch,var(--kp-muted)_35%,transparent)]",
        className,
      )}
    >
      <p className="text-sm font-medium text-balance text-foreground">{title}</p>
      {children ? (
        <div className="max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
          {children}
        </div>
      ) : null}
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  );
}
