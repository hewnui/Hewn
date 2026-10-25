import { MARK_GLYPH_D, MARK_VIEWBOX } from "@/components/brand/hewn-mark";
import { ogPalette } from "@/lib/og/palette";

type OgMarkProps = {
  size?: number;
};

/** Brand monogram for Satori OG cards. */
export function OgMark({ size = 52 }: OgMarkProps) {
  return (
    <svg width={size} height={size} viewBox={MARK_VIEWBOX}>
      <path d={MARK_GLYPH_D} fill={ogPalette.accent} />
    </svg>
  );
}
