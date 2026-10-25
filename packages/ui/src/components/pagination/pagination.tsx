"use client";

import { useState, type ReactNode } from "react";
import { Button, Link } from "react-aria-components";
import { cn } from "../../utils/cn";
import {
  paginationEllipsisClass,
  paginationItemClass,
  paginationListClass,
  paginationRootClass,
} from "./pagination.styles";
import type { PaginationProps } from "./pagination.types";
import { getPaginationItems } from "./pagination.utils";

function Chevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
      <path
        d={
          direction === "prev"
            ? "M9.75 4.5 6.25 8l3.5 3.5"
            : "M6.25 4.5 9.75 8l-3.5 3.5"
        }
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Pagination({
  "aria-label": ariaLabel = "Pagination",
  boundaryCount = 1,
  className,
  defaultPage = 1,
  getHref,
  isDisabled,
  nextLabel = "Next",
  onPageChange,
  page,
  previousLabel = "Previous",
  siblingCount = 1,
  size = "md",
  total,
}: PaginationProps) {
  const controlled = page !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultPage);
  const safeTotal = Math.max(1, Math.floor(total));
  const current = Math.min(
    Math.max(1, Math.floor(controlled ? page : uncontrolled)),
    safeTotal,
  );
  const items = getPaginationItems(
    current,
    safeTotal,
    siblingCount,
    boundaryCount,
  );

  function goTo(next: number) {
    const clamped = Math.min(Math.max(1, next), safeTotal);
    if (clamped === current) return;
    if (!controlled) setUncontrolled(clamped);
    onPageChange?.(clamped);
  }

  function renderControl(
    target: number,
    {
      children,
      isCurrent = false,
      isNav = false,
      label,
    }: {
      children: ReactNode;
      isCurrent?: boolean;
      isNav?: boolean;
      label: string;
    },
  ) {
    const itemClass = paginationItemClass(size, { isCurrent, isNav });
    const disabled =
      Boolean(isDisabled) || (isNav && (target < 1 || target > safeTotal));

    const currentProps = isCurrent ? ({ "aria-current": "page" } as const) : {};

    if (getHref && !disabled) {
      return (
        <Link
          href={getHref(target)}
          className={itemClass}
          aria-label={label}
          onPress={() => goTo(target)}
          {...currentProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <Button
        className={itemClass}
        aria-label={label}
        isDisabled={disabled}
        onPress={() => goTo(target)}
        {...currentProps}
      >
        {children}
      </Button>
    );
  }

  return (
    <nav
      aria-label={ariaLabel}
      className={paginationRootClass(className)}
      data-kp-pagination=""
    >
      <ul className={paginationListClass()}>
        <li>
          {renderControl(current - 1, {
            label: "Go to previous page",
            isNav: true,
            children: (
              <>
                <Chevron direction="prev" />
                <span>{previousLabel}</span>
              </>
            ),
          })}
        </li>
        {items.map((item) =>
          item.type === "ellipsis" ? (
            <li key={item.key} aria-hidden>
              <span className={paginationEllipsisClass(size)}>…</span>
            </li>
          ) : (
            <li key={item.page}>
              {renderControl(item.page, {
                label: `Go to page ${item.page}`,
                isCurrent: item.page === current,
                children: item.page,
              })}
            </li>
          ),
        )}
        <li>
          {renderControl(current + 1, {
            label: "Go to next page",
            isNav: true,
            children: (
              <>
                <span>{nextLabel}</span>
                <Chevron direction="next" />
              </>
            ),
          })}
        </li>
      </ul>
      <p className={cn("m-0 font-mono text-xs tabular-nums text-muted-foreground")}>
        Page {current} of {safeTotal}
      </p>
    </nav>
  );
}
