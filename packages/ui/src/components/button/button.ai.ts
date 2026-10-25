export const buttonAi = {
  "schemaVersion": 1,
  "name": "button",
  "exportName": "Button",
  "importPath": "@hewnui/ui/button",
  "compoundParts": [],
  "props": [
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Button label or content.",
      "required": true
    },
    {
      "name": "variant",
      "type": "ButtonVariant",
      "description": "Visual style.",
      "default": "\"primary\""
    },
    {
      "name": "size",
      "type": "ButtonSize",
      "description": "Control size.",
      "default": "\"md\""
    },
    {
      "name": "isLoading",
      "type": "boolean",
      "description": "Shows a spinner and disables the button.",
      "default": "false"
    },
    {
      "name": "isDisabled",
      "type": "boolean",
      "description": "Disables press and focus activation."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Optional class names merged onto the root."
    }
  ],
  "variants": [
    {
      "name": "variant",
      "values": [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "glass",
        "soft",
        "glow",
        "danger",
        "danger-outline",
        "danger-soft"
      ]
    },
    {
      "name": "size",
      "values": ["sm", "md", "lg"]
    }
  ],
  "states": ["loading", "disabled"],
  "keyboard": [
    "Enter or Space activates",
    "Tab moves focus",
    "Disabled buttons are not focusable via Tab when fully disabled"
  ],
  "tokens": [
    "--kp-accent",
    "--kp-accent-foreground",
    "--kp-danger",
    "--kp-border",
    "--kp-radius-md",
    "--kp-motion-duration",
    "--kp-motion-ease-standard"
  ],
  "install": {
    "npm": "npm install @hewnui/ui",
    "cli": "npx hewnui@latest add button"
  },
  "examples": [
    {
      "title": "Primary",
      "code": "import { Button } from \"@hewnui/ui/button\";\n\n<Button>Save changes</Button>"
    },
    {
      "title": "Loading",
      "code": "<Button isLoading>Saving</Button>"
    }
  ]
} as const;
