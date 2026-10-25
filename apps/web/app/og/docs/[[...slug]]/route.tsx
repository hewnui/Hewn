import { renderDocsOgImage } from "@/lib/og/render-docs-og";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";

type RouteProps = {
  params: Promise<{ slug?: string[] }>;
};

type PageMeta = {
  title: string;
  description?: string;
  tier?: string;
};

export const runtime = "nodejs";
export const dynamic = "force-static";

/**
 * Statically generated per-docs OG/Twitter image.
 * Lives outside `app/docs/[[...slug]]` because optional catch-alls must be
 * the final URL segment (so `opengraph-image` cannot be colocated there).
 */
export function generateStaticParams() {
  return source.generateParams();
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const data = page.data as PageMeta;

  return renderDocsOgImage({
    title: data.title,
    ...(data.description ? { description: data.description } : {}),
    ...(slug ? { slug } : {}),
    ...(data.tier ? { tier: data.tier } : {}),
  });
}
