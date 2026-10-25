import freeIndex from "../../public/r/index.free.json";
import { galleryCategoriesFromIndex } from "./docs-gallery-catalog";
import type { GalleryCategory, GalleryItem } from "./docs-gallery-types";

export type { GalleryCategory, GalleryItem };

export const galleryCategories: GalleryCategory[] =
  galleryCategoriesFromIndex(freeIndex);

export const galleryTotals = {
  categories: galleryCategories.length,
  components: galleryCategories.reduce(
    (sum, category) => sum + category.items.length,
    0,
  ),
};
