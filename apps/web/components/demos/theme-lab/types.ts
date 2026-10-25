export const THEME_LAB_LEVELS = [
  { id: "foundation", label: "Foundation", hint: "Tokens, type, surfaces" },
  { id: "actions", label: "Actions", hint: "Buttons and links" },
  { id: "forms", label: "Forms", hint: "Inputs and controls" },
  { id: "navigation", label: "Navigation", hint: "Wayfinding patterns" },
  { id: "data", label: "Data", hint: "Tables and metrics" },
  { id: "feedback", label: "Feedback", hint: "Progress and loading" },
] as const;

export type ThemeLabLevel = (typeof THEME_LAB_LEVELS)[number]["id"];
