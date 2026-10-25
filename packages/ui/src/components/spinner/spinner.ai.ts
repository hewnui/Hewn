export const spinnerAi = {
  "schemaVersion": 1,
  "name": "spinner",
  "exportName": "Spinner",
  "importPath": "@hewnui/ui/spinner",
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
    "cli": "npx hewnui@latest add spinner"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Spinner } from \"@hewnui/ui/spinner\";\n\n<Spinner />"
    }
  ]
} as const;
