export const sparklineAi = {
  "schemaVersion": 1,
  "name": "sparkline",
  "exportName": "Sparkline",
  "importPath": "@hewnui/ui/sparkline",
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
    "cli": "npx hewnui@latest add sparkline"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Sparkline } from \"@hewnui/ui/sparkline\";\n\n<Sparkline />"
    }
  ]
} as const;
