"use client";

import type { KeyboardEvent } from "react";
import { useCallback, useState } from "react";
import {
  Button,
  ComboBox as AriaComboBox,
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Text,
  type Key,
} from "react-aria-components";
import {
  fieldDescriptionClass,
  fieldErrorClass,
  fieldLabelClass,
  fieldRootClass,
} from "../../styles/field";
import { cn } from "../../utils/cn";
import { TagFieldChevronIcon } from "./tag-field-icons";
import {
  fieldSurfaceProps,
  tagFieldInputClass,
  tagFieldItemClass,
  tagFieldListClass,
  tagFieldListEmptyClass,
  tagFieldPopoverClass,
  tagFieldShellClass,
  tagFieldToggleClass,
} from "./tag-field.styles";
import { TagFieldSelectedTags } from "./tag-field-tags";
import type { TagFieldItemProps, TagFieldProps } from "./tag-field.types";

function asKeyArray(value: unknown): Key[] {
  if (Array.isArray(value)) return value as Key[];
  return [];
}

export function TagField({
  children,
  className,
  description,
  emptyLabel,
  errorMessage,
  label,
  listEmptyLabel = "No matching options",
  maxSelections,
  onChange,
  onInputChange,
  placeholder = "Add…",
  size = "md",
  tagsLabel = "Selected",
  variant = "outline",
  value,
  defaultValue,
  ...props
}: TagFieldProps) {
  const controlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState<Key[]>(
    () => asKeyArray(defaultValue),
  );
  const [inputValue, setInputValue] = useState("");
  const selected = controlled ? asKeyArray(value) : uncontrolled;

  const commit = useCallback(
    (next: Key[]) => {
      const clipped =
        maxSelections != null ? next.slice(0, maxSelections) : next;
      if (!controlled) setUncontrolled(clipped);
      onChange?.(clipped);
    },
    [controlled, maxSelections, onChange],
  );

  const atMax =
    maxSelections != null && selected.length >= maxSelections;

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Backspace" || inputValue !== "" || selected.length === 0) {
      return;
    }
    event.preventDefault();
    commit(selected.slice(0, -1));
  }

  return (
    <AriaComboBox
      {...props}
      selectionMode="multiple"
      value={selected}
      onChange={commit}
      inputValue={inputValue}
      onInputChange={(next) => {
        setInputValue(next);
        onInputChange?.(next);
      }}
      allowsEmptyCollection
      className={cn(fieldRootClass, "max-w-md", className)}
    >
      {label ? <Label className={fieldLabelClass}>{label}</Label> : null}
      <div
        {...fieldSurfaceProps(variant)}
        className={tagFieldShellClass(undefined, size, variant)}
      >
        <TagFieldSelectedTags
          emptyLabel={emptyLabel}
          tagsLabel={tagsLabel}
        />
        <Input
          placeholder={atMax ? `Maximum ${maxSelections}` : placeholder}
          className={tagFieldInputClass(size)}
          onKeyDown={handleInputKeyDown}
        />
        <Button className={tagFieldToggleClass()}>
          <TagFieldChevronIcon />
        </Button>
      </div>
      <Popover className={tagFieldPopoverClass} data-kp-surface>
        <ListBox
          className={tagFieldListClass}
          renderEmptyState={() => (
            <div className={tagFieldListEmptyClass}>{listEmptyLabel}</div>
          )}
        >
          {children}
        </ListBox>
      </Popover>
      {description ? (
        <Text slot="description" className={fieldDescriptionClass}>
          {description}
        </Text>
      ) : null}
      <FieldError className={fieldErrorClass}>{errorMessage}</FieldError>
      <span className="sr-only" aria-live="polite">
        {atMax
          ? `Maximum of ${maxSelections} selections reached.`
          : `${selected.length} selected.`}
      </span>
    </AriaComboBox>
  );
}

export function TagFieldItem({
  children,
  id,
  isDisabled,
  textValue,
}: TagFieldItemProps) {
  return (
    <ListBoxItem
      id={id}
      className={tagFieldItemClass}
      {...(textValue !== undefined ? { textValue } : {})}
      {...(isDisabled !== undefined ? { isDisabled } : {})}
    >
      {children}
    </ListBoxItem>
  );
}

/** Alias for MultiSelect naming. */
export const MultiSelect = TagField;
export const MultiSelectItem = TagFieldItem;
