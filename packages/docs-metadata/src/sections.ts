import type { DocsLink, DocsSection } from "./types";

export type RegistryIndexItem = {
  name: string;
  title: string;
  description: string;
  category: string;
  docsPath: string;
  tier: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  buttons: "Buttons",
  collections: "Collections",
  "data-display": "Data Display",
  "date-and-time": "Date and Time",
  feedback: "Feedback",
  forms: "Forms",
  layout: "Layout",
  media: "Media",
  navigation: "Navigation",
  overlays: "Overlays",
  pickers: "Pickers",
  typography: "Typography",
  utilities: "Utilities",
};

/** Group free registry items into component docs sections by category. */
export function componentSections(
  items: RegistryIndexItem[],
): DocsSection[] {
  const byCategory = new Map<string, DocsLink[]>();

  for (const item of items) {
    if (!item.docsPath) continue;
    const key = item.category;
    const list = byCategory.get(key) ?? [];
    list.push({
      title: item.title,
      path: item.docsPath,
      description: item.description,
    });
    byCategory.set(key, list);
  }

  return [...byCategory.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, links]) => ({
      heading: CATEGORY_LABELS[category] ?? category,
      links: links.sort((a, b) => a.title.localeCompare(b.title)),
    }));
}

export const GUIDE_LINKS: DocsLink[] = [
  {
    title: "Getting started",
    path: "/docs",
    description: "Providers, themes, and the free component core",
  },
  {
    title: "CLI",
    path: "/docs/cli",
    description: "CLI reference — npm publish at launch; registry JSON works today",
  },
  {
    title: "Themes",
    path: "/docs/themes",
    description: "Six curated packs, modes, glass, and radius",
  },
  {
    title: "Motion",
    path: "/docs/motion",
    description: "Duration tokens, MotionProvider modes, transform-only rules",
  },
  {
    title: "Theme Lab",
    path: "/docs/theme-lab",
    description: "Live preview of packs against components",
  },
  {
    title: "Theme Studio",
    path: "/docs/theme-studio",
    description: "Author a custom accent pack and export CSS",
  },
  {
    title: "Figma kit",
    path: "/docs/themes/figma-kit",
    description: "Tokens Studio JSON and sticker sheet",
  },
  {
    title: "MCP",
    path: "/docs/mcp",
    description: "Local stdio MCP server for registry and AI schema",
  },
  {
    title: "Roadmap",
    path: "/docs/roadmap",
    description: "Free vs Pro boundaries and upcoming work",
  },
];
