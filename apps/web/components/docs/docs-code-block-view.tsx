"use client";

import { CodeIcon } from "@phosphor-icons/react";
import {
  CodeBlock,
  Pre,
  type CodeBlockProps,
} from "fumadocs-ui/components/codeblock";
import type { ReactNode } from "react";
import { DocsCodeLangToggle } from "@/components/docs/docs-code-lang-toggle";
import { docsCodeViewportProps } from "@/components/docs/docs-code-viewport";

export function DocsCodeBlockView({
  children,
  title,
  className,
  jsCode,
  jsLang,
  ...props
}: CodeBlockProps & {
  children: ReactNode;
  jsCode?: string | undefined;
  jsLang?: string | undefined;
}) {
  if (jsCode && jsLang) {
    return (
      <DocsCodeLangToggle
        tsTitle={typeof title === "string" ? title : "TSX"}
        tsChildren={children}
        jsCode={jsCode}
        jsLang={jsLang}
      />
    );
  }

  return (
    <CodeBlock
      {...props}
      title={title}
      icon={<CodeIcon aria-hidden weight="bold" className="size-3.5" />}
      className={["kp-docs-code", className].filter(Boolean).join(" ")}
      viewportProps={docsCodeViewportProps(
        typeof title === "string" ? `${title} code` : "Code",
      )}
    >
      <Pre tabIndex={0}>{children}</Pre>
    </CodeBlock>
  );
}
