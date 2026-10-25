"use client";

import { FileUpload } from "@hewnui/ui";

const sampleMark = new File(
  ["<svg xmlns='http://www.w3.org/2000/svg'/>"],
  "andruia-mark.svg",
  { type: "image/svg+xml" },
);

export function FileUploadDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 grid gap-5 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <FileUpload
        label="Brand mark"
        description="SVG or PNG up to a few megabytes."
        acceptedFileTypes={["image/png", "image/svg+xml", "image/jpeg"]}
        allowsMultiple={false}
        defaultFiles={[sampleMark]}
      />
      <FileUpload
        label="Release attachments"
        buttonLabel="Add files"
        emptyLabel="Drop changelog assets here, or browse from disk."
        allowsMultiple
      />
    </div>
  );
}
