export const searchFieldAi = {
  "schemaVersion": 1,
  "name": "search-field",
  "exportName": "SearchField",
  "importPath": "@hewnui/ui/search-field",
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
    "cli": "npx hewnui@latest add search-field"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { SearchField } from \"@hewnui/ui/search-field\";\n\n<SearchField />"
    }
  ]
} as const;
