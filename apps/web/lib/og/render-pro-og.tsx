import { ogFonts } from "@/lib/og/fonts";
import { ogPalette } from "@/lib/og/palette";
import { OgShell } from "@/lib/og/shell";
import { ogSize } from "@/lib/og/size";
import { siteName } from "@/lib/site";
import { ImageResponse } from "next/og";

export function renderProOgImage() {
  return new ImageResponse(
    (
      <OgShell
        headerMeta="Pro · Waitlist"
        footer={
          <div
            style={{
              display: "flex",
              gap: 14,
              fontFamily: "IBM Plex Mono",
              fontSize: 20,
              fontWeight: 500,
              color: ogPalette.muted,
              letterSpacing: 1.6,
              textTransform: "uppercase",
            }}
          >
            <span>Blocks + pages</span>
            <span>·</span>
            <span>Static previews</span>
            <span>·</span>
            <span>Join the waitlist</span>
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
          Hewn Pro
        </span>
        <span
          style={{
            fontFamily: "IBM Plex Sans",
            fontSize: 56,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -1.4,
            maxWidth: 920,
          }}
        >
          Assembled product UI, ready when you are.
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
          Static previews of Pro blocks. No prices on this card — join the
          waitlist for early access.
        </span>
      </OgShell>
    ),
    {
      ...ogSize,
      fonts: ogFonts,
    },
  );
}

export const proOgAlt = `${siteName} Pro — join the waitlist`;
