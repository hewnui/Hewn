export const checkboxAi = {
  "schemaVersion": 1,
  "name": "checkbox",
  "exportName": "Checkbox",
  "importPath": "@hewnui/ui/checkbox",
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
    "cli": "npx hewnui@latest add checkbox"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Checkbox } from \"@hewnui/ui/checkbox\";\n\n<Checkbox />"
    }
  ]
} as const;
