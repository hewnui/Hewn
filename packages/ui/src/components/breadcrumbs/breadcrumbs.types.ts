import type { ReactNode } from "react";
import type { Key } from "react-aria-components";

export type BreadcrumbsProps = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  isDisabled?: boolean;
  onAction?: (key: Key) => void;
};

export type BreadcrumbItemProps = {
  children: ReactNode;
  className?: string;
  id?: Key;
  href?: string;
  isCurrent?: boolean;
};
