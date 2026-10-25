export const tableAi = {
  "schemaVersion": 1,
  "name": "table",
  "exportName": "Table",
  "importPath": "@hewnui/ui/table",
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
    "cli": "npx hewnui@latest add table"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Table } from \"@hewnui/ui/table\";\n\n<Table />"
    }
  ]
} as const;
