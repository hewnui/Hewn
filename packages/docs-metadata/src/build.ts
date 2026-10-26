import { DEFAULT_SITE_URL } from "../../site-url/src/index";
import { llmsIntro, llmsSummary } from "./distribution";
import { generateLlmsTxt } from "./llms";
import { GUIDE_LINKS, componentSections, type RegistryIndexItem } from "./sections";
import type { LlmsTxtInput } from "./types";

export { DEFAULT_SITE_URL };

/** Public GitHub repo — kept here so llms generation does not import apps/web. */
export const GITHUB_REPO_URL = "https://github.com/hewnui/Hewn";

export function buildLlmsInput(
  items: RegistryIndexItem[],
  baseUrl = DEFAULT_SITE_URL,
): LlmsTxtInput {
  return {
    siteName: "Hewn UI",
    summary: llmsSummary(),
    baseUrl,
    intro: [llmsIntro()],
    sections: [
      { heading: "Guides", links: GUIDE_LINKS },
      ...componentSections(items),
      {
        heading: "Optional",
        links: [
          {
            title: "GitHub repository",
            path: GITHUB_REPO_URL,
            description: "Source, issues, and MIT license",
          },
          {
            title: "Full docs dump",
            path: "/llms-full.txt",
            description: "Complete docs body text for agents",
          },
          {
            title: "AI component index",
            path: "/ai/index.json",
            description: "Machine-readable AI schema for every free component",
          },
          {
            title: "Registry free index",
            path: "/r/index.free.json",
            description: "Machine-readable free component registry",
          },
          {
            title: "Figma tokens",
            path: "/figma/hewn.tokens.json",
            description: "Tokens Studio document for curated packs",
          },
        ],
      },
    ],
  };
}

export function buildLlmsTxt(
  items: RegistryIndexItem[],
  baseUrl = DEFAULT_SITE_URL,
): string {
  return generateLlmsTxt(buildLlmsInput(items, baseUrl));
}
