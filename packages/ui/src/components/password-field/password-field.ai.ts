export const passwordFieldAi = {
  "schemaVersion": 1,
  "name": "password-field",
  "exportName": "PasswordField",
  "importPath": "@hewnui/ui/password-field",
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
    "cli": "npx hewnui@latest add password-field"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { PasswordField } from \"@hewnui/ui/password-field\";\n\n<PasswordField />"
    }
  ]
} as const;
