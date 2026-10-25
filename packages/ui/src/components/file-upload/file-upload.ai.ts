export const fileUploadAi = {
  "schemaVersion": 1,
  "name": "file-upload",
  "exportName": "FileUpload",
  "importPath": "@hewnui/ui/file-upload",
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
    "cli": "npx hewnui@latest add file-upload"
  },
  "examples": [
    {
      "title": "Basic",
      "code": "import { FileUpload } from \"@hewnui/ui/file-upload\";\n\n<FileUpload />"
    }
  ]
} as const;
