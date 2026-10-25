"use client";

import {
  Header,
  Keyboard,
  MenuItem as AriaMenuItem,
  MenuSection,
  Text,
} from "react-aria-components";
import {
  commandGroupClass,
  commandGroupHeadingClass,
  commandItemClass,
  commandItemIconClass,
  commandItemLabelClass,
  commandShortcutClass,
} from "./command-palette.styles";
import type {
  CommandPaletteGroupProps,
  CommandPaletteItemProps,
  CommandPaletteRecentProps,
} from "./command-palette.types";

export function CommandPaletteGroup({
  children,
  className,
  heading,
  id,
}: CommandPaletteGroupProps) {
  return (
    <MenuSection
      className={commandGroupClass(className)}
      {...(id !== undefined ? { id } : {})}
    >
      <Header className={commandGroupHeadingClass}>{heading}</Header>
      {children}
    </MenuSection>
  );
}

export function CommandPaletteRecent({
  children,
  className,
  heading = "Recent",
}: CommandPaletteRecentProps) {
  return (
    <CommandPaletteGroup
      heading={heading}
      id="kp-command-recent"
      {...(className !== undefined ? { className } : {})}
    >
      {children}
    </CommandPaletteGroup>
  );
}

export function CommandPaletteItem({
  children,
  className,
  icon,
  id,
  isDisabled,
  onAction,
  shortcut,
  textValue,
}: CommandPaletteItemProps) {
  const resolvedText =
    textValue ?? (typeof children === "string" ? children : undefined);

  return (
    <AriaMenuItem
      id={id}
      className={commandItemClass(className)}
      {...(resolvedText !== undefined ? { textValue: resolvedText } : {})}
      {...(isDisabled !== undefined ? { isDisabled } : {})}
      {...(onAction !== undefined ? { onAction } : {})}
    >
      <span className={commandItemLabelClass}>
        {icon ? <span className={commandItemIconClass}>{icon}</span> : null}
        <Text slot="label">{children}</Text>
      </span>
      {shortcut ? (
        <Keyboard className={commandShortcutClass}>{shortcut}</Keyboard>
      ) : null}
    </AriaMenuItem>
  );
}
