export const dialogAi = {
  "schemaVersion": 1,
  "name": "dialog",
  "exportName": "Dialog",
  "importPath": "@hewnui/ui/dialog",
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
    "cli": "npx hewnui@latest add dialog"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Dialog } from \"@hewnui/ui/dialog\";\n\n<Dialog />"
    }
  ]
} as const;
