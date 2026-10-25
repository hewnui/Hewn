export const COMPONENT_CATEGORIES = [
  "buttons",
  "collections",
  "data-display",
  "date-and-time",
  "feedback",
  "forms",
  "layout",
  "media",
  "navigation",
  "overlays",
  "pickers",
  "typography",
  "utilities",
] as const;

export type ComponentCategory = (typeof COMPONENT_CATEGORIES)[number];

export const COMPONENT_CATEGORY_LABELS: Record<ComponentCategory, string> = {
  buttons: "Buttons",
  collections: "Collections",
  "data-display": "Data Display",
  "date-and-time": "Date and Time",
  feedback: "Feedback",
  forms: "Forms",
  layout: "Layout",
  media: "Media",
  navigation: "Navigation",
  overlays: "Overlays",
  pickers: "Pickers",
  typography: "Typography",
  utilities: "Utilities",
};
