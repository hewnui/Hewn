export const radioGroupAi = {
  "schemaVersion": 1,
  "name": "radio-group",
  "exportName": "RadioGroup",
  "importPath": "@hewnui/ui/radio-group",
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
    "cli": "npx hewnui@latest add radio-group"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { RadioGroup } from \"@hewnui/ui/radio-group\";\n\n<RadioGroup />"
    }
  ]
} as const;
