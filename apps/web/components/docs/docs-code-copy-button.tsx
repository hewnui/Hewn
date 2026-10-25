"use client";

import { CheckIcon } from "@phosphor-icons/react/dist/csr/Check";
import { CopyIcon } from "@phosphor-icons/react/dist/csr/Copy";
import { useEffect, useState } from "react";

/** Tiny client island — copy control for server-rendered docs code blocks. */
export function DocsCodeCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-[background-color,color,transform] hover:bg-muted/50 hover:text-foreground active:scale-[0.96]"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? (
        <CheckIcon aria-hidden weight="bold" className="size-3.5" />
      ) : (
        <CopyIcon aria-hidden weight="bold" className="size-3.5" />
      )}
    </button>
  );
}
