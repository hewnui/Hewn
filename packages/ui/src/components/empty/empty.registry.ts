import type { RegistryItem } from "@hewnui/registry";

export const emptyRegistry: RegistryItem = {
  name: "empty",
  type: "component",
  tier: "free",
  category: "feedback",
  title: "Empty",
  description:
    "Quiet placeholder for lists and tables with no rows. Decorative geometry stays silent; this region announces.",
  states: ["empty"],
  keywords: ["blank", "zero", "placeholder"],
  docsPath: "/docs/components/empty",
};
