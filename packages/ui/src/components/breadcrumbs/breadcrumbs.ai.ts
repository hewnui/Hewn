export const breadcrumbsAi = {
  "schemaVersion": 1,
  "name": "breadcrumbs",
  "exportName": "Breadcrumbs",
  "importPath": "@hewnui/ui/breadcrumbs",
  "compoundParts": [],
  "props": [
    {
      "name": "className",
      "type": "string",
      "description": "Optional class names merged onto the root element."
    }
  ],
  "variants": [],
  "states": [],
  "keyboard": [
    "Tab moves focus to the control",
    "See component docs for widget-specific keys"
  ],
  "tokens": [
    "--kp-accent",
    "--kp-accent-foreground",
    "--kp-foreground",
    "--kp-background",
    "--kp-border",
    "--kp-radius-md"
  ],
  "install": {
    "npm": "npm install @hewnui/ui",
    "cli": "npx hewnui@latest add breadcrumbs"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Breadcrumbs } from \"@hewnui/ui/breadcrumbs\";\n\n<Breadcrumbs />"
    }
  ]
} as const;
