"use client";

import {
  Breadcrumb as AriaBreadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
  Link,
} from "react-aria-components";
import {
  breadcrumbCurrentClass,
  breadcrumbItemClassName,
  breadcrumbLinkClass,
  breadcrumbSeparatorClass,
  breadcrumbsClassName,
} from "./breadcrumbs.styles";
import type {
  BreadcrumbItemProps,
  BreadcrumbsProps,
} from "./breadcrumbs.types";

export function Breadcrumbs({
  "aria-label": ariaLabel = "Breadcrumbs",
  children,
  className,
  ...props
}: BreadcrumbsProps) {
  return (
    <AriaBreadcrumbs
      aria-label={ariaLabel}
      className={breadcrumbsClassName(className)}
      {...props}
    >
      {children}
    </AriaBreadcrumbs>
  );
}

export function Breadcrumb({
  children,
  className,
  href,
  id,
  isCurrent,
}: BreadcrumbItemProps) {
  return (
    <AriaBreadcrumb
      className={breadcrumbItemClassName(className)}
      {...(id !== undefined ? { id } : {})}
    >
      {({ isCurrent: current }) => {
        const atCurrent = isCurrent ?? current;
        return (
          <>
            {atCurrent || !href ? (
              <span
                className={breadcrumbCurrentClass}
                aria-current={atCurrent ? "page" : undefined}
              >
                {children}
              </span>
            ) : (
              <Link href={href} className={breadcrumbLinkClass}>
                {children}
              </Link>
            )}
            {!atCurrent ? (
              <span aria-hidden className={breadcrumbSeparatorClass}>
                /
              </span>
            ) : null}
          </>
        );
      }}
    </AriaBreadcrumb>
  );
}
