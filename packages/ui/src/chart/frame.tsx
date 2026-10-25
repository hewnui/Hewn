import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import { Skeleton } from "../components/skeleton";

export function ChartFrame({
  className,
  width,
  height,
  summary,
  children,
  status = "ready",
  errorMessage = "Could not render chart.",
  /** When true, SVG uses role=group so focusable point controls are not nested in role=img. */
  interactive = false,
}: {
  className?: string | undefined;
  width: number;
  height: number;
  summary: string;
  children?: ReactNode;
  status?: "ready" | "loading" | "empty" | "error";
  errorMessage?: string;
  interactive?: boolean;
}) {
  if (status === "loading") {
    return (
      <div
        className={cn("w-full", className)}
        style={{ width, height }}
        role="status"
        aria-label="Loading chart"
      >
        <Skeleton className="h-full w-full rounded-[var(--kp-radius-md)]" />
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-[var(--kp-radius-md)] border border-dashed border-border bg-muted/30 text-sm text-muted-foreground",
          className,
        )}
        style={{ width, height }}
        role="status"
      >
        No data to display
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-[var(--kp-radius-md)] border border-danger/40 bg-danger/5 text-sm text-danger",
          className,
        )}
        style={{ width, height }}
        role="alert"
      >
        {errorMessage}
      </div>
    );
  }

  return (
    <figure className={cn("m-0 w-full", className)} style={{ maxWidth: width }}>
      <svg
        role={interactive ? "group" : "img"}
        aria-label={summary}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {children}
      </svg>
      <figcaption className="sr-only">{summary}</figcaption>
    </figure>
  );
}
