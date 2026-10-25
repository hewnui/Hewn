export const lineChartAi = {
  "schemaVersion": 1,
  "name": "line-chart",
  "exportName": "LineChart",
  "importPath": "@hewnui/ui/line-chart",
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
    "cli": "npx hewnui@latest add line-chart"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { LineChart } from \"@hewnui/ui/line-chart\";\n\n<LineChart />"
    }
  ]
} as const;
