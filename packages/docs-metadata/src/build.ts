import { DEFAULT_SITE_URL } from "../../site-url/src/index";
import { llmsIntro, llmsSummary } from "./distribution";
import { generateLlmsTxt } from "./llms";
import { GUIDE_LINKS, componentSections, type RegistryIndexItem } from "./sections";
import type { LlmsTxtInput } from "./types";

export { DEFAULT_SITE_URL };

export function buildLlmsInput(
  items: RegistryIndexItem[],
  baseUrl = DEFAULT_SITE_URL,
): LlmsTxtInput {
  return {
    siteName: "Hewn",
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
