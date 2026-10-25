export const numberFieldAi = {
  "schemaVersion": 1,
  "name": "number-field",
  "exportName": "NumberField",
  "importPath": "@hewnui/ui/number-field",
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
    "cli": "npx hewnui@latest add number-field"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { NumberField } from \"@hewnui/ui/number-field\";\n\n<NumberField />"
    }
  ]
} as const;
