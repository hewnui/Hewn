export const barChartAi = {
  "schemaVersion": 1,
  "name": "bar-chart",
  "exportName": "BarChart",
  "importPath": "@hewnui/ui/bar-chart",
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
    "cli": "npx hewnui@latest add bar-chart"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { BarChart } from \"@hewnui/ui/bar-chart\";\n\n<BarChart />"
    }
  ]
} as const;
