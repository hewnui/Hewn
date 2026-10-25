import {
  galleryCategories,
  galleryTotals,
} from "@/components/docs/docs-gallery-data";

/**
 * Home catalog census — derived from the docs gallery, which tracks free
 * components that ship docs + registry metadata. Do not hardcode totals.
 */
export function getHomeCatalog() {
  const total = galleryTotals.components;
  const groups = galleryCategories.map((category) => ({
    name: category.title,
    count: category.items.length,
    href: category.items[0]?.href ?? "/docs/components",
    items: category.items.map((item) => item.name).join(", "),
  }));

  return {
    eyebrow: "Catalog",
    headline: `${total} free components. None of them filler.`,
    support:
      "Every entry ships docs, keyboard notes, states, registry metadata, and a generated JavaScript variant. No component lands as a screenshot.",
    total,
    cta: { href: "/docs/components", label: "Browse the gallery" },
    groups,
  } as const;
}

export type HomeCatalog = ReturnType<typeof getHomeCatalog>;
