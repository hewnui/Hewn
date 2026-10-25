"use client";

import { useState } from "react";
import { Pagination } from "@hewnui/ui";

export function PaginationDemo() {
  const [page, setPage] = useState(4);

  return (
    <div
      data-kp-surface
      className="not-prose my-6 space-y-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <Pagination total={12} page={page} onPageChange={setPage} />
      <Pagination
        total={8}
        defaultPage={2}
        size="sm"
        getHref={(next) => `/docs/components?page=${next}`}
        aria-label="Docs pages"
      />
    </div>
  );
}
