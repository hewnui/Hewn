import { cn } from "../../utils/cn";

export function fileUploadRootClass(className?: string | undefined) {
  return cn(
    "flex w-full max-w-md flex-col gap-2.5 text-sm text-foreground",
    className,
  );
}

export function dropZoneClassName({
  className,
  isDropTarget,
  isInvalid,
}: {
  className?: string | undefined;
  isDropTarget?: boolean | undefined;
  isInvalid?: boolean | undefined;
} = {}) {
  return cn(
    "relative flex min-h-40 flex-col items-start justify-center gap-4 overflow-hidden",
    "rounded-[var(--kp-radius-lg)] border border-dashed p-5",
    "border-[color-mix(in_oklch,var(--kp-foreground)_20%,transparent)]",
    "bg-[color-mix(in_oklch,var(--kp-surface)_86%,var(--kp-foreground)_4%)]",
    "shadow-[var(--kp-shadow-surface),inset_0_1px_0_oklch(1_0_0/38%)]",
    "outline-none transition-[border-color,background-color,box-shadow,transform]",
    "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
    "data-[focused]:ring-2 data-[focused]:ring-ring/30",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
    isDropTarget &&
      cn(
        "scale-[0.985] border-solid border-accent",
        "bg-[color-mix(in_oklch,var(--kp-accent)_12%,var(--kp-surface))]",
        "shadow-[inset_0_1px_0_oklch(1_0_0/42%),0_0_0_3px_color-mix(in_oklch,var(--kp-accent)_18%,transparent)]",
      ),
    isInvalid && "border-danger",
    className,
  );
}

export const dropZoneHintClass =
  "max-w-[36ch] text-sm leading-relaxed text-pretty text-muted-foreground";

export const dropZoneIconClass = cn(
  "flex size-10 shrink-0 items-center justify-center rounded-[var(--kp-radius-md)]",
  "border border-[color-mix(in_oklch,var(--kp-foreground)_14%,transparent)]",
  "bg-[color-mix(in_oklch,var(--kp-muted)_45%,transparent)]",
  "text-muted-foreground shadow-[inset_0_1px_0_oklch(1_0_0/30%)]",
);

export const fileListClass = "flex w-full flex-col gap-1.5";

export const fileRowClass = cn(
  "flex min-h-11 items-center justify-between gap-3 rounded-[var(--kp-radius-md)] border px-3",
  "border-[color-mix(in_oklch,var(--kp-foreground)_14%,transparent)]",
  "bg-[color-mix(in_oklch,var(--kp-surface)_90%,var(--kp-foreground)_3%)]",
  "shadow-[var(--kp-shadow-surface),inset_0_1px_0_oklch(1_0_0/32%)]",
  "transition-[background-color,border-color,transform]",
  "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
);

export const fileNameClass =
  "truncate font-mono text-xs tracking-tight tabular-nums text-foreground";

export const removeFileClass = cn(
  "inline-flex size-10 shrink-0 items-center justify-center rounded-[calc(var(--kp-radius-sm)-0.05rem)]",
  "text-muted-foreground outline-none",
  "transition-[background-color,color,transform]",
  "duration-[var(--kp-motion-duration)] ease-[var(--kp-motion-ease-standard)]",
  "hover:bg-muted/70 hover:text-foreground",
  "pressed:scale-[0.96] data-[pressed]:scale-[0.96]",
  "focus-visible:ring-2 focus-visible:ring-ring/40",
);
