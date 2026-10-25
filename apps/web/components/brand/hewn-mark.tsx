/** Shared geometry for the Hewn monogram (assembled H). */
export const MARK_VIEWBOX = "0 0 32 32";

/** Outer plate path (squircle). */
export const MARK_PLATE_D =
  "M7 0h18a7 7 0 0 1 7 7v18a7 7 0 0 1-7 7H7a7 7 0 0 1-7-7V7a7 7 0 0 1 7-7Z";

/**
 * Three-module H: left stem + right stem + chiselled crossbar with gaps.
 * Reads as compound assembly at favicon size; crossbar ends are cut short
 * so the modules stay distinct when scaled to 16px.
 */
export const MARK_GLYPH_D = [
  "M8 6.8h3.6v18.4H8V6.8Z",
  "M20.4 6.8h3.6v18.4h-3.6V6.8Z",
  "M13.1 13.9h5.8v4.2h-5.8V13.9Z",
].join("");

type HewnMarkProps = {
  className?: string;
  title?: string;
};

export function HewnMark({ className, title }: HewnMarkProps) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path d={MARK_PLATE_D} className="fill-accent" />
      <path d={MARK_GLYPH_D} className="fill-accent-foreground" />
    </svg>
  );
}
