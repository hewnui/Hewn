import { galleryTotals } from "@/components/docs/docs-gallery-data";

/** Renders the live free-registry component census — never hard-code this. */
export function FreeComponentCount() {
  return <>{galleryTotals.components}</>;
}
