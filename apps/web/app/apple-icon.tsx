import { MARK_GLYPH_D, MARK_VIEWBOX } from "@/components/brand/hewn-mark";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — Graphite assembled H, matches app/icon.svg. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B212A",
        }}
      >
        <svg width="118" height="118" viewBox={MARK_VIEWBOX}>
          <path d={MARK_GLYPH_D} fill="#9BB4D4" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
