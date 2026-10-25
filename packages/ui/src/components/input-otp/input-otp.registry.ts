import type { RegistryItem } from "@hewnui/registry";

export const inputOtpRegistry: RegistryItem = {
  name: "input-otp",
  type: "component",
  tier: "free",
  category: "forms",
  title: "InputOTP",
  description:
    "Segmented one-time code entry with paste and keyboard navigation.",
  states: ["disabled", "validation"],
  keywords: ["otp", "code", "verification"],
  docsPath: "/docs/components/input-otp",
};
