export const popoverAi = {
  "schemaVersion": 1,
  "name": "popover",
  "exportName": "Popover",
  "importPath": "@hewnui/ui/popover",
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
    "cli": "npx hewnui@latest add popover"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Popover } from \"@hewnui/ui/popover\";\n\n<Popover />"
    }
  ]
} as const;
