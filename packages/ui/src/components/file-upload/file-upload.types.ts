import type { ReactNode } from "react";
import type { DropZoneProps } from "react-aria-components";

export type FileUploadProps = Omit<
  DropZoneProps,
  "className" | "children" | "onDrop"
> & {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  className?: string;
  buttonLabel?: string;
  emptyLabel?: string;
  acceptedFileTypes?: ReadonlyArray<string>;
  allowsMultiple?: boolean;
  files?: File[];
  defaultFiles?: File[];
  onFilesChange?: (files: File[]) => void;
  isInvalid?: boolean;
};
