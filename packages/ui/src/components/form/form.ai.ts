export const formAi = {
  "schemaVersion": 1,
  "name": "form",
  "exportName": "Form",
  "importPath": "@hewnui/ui/form",
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
    "cli": "npx hewnui@latest add form"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Form } from \"@hewnui/ui/form\";\n\n<Form />"
    }
  ]
} as const;
