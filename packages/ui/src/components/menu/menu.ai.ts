export const menuAi = {
  "schemaVersion": 1,
  "name": "menu",
  "exportName": "Menu",
  "importPath": "@hewnui/ui/menu",
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
    "cli": "npx hewnui@latest add menu"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Menu } from \"@hewnui/ui/menu\";\n\n<Menu />"
    }
  ]
} as const;
