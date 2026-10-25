"use client";

import { Breadcrumb, Breadcrumbs } from "@hewnui/ui";

export function BreadcrumbsDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 flex flex-col gap-5 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <Breadcrumbs aria-label="Docs trail">
        <Breadcrumb href="/docs">Docs</Breadcrumb>
        <Breadcrumb href="/docs/components">Components</Breadcrumb>
        <Breadcrumb>Breadcrumbs</Breadcrumb>
      </Breadcrumbs>
      <Breadcrumbs aria-label="Disabled trail" isDisabled>
        <Breadcrumb href="/docs">Docs</Breadcrumb>
        <Breadcrumb href="/docs/themes">Themes</Breadcrumb>
        <Breadcrumb>Forest</Breadcrumb>
      </Breadcrumbs>
    </div>
  );
}
