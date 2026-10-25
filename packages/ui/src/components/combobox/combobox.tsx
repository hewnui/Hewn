"use client";

import type { ReactNode } from "react";
import {
  Button,
  ComboBox as AriaComboBox,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  type ComboBoxProps,
} from "react-aria-components";
import {
  fieldTriggerClass,
  menuItemClass,
  popoverSurfaceClass,
} from "../../styles/overlays";
import { cn } from "../../utils/cn";

type ComboboxProps = Omit<ComboBoxProps<object>, "children" | "className"> & {
  children: ReactNode;
  className?: string | undefined;
  label?: ReactNode;
  placeholder?: string;
};

export function Combobox({
  children,
  className,
  label,
  placeholder = "Search…",
  ...props
}: ComboboxProps) {
  return (
    <AriaComboBox
      {...props}
      className={cn("flex w-full max-w-sm flex-col gap-1.5 text-sm", className)}
    >
      {label ? <Label className="font-medium">{label}</Label> : null}
      <div className={fieldTriggerClass} data-kp-surface>
        <Input
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
        />
        <Button className="min-h-10 min-w-10 text-muted-foreground outline-none data-[pressed]:scale-[0.96]">
          ▾
        </Button>
      </div>
      <Popover
        className={cn(popoverSurfaceClass, "min-w-[var(--trigger-width)]")}
        data-kp-surface
      >
        <ListBox className="outline-none">{children}</ListBox>
      </Popover>
    </AriaComboBox>
  );
}

export function ComboboxItem({
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
      className={menuItemClass}
      {...(textValue !== undefined ? { textValue } : {})}
    >
      {children}
    </ListBoxItem>
  );
}
