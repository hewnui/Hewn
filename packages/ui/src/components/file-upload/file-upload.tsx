"use client";

import { useState } from "react";
import {
  Button,
  DropZone,
  FileTrigger,
  Text,
} from "react-aria-components";
import { Button as KpButton } from "../button";
import {
  fieldDescriptionClass,
  fieldErrorClass,
  fieldLabelClass,
} from "../../styles/field";
import {
  dropZoneClassName,
  dropZoneHintClass,
  dropZoneIconClass,
  fileListClass,
  fileNameClass,
  fileRowClass,
  fileUploadRootClass,
  removeFileClass,
} from "./file-upload.styles";
import type { FileUploadProps } from "./file-upload.types";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function UploadGlyph() {
  return (
    <span className={dropZoneIconClass} aria-hidden>
      <svg viewBox="0 0 16 16" className="size-4">
        <path
          d="M8 11.5V3.8M8 3.8 5.2 6.5M8 3.8 10.8 6.5M3 12.5h10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function FileUpload({
  acceptedFileTypes,
  allowsMultiple = true,
  buttonLabel = "Browse files",
  className,
  defaultFiles = [],
  description,
  emptyLabel = "Drop files here, or browse from disk.",
  errorMessage,
  files,
  isDisabled,
  isInvalid,
  label,
  onFilesChange,
  ...props
}: FileUploadProps) {
  const controlled = files !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultFiles);
  const current = controlled ? files : uncontrolled;

  function commit(next: File[]) {
    if (!controlled) setUncontrolled(next);
    onFilesChange?.(next);
  }

  function merge(incoming: FileList | File[] | null) {
    if (!incoming) return;
    const list = Array.from(incoming);
    commit(allowsMultiple ? [...current, ...list] : list.slice(0, 1));
  }

  function removeAt(index: number) {
    commit(current.filter((_, i) => i !== index));
  }

  return (
    <div className={fileUploadRootClass(className)}>
      {label ? <div className={fieldLabelClass}>{label}</div> : null}
      <DropZone
        {...props}
        data-kp-surface
        data-kp-upload="zone"
        {...(isDisabled !== undefined ? { isDisabled } : {})}
        getDropOperation={(types) =>
          types.has("Files") ? "copy" : "cancel"
        }
        onDrop={async (event) => {
          const items = await Promise.all(
            event.items
              .filter((item) => item.kind === "file")
              .map((item) => item.getFile()),
          );
          merge(items);
        }}
        className={({ isDropTarget }) =>
          dropZoneClassName({ isDropTarget, isInvalid })
        }
      >
        {({ isDropTarget }) => (
          <>
            <UploadGlyph />
            <Text slot="label" className={dropZoneHintClass}>
              {isDropTarget ? "Release to add files" : emptyLabel}
            </Text>
            <FileTrigger
              {...(acceptedFileTypes !== undefined
                ? { acceptedFileTypes }
                : {})}
              allowsMultiple={allowsMultiple}
              onSelect={(selected) => merge(selected)}
            >
              <KpButton
                variant="secondary"
                size="sm"
                {...(isDisabled !== undefined ? { isDisabled } : {})}
              >
                {buttonLabel}
              </KpButton>
            </FileTrigger>
          </>
        )}
      </DropZone>
      {description ? (
        <p className={fieldDescriptionClass}>{description}</p>
      ) : null}
      {isInvalid && errorMessage ? (
        <p className={fieldErrorClass} role="alert">
          {errorMessage}
        </p>
      ) : null}
      {current.length > 0 ? (
        <ul className={fileListClass}>
          {current.map((file, index) => (
            <li
              key={`${file.name}-${file.size}-${index}`}
              data-kp-surface
              data-kp-upload="row"
              className={fileRowClass}
            >
              <div className="min-w-0">
                <div className={fileNameClass}>{file.name}</div>
                <div className="text-xs tabular-nums text-muted-foreground">
                  {formatSize(file.size)}
                </div>
              </div>
              <Button
                className={removeFileClass}
                aria-label={`Remove ${file.name}`}
                {...(isDisabled !== undefined ? { isDisabled } : {})}
                onPress={() => removeAt(index)}
              >
                <svg viewBox="0 0 12 12" className="size-3.5" aria-hidden>
                  <path
                    d="M2.5 2.5 9.5 9.5M9.5 2.5 2.5 9.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
