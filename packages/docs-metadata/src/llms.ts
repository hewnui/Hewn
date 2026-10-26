import type { DocsLink, LlmsTxtInput } from "./types";

function abs(baseUrl: string, path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const root = baseUrl.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${root}${suffix}`;
}

function linkLine(baseUrl: string, link: DocsLink): string {
  const href = abs(baseUrl, link.path);
  const note = link.description ? `: ${link.description}` : "";
  return `- [${link.title}](${href})${note}`;
}

/** Build an llmstxt.org–compatible markdown document. */
export function generateLlmsTxt(input: LlmsTxtInput): string {
  const lines: string[] = [
    `# ${input.siteName}`,
    "",
    `> ${input.summary}`,
    "",
  ];

  for (const paragraph of input.intro ?? []) {
    lines.push(paragraph, "");
  }

  for (const section of input.sections) {
    if (section.links.length === 0) continue;
    lines.push(`## ${section.heading}`, "");
    for (const link of section.links) {
      lines.push(linkLine(input.baseUrl, link));
    }
    lines.push("");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}
