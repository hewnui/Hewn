"use client";

import {
  Button,
  FieldError,
  Group,
  Input,
  Label,
  SearchField as AriaSearchField,
  Text,
} from "react-aria-components";
import { cn } from "../../utils/cn";
import {
  fieldDescriptionClass,
  fieldErrorClass,
  fieldLabelClass,
  fieldRootClass,
  fieldSurfaceProps,
} from "../../styles/field";
import {
  searchClearClass,
  searchGroupClassName,
  searchInputClass,
} from "./search-field.styles";
import type { SearchFieldProps } from "./search-field.types";

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-muted-foreground" aria-hidden>
      <circle
        cx="7"
        cy="7"
        r="4.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10.2 10.2 13.5 13.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3.5" aria-hidden>
      <path
        d="M2.5 2.5 9.5 9.5M9.5 2.5 2.5 9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SearchField({
  className,
  description,
  errorMessage,
  inputClassName: inputClass,
  label,
  placeholder = "Search",
  size = "md",
  variant = "outline",
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField {...props} className={cn(fieldRootClass, className)}>
      {label ? <Label className={fieldLabelClass}>{label}</Label> : null}
      <Group
        {...fieldSurfaceProps(variant)}
        className={searchGroupClassName({ size, variant })}
      >
        <SearchIcon />
        <Input
          className={cn(searchInputClass, inputClass)}
          {...(placeholder !== undefined ? { placeholder } : {})}
        />
        <Button slot="clear" className={searchClearClass} aria-label="Clear search">
          <ClearIcon />
        </Button>
      </Group>
      {description ? (
        <Text slot="description" className={fieldDescriptionClass}>
          {description}
        </Text>
      ) : null}
      <FieldError className={fieldErrorClass}>{errorMessage}</FieldError>
    </AriaSearchField>
  );
}
