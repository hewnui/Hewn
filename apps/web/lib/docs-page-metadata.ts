import { docsOgImagePath } from "@/lib/og/docs-image-path";
import { ogSize } from "@/lib/og/size";
import { siteName } from "@/lib/site";
import type { Metadata } from "next";

type DocsPageMetaInput = {
  title: string;
  description?: string;
  /** Pathname from Fumadocs, e.g. `/docs/components/button`. */
  url: string;
};

/**
 * Per-docs-page metadata. Must set canonical + openGraph.url so routes do not
 * inherit the homepage values from the root layout. Also points og/twitter
 * images at the per-page `/og/docs/...` ImageResponse route.
 */
export function docsPageMetadata({
  title,
  description,
  url,
}: DocsPageMetaInput): Metadata {
  const image = {
    url: docsOgImagePath(url),
    width: ogSize.width,
    height: ogSize.height,
    alt: `${title} · Hewn docs`,
  };

  const openGraph: NonNullable<Metadata["openGraph"]> = {
    type: "website",
    siteName,
    title,
    url,
    images: [image],
  };
  const twitter: NonNullable<Metadata["twitter"]> = {
    card: "summary_large_image",
    title,
    images: [image.url],
  };

  if (description) {
    openGraph.description = description;
    twitter.description = description;
  }

  return {
    title,
    ...(description ? { description } : {}),
    alternates: { canonical: url },
    openGraph,
    twitter,
  };
}
