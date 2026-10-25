export const selectAi = {
  "schemaVersion": 1,
  "name": "select",
  "exportName": "Select",
  "importPath": "@hewnui/ui/select",
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
    "cli": "npx hewnui@latest add select"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Select } from \"@hewnui/ui/select\";\n\n<Select />"
    }
  ]
} as const;
