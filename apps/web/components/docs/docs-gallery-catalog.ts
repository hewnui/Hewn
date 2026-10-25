import {
  COMPONENT_CATEGORIES,
  COMPONENT_CATEGORY_LABELS,
  type ComponentCategory,
} from "@hewnui/registry/categories";
import { galleryCategoryBlurbs } from "./docs-gallery-blurbs";
import type { GalleryCategory, GalleryItem } from "./docs-gallery-types";

type RegistryGalleryItem = {
  name: string;
  title: string;
  description: string;
  category: string;
  docsPath: string;
};

type FreeRegistryIndex = {
  version: number;
  items: readonly RegistryGalleryItem[];
};

function isComponentCategory(value: string): value is ComponentCategory {
  return (COMPONENT_CATEGORIES as readonly string[]).includes(value);
}

function toGalleryItem(item: RegistryGalleryItem): GalleryItem {
  return {
    name: item.title,
    href: item.docsPath,
    description: item.description,
  };
}

/** Build gallery sections from registry items — empty categories are omitted. */
export function buildGalleryCategories(
  items: readonly RegistryGalleryItem[],
): GalleryCategory[] {
  const byCategory = new Map<ComponentCategory, GalleryItem[]>();

  for (const item of items) {
    if (!isComponentCategory(item.category)) continue;
    const list = byCategory.get(item.category) ?? [];
    list.push(toGalleryItem(item));
    byCategory.set(item.category, list);
  }

  for (const list of byCategory.values()) {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return COMPONENT_CATEGORIES.flatMap((category) => {
    const categoryItems = byCategory.get(category);
    if (!categoryItems || categoryItems.length === 0) return [];

    return [
      {
        title: COMPONENT_CATEGORY_LABELS[category],
        blurb: galleryCategoryBlurbs[category] ?? "",
        items: categoryItems,
      },
    ];
  });
}

export function galleryCategoriesFromIndex(
  index: FreeRegistryIndex,
): GalleryCategory[] {
  return buildGalleryCategories(index.items);
}
