import type { RegistryItem } from "@hewnui/registry";

export const paginationRegistry: RegistryItem = {
  name: "pagination",
  type: "component",
  tier: "free",
  category: "navigation",
  title: "Pagination",
  description:
    "Accessible page navigation with previous/next, numbered pages, and optional link mode.",
  states: ["disabled", "empty"],
  keywords: ["pages", "pager", "nav", "ellipsis", "seo"],
  docsPath: "/docs/components/pagination",
};
