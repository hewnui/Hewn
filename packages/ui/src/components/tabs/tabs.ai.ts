export const tabsAi = {
  "schemaVersion": 1,
  "name": "tabs",
  "exportName": "Tabs",
  "importPath": "@hewnui/ui/tabs",
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
    "cli": "npx hewnui@latest add tabs"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Tabs } from \"@hewnui/ui/tabs\";\n\n<Tabs />"
    }
  ]
} as const;
