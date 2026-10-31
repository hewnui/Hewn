import { ogFonts } from "@/lib/og/fonts";
import { ogPalette } from "@/lib/og/palette";
import { proOgCopy } from "@/lib/og/pro-og-copy";
import { OgShell } from "@/lib/og/shell";
import { ogSize } from "@/lib/og/size";
import { ImageResponse } from "next/og";

export function renderProOgImage() {
  const copy = proOgCopy();
  return new ImageResponse(
    (
      <OgShell
        headerMeta="Pro · Coming soon"
        footer={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              fontFamily: "IBM Plex Mono",
              fontSize: 20,
              fontWeight: 500,
              color: ogPalette.muted,
              letterSpacing: 1.6,
              textTransform: "uppercase",
            }}
          >
            <span>{copy.footerLeft}</span>
            <span>{copy.footerRight}</span>
          </div>
        }
      >
        <span
          style={{
            fontFamily: "Space Grotesk",
            fontSize: 40,
            fontWeight: 500,
            letterSpacing: -0.8,
            marginBottom: 12,
          }}
        >
          {copy.brand}
        </span>
        <span
          style={{
            fontFamily: "IBM Plex Sans",
            fontSize: 52,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -1.4,
            maxWidth: 920,
          }}
        >
          {copy.headline}
        </span>
        <span
          style={{
            fontFamily: "IBM Plex Sans",
            fontSize: 26,
            fontWeight: 500,
            lineHeight: 1.35,
            color: ogPalette.muted,
            maxWidth: 820,
            marginTop: 8,
          }}
        >
          {copy.support}
        </span>
      </OgShell>
    ),
    {
      ...ogSize,
      fonts: ogFonts,
    },
  );
}
