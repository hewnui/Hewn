"use client";

import type { ReactNode } from "react";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as AriaSelect,
  SelectValue,
  type SelectProps as AriaSelectProps,
} from "react-aria-components";
import {
  selectItemClass,
  selectPopoverClass,
  selectTriggerClass,
  selectValueClass,
  type SelectVariant,
} from "./select.styles";
import { fieldSurfaceProps } from "../../styles/field";

type SelectProps = Omit<AriaSelectProps<object>, "children" | "className"> & {
  children: ReactNode;
  className?: string | undefined;
  label?: ReactNode;
  variant?: SelectVariant;
};

export function Select({
  children,
  className,
  label,
  placeholder = "Select an option",
  variant = "outline",
  ...props
}: SelectProps) {
  return (
    <AriaSelect
      {...props}
      placeholder={placeholder}
      className="flex w-full max-w-sm flex-col gap-1.5 text-sm"
    >
      {label ? <Label className="font-medium">{label}</Label> : null}
      <Button
        className={selectTriggerClass(className, variant)}
        {...fieldSurfaceProps(variant)}
      >
        <SelectValue className={selectValueClass} />
        <span aria-hidden className="text-muted-foreground">
          ▾
        </span>
      </Button>
      <Popover className={selectPopoverClass} data-kp-surface>
        <ListBox className="outline-none">{children}</ListBox>
      </Popover>
    </AriaSelect>
  );
}

export function SelectItem({
  children,
  id,
  textValue,
}: {
  children: ReactNode;
  id: string;
  textValue?: string;
}) {
  return (
    <ListBoxItem
      id={id}
      className={selectItemClass}
      {...(textValue !== undefined ? { textValue } : {})}
    >
      {children}
    </ListBoxItem>
  );
}
