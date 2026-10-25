import type { ComponentCategory } from "@hewnui/registry/categories";

/** Hand-written category copy only — structure and counts come from the registry. */
export const galleryCategoryBlurbs: Partial<Record<ComponentCategory, string>> =
  {
    buttons: "The reference press control — loading, focus, and scale.",
    forms: "Fields that validate, announce, and match the active material.",
    pickers: "Choose options without leaving the page context.",
    "date-and-time": "Calendar-backed fields with segmented editing.",
    overlays: "Modals, panels, and hints that respect focus and motion.",
    navigation: "Wayfinding with shared indicator motion and clear trails.",
    "data-display": "Tables, charts, and status chips that stay theme-aware.",
    feedback: "Progress, loading, and interruptible notifications.",
    collections: "Structured lists and selectable collections.",
    layout: "Page structure and spacing primitives.",
    media: "Images, avatars, and media surfaces.",
    typography: "Text styles and readable content blocks.",
    utilities: "Helpers that support composition across the library.",
  };
