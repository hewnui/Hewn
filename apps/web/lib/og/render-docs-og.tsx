import {
  docsOgSection,
  truncateOgText,
  type DocsOgSection,
} from "@/lib/og/docs-section";
import { ogFonts } from "@/lib/og/fonts";
import { ogPalette } from "@/lib/og/palette";
import { OgShell } from "@/lib/og/shell";
import { ogSize } from "@/lib/og/size";
import { siteHost } from "@/lib/site";
import { ImageResponse } from "next/og";

export type DocsOgInput = {
  title: string;
  description?: string;
  slug?: string[];
  tier?: string;
};

function eyebrowLabel(section: DocsOgSection): string {
  if (section.category) {
    return `${section.section} · ${section.category}`;
  }
  return section.section;
}

/**
 * Per-docs-page share card. Component pages surface gallery category.
 */
export function renderDocsOgImage({
  title,
  description,
  slug,
  tier,
}: DocsOgInput) {
  const section = docsOgSection(slug);
  const eyebrow = eyebrowLabel(section);
  const body = description ? truncateOgText(description, 148) : undefined;
  const titleSize = title.length > 28 ? 56 : title.length > 18 ? 64 : 72;

  return new ImageResponse(
    (
      <OgShell
        headerMeta="Docs"
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
              letterSpacing: 1.4,
              textTransform: "uppercase",
            }}
          >
            <span>{siteHost}</span>
            <span>{tier ? `${tier} · documentation` : "documentation"}</span>
          </div>
        }
      >
        <span
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 2.2,
            textTransform: "uppercase",
            color: ogPalette.accent,
          }}
        >
          {eyebrow}
        </span>
        <span
          style={{
            fontFamily: "IBM Plex Sans",
            fontSize: titleSize,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -1.8,
            maxWidth: 980,
          }}
        >
          {title}
        </span>
        {body ? (
          <span
            style={{
              fontFamily: "IBM Plex Sans",
              fontSize: 28,
              fontWeight: 500,
              lineHeight: 1.35,
              color: ogPalette.muted,
              maxWidth: 900,
            }}
          >
            {body}
          </span>
        ) : null}
      </OgShell>
    ),
    {
      ...ogSize,
      fonts: ogFonts,
    },
  );
}
