export const switchAi = {
  "schemaVersion": 1,
  "name": "switch",
  "exportName": "Switch",
  "importPath": "@hewnui/ui/switch",
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
    "cli": "npx hewnui@latest add switch"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Switch } from \"@hewnui/ui/switch\";\n\n<Switch />"
    }
  ]
} as const;
