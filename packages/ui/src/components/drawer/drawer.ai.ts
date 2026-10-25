export const drawerAi = {
  "schemaVersion": 1,
  "name": "drawer",
  "exportName": "Drawer",
  "importPath": "@hewnui/ui/drawer",
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
    "cli": "npx hewnui@latest add drawer"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Drawer } from \"@hewnui/ui/drawer\";\n\n<Drawer />"
    }
  ]
} as const;
