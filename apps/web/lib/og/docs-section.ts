import { galleryCategories } from "@/components/docs/docs-gallery-data";

const componentCategoryBySlug = new Map<string, string>();

for (const category of galleryCategories) {
  for (const item of category.items) {
    const slug = item.href.replace(/^\/docs\/components\//, "");
    if (slug && !slug.includes("/")) {
      componentCategoryBySlug.set(slug, category.title);
    }
  }
}

const sectionByRoot: Record<string, string> = {
  components: "Components",
  themes: "Themes",
  "theme-lab": "Theme Lab",
  "theme-studio": "Theme Studio",
  cli: "CLI",
  mcp: "MCP",
  roadmap: "Roadmap",
  "getting-started": "Getting started",
};

export type DocsOgSection = {
  /** Top-level docs section label (mono eyebrow). */
  section: string;
  /** Component gallery category when on a component detail page. */
  category?: string;
};

/**
 * Map a docs slug to section + optional component category for OG cards.
 */
export function docsOgSection(slug?: string[]): DocsOgSection {
  if (!slug?.length) {
    return { section: "Documentation" };
  }

  const root = slug[0] ?? "";
  const section = sectionByRoot[root] ?? "Documentation";

  if (root === "components" && slug.length > 1) {
    const name = slug[1] ?? "";
    const category = componentCategoryBySlug.get(name);
    return category ? { section, category } : { section };
  }

  if (root === "themes" && slug.length > 1) {
    return { section, category: "Theme packs" };
  }

  return { section };
}

export function truncateOgText(text: string, max = 140): string {
  const trimmed = text.trim().replace(/\s+/g, " ");
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}
