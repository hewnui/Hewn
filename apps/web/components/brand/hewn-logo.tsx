import { HewnMark } from "@/components/brand/hewn-mark";

type HewnLogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
};

export function HewnLogo({
  className,
  markClassName,
  showWordmark = true,
}: HewnLogoProps) {
  return (
    <span
      className={
        className
          ? `inline-flex items-center gap-2.5 ${className}`
          : "inline-flex items-center gap-2.5"
      }
    >
      <HewnMark className={markClassName ?? "size-7 shrink-0"} />
      {showWordmark ? (
        <span className="font-display text-lg font-medium tracking-tight text-foreground">
          Hewn
        </span>
      ) : null}
    </span>
  );
}
