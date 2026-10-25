export const sliderAi = {
  "schemaVersion": 1,
  "name": "slider",
  "exportName": "Slider",
  "importPath": "@hewnui/ui/slider",
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
    "cli": "npx hewnui@latest add slider"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { Slider } from \"@hewnui/ui/slider\";\n\n<Slider />"
    }
  ]
} as const;
