import {
  Menu,
  MenuButton,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "./menu";

export const MenuRoot = Object.assign(MenuTrigger, {
  Button: MenuButton,
  Content: Menu,
  Item: MenuItem,
  Separator: MenuSeparator,
});

export { Menu, MenuButton, MenuItem, MenuSeparator, MenuTrigger };
