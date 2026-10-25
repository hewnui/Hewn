import type { ComponentPropsWithoutRef } from "react";

/** Focusable overflow wrapper for wide markdown tables (axe scrollable-region). */
export function DocsTable(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div
      className="relative my-6 overflow-auto prose-no-margin"
      tabIndex={0}
      role="region"
      aria-label="Table"
    >
      <table {...props} />
    </div>
  );
}
