export const tooltipAi = {
  "schemaVersion": 1,
  "name": "tooltip",
  "exportName": "Tooltip",
  "importPath": "@hewnui/ui/tooltip",
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
    "cli": "npx hewnui@latest add tooltip"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Tooltip } from \"@hewnui/ui/tooltip\";\n\n<Tooltip />"
    }
  ]
} as const;
