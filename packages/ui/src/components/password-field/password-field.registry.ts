import type { RegistryItem } from "@hewnui/registry";

export const passwordFieldRegistry: RegistryItem = {
  name: "password-field",
  type: "component",
  tier: "free",
  category: "forms",
  title: "PasswordField",
  description: "Password input with an accessible show and hide toggle.",
  states: ["disabled", "validation"],
  keywords: ["password", "input", "secret"],
  docsPath: "/docs/components/password-field",
};
