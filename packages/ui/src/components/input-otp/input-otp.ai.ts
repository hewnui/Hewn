export const inputOtpAi = {
  "schemaVersion": 1,
  "name": "input-otp",
  "exportName": "InputOtp",
  "importPath": "@hewnui/ui/input-otp",
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
    "cli": "npx hewnui@latest add input-otp"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { InputOtp } from \"@hewnui/ui/input-otp\";\n\n<InputOtp />"
    }
  ]
} as const;
