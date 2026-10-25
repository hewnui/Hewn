export const badgeAi = {
  "schemaVersion": 1,
  "name": "badge",
  "exportName": "Badge",
  "importPath": "@hewnui/ui/badge",
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
    "cli": "npx hewnui@latest add badge"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Badge } from \"@hewnui/ui/badge\";\n\n<Badge />"
    }
  ]
} as const;
