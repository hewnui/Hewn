export const datePickerAi = {
  "schemaVersion": 1,
  "name": "date-picker",
  "exportName": "DatePicker",
  "importPath": "@hewnui/ui/date-picker",
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
    "cli": "npx hewnui@latest add date-picker"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { DatePicker } from \"@hewnui/ui/date-picker\";\n\n<DatePicker />"
    }
  ]
} as const;
