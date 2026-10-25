import { galleryTotals } from "@/components/docs/docs-gallery-data";
import { ogFonts } from "@/lib/og/fonts";
import { ogPalette } from "@/lib/og/palette";
import { OgShell } from "@/lib/og/shell";
import { ogSize } from "@/lib/og/size";
import { siteDescription, siteName } from "@/lib/site";
import { ImageResponse } from "next/og";

/**
 * Homepage / default share card — brand-first, left-aligned, Graphite dark.
 * Component count comes from the free registry index (galleryTotals).
 */
export function renderHomeOgImage() {
  const componentCount = galleryTotals.components;
  return new ImageResponse(
    (
      <OgShell
        headerMeta="React · Themes · Motion"
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
            <span>{componentCount} components</span>
            <span>·</span>
            <span>6 themes</span>
            <span>·</span>
            <span>docs + registry</span>
          </div>
        }
      >
        <span
          style={{
            fontFamily: "IBM Plex Sans",
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -1.6,
            maxWidth: 920,
          }}
        >
          Product UI with a point of view.
        </span>
        <span
          style={{
            fontFamily: "IBM Plex Sans",
            fontSize: 28,
            fontWeight: 500,
            lineHeight: 1.35,
            color: ogPalette.muted,
            maxWidth: 860,
          }}
        >
          {siteDescription}
        </span>
      </OgShell>
    ),
    {
      ...ogSize,
      fonts: ogFonts,
    },
  );
}

export const homeOgAlt = `${siteName} — ${siteDescription}`;
