export const progressAi = {
  "schemaVersion": 1,
  "name": "progress",
  "exportName": "Progress",
  "importPath": "@hewnui/ui/progress",
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
    "cli": "npx hewnui@latest add progress"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Progress } from \"@hewnui/ui/progress\";\n\n<Progress />"
    }
  ]
} as const;
