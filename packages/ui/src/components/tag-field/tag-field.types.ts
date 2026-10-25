import type { ReactNode } from "react";
import type { ComboBoxProps, Key } from "react-aria-components";
import type { FieldSize, FieldVariant } from "../../styles/field";

export type TagFieldSize = FieldSize;
export type TagFieldVariant = FieldVariant;

type MultiComboBoxProps = ComboBoxProps<object, "multiple">;

export type TagFieldProps = Omit<
  MultiComboBoxProps,
  | "children"
  | "className"
  | "selectionMode"
  | "placeholder"
  | "label"
  | "description"
  | "errorMessage"
> & {
  children: ReactNode;
  className?: string;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  placeholder?: string;
  size?: TagFieldSize;
  variant?: TagFieldVariant;
  /** Cap how many options can be selected. Extra keys are ignored. */
  maxSelections?: number;
  /** Shown in the tag list when nothing is selected. */
  emptyLabel?: ReactNode;
  /** Shown in the listbox when the filter matches nothing. */
  listEmptyLabel?: ReactNode;
  /** Accessible name for the selected-tag group. */
  tagsLabel?: string;
};

export type TagFieldItemProps = {
  id: Key;
  children: ReactNode;
  textValue?: string;
  isDisabled?: boolean;
};

export type TagFieldChangeHandler = (value: Key[]) => void;
