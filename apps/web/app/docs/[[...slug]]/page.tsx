import { DocsApiReference } from "@/components/docs/docs-api-reference";
import { DocsInstallBlock } from "@/components/docs/docs-install-block";
import { DocsPageHeader } from "@/components/docs/docs-page-header";
import { getMDXComponents } from "@/components/mdx";
import { docsPageMetadata } from "@/lib/docs-page-metadata";
import { loadDocsApi } from "@/lib/docs-api";
import { source } from "@/lib/source";
import {
  DocsBody,
  DocsPage,
} from "fumadocs-ui/layouts/docs/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

type PageMeta = {
  title: string;
  description?: string;
  status?: string;
  tier?: string;
  full?: boolean;
  toc?: unknown;
  body: ComponentType<{ components?: Record<string, unknown> }>;
};

function componentNameFromSlug(slug?: string[]) {
  if (!slug || slug[0] !== "components" || slug.length < 2) return null;
  return slug[1] ?? null;
}

function getEyebrow(slug?: string[]) {
  if (!slug?.length) return undefined;
  if (slug[0] === "components") return "Components";
  if (slug[0] === "themes") return "Themes";
  if (slug[0] === "theme-lab") return "Theme Lab";
  if (slug[0] === "theme-studio") return "Theme Studio";
  if (slug[0] === "cli") return "CLI";
  if (slug[0] === "roadmap") return "Roadmap";
  return undefined;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const data = page.data as PageMeta;
  const MDX = data.body;
  const componentName = componentNameFromSlug(slug);
  const eyebrow = getEyebrow(slug);
  const api = componentName ? await loadDocsApi(componentName) : null;

  if (componentName && !api) {
    throw new Error(
      `Missing generated API reference for "${componentName}". Run pnpm generate.`,
    );
  }

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsPageHeader
        title={data.title}
        {...(data.description ? { description: data.description } : {})}
        {...(data.status ? { status: data.status } : {})}
        {...(data.tier ? { tier: data.tier } : {})}
        {...(eyebrow ? { eyebrow } : {})}
      />
      {componentName ? <DocsInstallBlock componentName={componentName} /> : null}
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
      {api ? <DocsApiReference api={api} /> : null}
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return docsPageMetadata({
    title: page.data.title,
    ...(page.data.description ? { description: page.data.description } : {}),
    url: page.url,
  });
}
