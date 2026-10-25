export const tagFieldAi = {
  schemaVersion: 1,
  name: "tag-field",
  exportName: "TagField",
  importPath: "@hewnui/ui/tag-field",
  compoundParts: ["TagFieldItem", "MultiSelect", "MultiSelectItem"],
  props: [
    {
      name: "label",
      type: "ReactNode",
      description: "Visible field label bound to the combobox input.",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Helper text announced with the field.",
    },
    {
      name: "errorMessage",
      type: "ReactNode",
      description: "Validation message shown when the field is invalid.",
    },
    {
      name: "value",
      type: "Key[]",
      description: "Controlled selected keys.",
    },
    {
      name: "defaultValue",
      type: "Key[]",
      description: "Uncontrolled initial selected keys.",
    },
    {
      name: "onChange",
      type: "(value: Key[]) => void",
      description: "Fires when the selected key set changes.",
    },
    {
      name: "maxSelections",
      type: "number",
      description: "Maximum number of tags that can be selected.",
    },
    {
      name: "name",
      type: "string",
      description: "Form field name for selected key submission.",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Input placeholder when under the selection cap.",
    },
    {
      name: "emptyLabel",
      type: "ReactNode",
      description: "Empty-state copy inside the tag list.",
    },
    {
      name: "listEmptyLabel",
      type: "ReactNode",
      description: "Empty-state copy when the filtered list has no matches.",
    },
    {
      name: "size",
      type: "TagFieldSize",
      description: "Control size.",
      default: '"md"',
    },
    {
      name: "variant",
      type: "TagFieldVariant",
      description: "Field surface variant.",
      default: '"outline"',
    },
    {
      name: "className",
      type: "string",
      description: "Optional class names merged onto the root.",
    },
  ],
  variants: [
    { name: "size", values: ["sm", "md", "lg"] },
    { name: "variant", values: ["outline", "filled", "flushed", "glass"] },
  ],
  states: ["empty", "disabled", "validation"],
  keyboard: [
    "Type to filter options",
    "Arrow keys move through listbox options",
    "Enter selects the focused option",
    "Backspace on an empty input removes the last tag",
    "Arrow keys move between selected tags",
    "Delete or remove button deletes the focused tag",
  ],
  tokens: [
    "--kp-accent",
    "--kp-foreground",
    "--kp-muted",
    "--kp-surface",
    "--kp-border",
    "--kp-radius-md",
    "--kp-ring",
    "--kp-motion-duration",
  ],
  install: {
    npm: "npm install @hewnui/ui",
    cli: "npx hewnui@latest add tag-field",
  },
  examples: [
    {
      title: "Basic",
      code: 'import { TagField, TagFieldItem } from "@hewnui/ui/tag-field";\n\n<TagField label="Skills" defaultValue={["react"]}>\n  <TagFieldItem id="react">React</TagFieldItem>\n  <TagFieldItem id="svelte">Svelte</TagFieldItem>\n</TagField>',
    },
  ],
} as const;
