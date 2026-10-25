"use client";

import { CodeIcon } from "@phosphor-icons/react";
import {
  CodeBlock,
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  Pre,
} from "fumadocs-ui/components/codeblock";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import type { ReactNode } from "react";
import { docsCodeViewportProps } from "@/components/docs/docs-code-viewport";

export function DocsCodeLangToggle({
  tsTitle,
  tsChildren,
  jsCode,
  jsLang,
}: {
  tsTitle: string;
  tsChildren: ReactNode;
  jsCode: string;
  jsLang: string;
}) {
  return (
    <CodeBlockTabs defaultValue="ts" className="kp-docs-code-tabs">
      <CodeBlockTabsList>
        <CodeBlockTabsTrigger value="ts">TypeScript</CodeBlockTabsTrigger>
        <CodeBlockTabsTrigger value="js">JavaScript</CodeBlockTabsTrigger>
      </CodeBlockTabsList>
      <CodeBlockTab value="ts">
        <CodeBlock
          title={tsTitle}
          icon={<CodeIcon aria-hidden weight="bold" className="size-3.5" />}
          className="kp-docs-code !my-0"
          viewportProps={docsCodeViewportProps(`${tsTitle} code`)}
        >
          <Pre tabIndex={0}>{tsChildren}</Pre>
        </CodeBlock>
      </CodeBlockTab>
      <CodeBlockTab value="js">
        <DynamicCodeBlock
          lang={jsLang}
          code={jsCode}
          codeblock={{
            title: jsLang === "jsx" ? "JSX" : "JS",
            icon: (
              <CodeIcon aria-hidden weight="bold" className="size-3.5" />
            ),
            className: "kp-docs-code !my-0",
            viewportProps: docsCodeViewportProps(
              jsLang === "jsx" ? "JSX code" : "JS code",
            ),
          }}
        />
      </CodeBlockTab>
    </CodeBlockTabs>
  );
}
