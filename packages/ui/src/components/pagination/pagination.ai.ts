export const paginationAi = {
  schemaVersion: 1,
  name: "pagination",
  exportName: "Pagination",
  importPath: "@hewnui/ui/pagination",
  compoundParts: [],
  props: [
    {
      name: "total",
      type: "number",
      description: "Total number of pages.",
      required: true,
    },
    {
      name: "page",
      type: "number",
      description: "Controlled current page (1-indexed).",
    },
    {
      name: "defaultPage",
      type: "number",
      description: "Uncontrolled initial page (1-indexed).",
      default: "1",
    },
    {
      name: "onPageChange",
      type: "(page: number) => void",
      description: "Fires when the current page changes.",
    },
    {
      name: "siblingCount",
      type: "number",
      description: "Pages shown beside the current page.",
      default: "1",
    },
    {
      name: "boundaryCount",
      type: "number",
      description: "Always-visible pages at each end.",
      default: "1",
    },
    {
      name: "size",
      type: "PaginationSize",
      description: "Control size (minimum 40px hit targets).",
      default: '"md"',
    },
    {
      name: "getHref",
      type: "(page: number) => string",
      description: "Optional href builder that switches controls to links.",
    },
    {
      name: "isDisabled",
      type: "boolean",
      description: "Disables all page controls.",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible name for the nav landmark.",
      default: '"Pagination"',
    },
    {
      name: "className",
      type: "string",
      description: "Optional class names merged onto the root nav.",
    },
  ],
  variants: [{ name: "size", values: ["sm", "md", "lg"] }],
  states: ["disabled"],
  keyboard: [
    "Tab moves between page controls",
    "Enter or Space activates the focused control",
  ],
  tokens: [
    "--kp-accent",
    "--kp-accent-foreground",
    "--kp-foreground",
    "--kp-surface",
    "--kp-muted",
    "--kp-radius-md",
    "--kp-ring",
    "--kp-motion-duration",
  ],
  install: {
    npm: "npm install @hewnui/ui",
    cli: "npx hewnui@latest add pagination",
  },
  examples: [
    {
      title: "Basic",
      code: 'import { Pagination } from "@hewnui/ui/pagination";\n\n<Pagination total={12} defaultPage={1} />',
    },
    {
      title: "Link mode",
      code: '<Pagination total={12} page={2} getHref={(page) => `/docs?page=${page}`} />',
    },
  ],
} as const;
