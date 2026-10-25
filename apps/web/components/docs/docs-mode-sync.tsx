"use client";

import { getDocsMode } from "@/components/docs/docs-mode";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function DocsModeSync() {
  const pathname = usePathname();

  useEffect(() => {
    const mode = getDocsMode(pathname);
    document.documentElement.dataset.docsMode = mode;
    return () => {
      delete document.documentElement.dataset.docsMode;
    };
  }, [pathname]);

  return null;
}
