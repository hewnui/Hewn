import type { RegistryItem } from "@hewnui/registry";

export const dataTableRegistry: RegistryItem = {
  name: "data-table",
  type: "component",
  tier: "free",
  category: "data-display",
  title: "DataTable",
  description:
    "Advanced table powered by TanStack Table on Hewn surfaces.",
  dependencies: ["@tanstack/react-table"],
  states: ["loading", "empty", "error"],
  keywords: ["table", "grid", "tanstack"],
  docsPath: "/docs/components/data-table",
};
