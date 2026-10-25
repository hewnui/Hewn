import type { ReactNode } from "react";

export type PaginationSize = "sm" | "md" | "lg";

export type PaginationProps = {
  /** Total number of pages (minimum 1). */
  total: number;
  /** Controlled current page (1-indexed). */
  page?: number;
  /** Uncontrolled initial page (1-indexed). */
  defaultPage?: number;
  /** Called when the current page changes. */
  onPageChange?: (page: number) => void;
  /** Pages shown on each side of the current page. */
  siblingCount?: number;
  /** Always-visible pages at the start and end. */
  boundaryCount?: number;
  size?: PaginationSize;
  className?: string;
  /** Accessible name for the nav landmark. */
  "aria-label"?: string;
  /**
   * When provided, page controls render as links using this href builder
   * instead of buttons (useful for SEO-friendly listing pages).
   */
  getHref?: (page: number) => string;
  previousLabel?: ReactNode;
  nextLabel?: ReactNode;
  isDisabled?: boolean;
};

export type PaginationItem =
  | { type: "page"; page: number }
  | { type: "ellipsis"; key: string };
