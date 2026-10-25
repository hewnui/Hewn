import type { PaginationItem } from "./pagination.types";

function range(start: number, end: number): number[] {
  const out: number[] = [];
  for (let page = start; page <= end; page += 1) out.push(page);
  return out;
}

/**
 * Build a compact page list with ellipsis gaps, matching common sibling /
 * boundary pagination patterns (1-indexed pages).
 */
export function getPaginationItems(
  page: number,
  total: number,
  siblingCount = 1,
  boundaryCount = 1,
): PaginationItem[] {
  const safeTotal = Math.max(1, Math.floor(total));
  const safePage = Math.min(Math.max(1, Math.floor(page)), safeTotal);
  const siblings = Math.max(0, Math.floor(siblingCount));
  const boundaries = Math.max(1, Math.floor(boundaryCount));

  const startPages = range(1, Math.min(boundaries, safeTotal));
  const endPages = range(
    Math.max(safeTotal - boundaries + 1, boundaries + 1),
    safeTotal,
  );

  const siblingsStart = Math.max(
    Math.min(
      safePage - siblings,
      safeTotal - boundaries - siblings * 2 - 1,
    ),
    boundaries + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(safePage + siblings, boundaries + siblings * 2 + 2),
    endPages.length > 0 ? endPages[0]! - 2 : safeTotal - 1,
  );

  const items: PaginationItem[] = startPages.map((value) => ({
    type: "page",
    page: value,
  }));

  if (siblingsStart > boundaries + 2) {
    items.push({ type: "ellipsis", key: "start-ellipsis" });
  } else if (boundaries + 1 < safeTotal - boundaries) {
    items.push({ type: "page", page: boundaries + 1 });
  }

  items.push(
    ...range(siblingsStart, siblingsEnd).map((value) => ({
      type: "page" as const,
      page: value,
    })),
  );

  if (siblingsEnd < safeTotal - boundaries - 1) {
    items.push({ type: "ellipsis", key: "end-ellipsis" });
  } else if (safeTotal - boundaries > boundaries) {
    items.push({ type: "page", page: safeTotal - boundaries });
  }

  items.push(...endPages.map((value) => ({ type: "page" as const, page: value })));

  // De-dupe pages that can overlap on small totals.
  const seen = new Set<number>();
  return items.filter((item) => {
    if (item.type === "ellipsis") return true;
    if (seen.has(item.page)) return false;
    seen.add(item.page);
    return true;
  });
}
