import type { RegistryItem } from "@hewnui/registry";

export const stepperRegistry: RegistryItem = {
  name: "stepper",
  type: "component",
  tier: "free",
  category: "navigation",
  title: "Stepper",
  description:
    "Multi-step progress indicator with horizontal and vertical orientations.",
  keywords: ["steps", "wizard", "progress", "onboarding"],
  docsPath: "/docs/components/stepper",
  states: ["disabled"],
};
