export const textFieldAi = {
  "schemaVersion": 1,
  "name": "text-field",
  "exportName": "TextField",
  "importPath": "@hewnui/ui/text-field",
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
    "cli": "npx hewnui@latest add text-field"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { TextField } from \"@hewnui/ui/text-field\";\n\n<TextField />"
    }
  ]
} as const;
