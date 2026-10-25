export const toastAi = {
  "schemaVersion": 1,
  "name": "toast",
  "exportName": "Toast",
  "importPath": "@hewnui/ui/toast",
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
    "cli": "npx hewnui@latest add toast"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Toast } from \"@hewnui/ui/toast\";\n\n<Toast />"
    }
  ]
} as const;
