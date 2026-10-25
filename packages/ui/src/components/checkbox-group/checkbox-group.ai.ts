export const checkboxGroupAi = {
  "schemaVersion": 1,
  "name": "checkbox-group",
  "exportName": "CheckboxGroup",
  "importPath": "@hewnui/ui/checkbox-group",
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
    "cli": "npx hewnui@latest add checkbox-group"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { CheckboxGroup } from \"@hewnui/ui/checkbox-group\";\n\n<CheckboxGroup />"
    }
  ]
} as const;
