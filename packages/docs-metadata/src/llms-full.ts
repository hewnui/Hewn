import { readdir, readFile, stat } from "fs/promises";
import { join, relative } from "path";
import type { LlmsTxtInput } from "./types";

export type LlmsFullPage = {
  path: string;
  title: string;
  description?: string;
  body: string;
  mtimeMs: number;
};

function abs(baseUrl: string, path: string): string {
  const root = baseUrl.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${root}${suffix}`;
}

function stripFrontmatter(source: string): {
  title?: string;
  description?: string;
  body: string;
} {
  if (!source.startsWith("---")) return { body: source.trim() };
  const end = source.indexOf("\n---", 3);
  if (end < 0) return { body: source.trim() };
  const fm = source.slice(3, end).trim();
  const body = source.slice(end + 4).trim();
  const title = fm.match(/^title:\s*(.+)$/m)?.[1]?.replace(/^["']|["']$/g, "");
  const description = fm
    .match(/^description:\s*(.+)$/m)?.[1]
    ?.replace(/^["']|["']$/g, "");
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    body,
  };
}

function docsUrlFromRelative(rel: string): string {
  const noExt = rel.replace(/\.mdx?$/, "");
  if (noExt === "index" || noExt.endsWith("/index")) {
    const dir = noExt.replace(/\/?index$/, "");
    return dir ? `/docs/${dir}` : "/docs";
  }
  return `/docs/${noExt}`;
}

async function walkMdx(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkMdx(full)));
      continue;
    }
    if (entry.isFile() && /\.mdx?$/.test(entry.name)) files.push(full);
  }
  return files;
}

/** Read every docs MDX page for the llms-full dump. */
export async function collectDocsPages(docsRoot: string): Promise<LlmsFullPage[]> {
  const files = await walkMdx(docsRoot);
  const pages: LlmsFullPage[] = [];

  for (const file of files) {
    const rel = relative(docsRoot, file).replaceAll("\\", "/");
    const raw = await readFile(file, "utf8");
    const meta = stripFrontmatter(raw);
    const info = await stat(file);
    const path = docsUrlFromRelative(rel);
    pages.push({
      path,
      title: meta.title ?? path,
      ...(meta.description ? { description: meta.description } : {}),
      body: meta.body,
      mtimeMs: info.mtimeMs,
    });
  }

  return pages.sort((a, b) => a.path.localeCompare(b.path));
}

/** Build an llmstxt.org–style full document from the curated index + MDX bodies. */
export function generateLlmsFullTxt(
  input: LlmsTxtInput,
  pages: LlmsFullPage[],
): string {
  const byPath = new Map(pages.map((page) => [page.path, page]));
  const lines: string[] = [
    `# ${input.siteName}`,
    "",
    `> ${input.summary}`,
    "",
  ];

  for (const paragraph of input.intro ?? []) {
    lines.push(paragraph, "");
  }

  lines.push(
    "This file is the full docs dump for agents. Prefer `/llms.txt` for the curated index.",
    "",
  );

  const seen = new Set<string>();
  for (const section of input.sections) {
    for (const link of section.links) {
      const page = byPath.get(link.path);
      if (!page || seen.has(page.path)) continue;
      seen.add(page.path);
      lines.push(`## ${page.title}`, "");
      lines.push(`Source: ${abs(input.baseUrl, page.path)}`, "");
      if (page.description) lines.push(`${page.description}`, "");
      lines.push(page.body, "", "---", "");
    }
  }

  for (const page of pages) {
    if (seen.has(page.path)) continue;
    lines.push(`## ${page.title}`, "");
    lines.push(`Source: ${abs(input.baseUrl, page.path)}`, "");
    if (page.description) lines.push(`${page.description}`, "");
    lines.push(page.body, "", "---", "");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}
