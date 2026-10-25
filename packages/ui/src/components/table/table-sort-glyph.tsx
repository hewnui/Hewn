import { cn } from "../../utils/cn";

export function SortGlyph({
  direction,
}: {
  direction?: "ascending" | "descending" | undefined;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      fill="none"
      className={cn(
        "size-3 shrink-0 transition-[opacity,transform] duration-[var(--kp-motion-duration)]",
        direction ? "opacity-90" : "opacity-35",
        direction === "descending" && "rotate-180",
      )}
    >
      <path
        d="M6 2.5v7M6 2.5 3.25 5.25M6 2.5l2.75 2.75"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
