import type { RegistryItem } from "@hewnui/registry";

export const fileUploadRegistry: RegistryItem = {
  name: "file-upload",
  type: "component",
  tier: "free",
  category: "forms",
  title: "FileUpload",
  description:
    "Drag-and-drop file zone with browse trigger and removable file list.",
  states: ["disabled", "validation"],
  keywords: ["upload", "dropzone", "file"],
  docsPath: "/docs/components/file-upload",
};
