"use client";

import {
  CLI_PACKAGE_NAME,
  PACKAGE_MANAGERS,
  UI_PACKAGE_NAME,
  cliAddCommand,
  packageInstallCommand,
  type PackageManager,
} from "@hewnui/docs-metadata/install";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TerminalWindowIcon } from "@phosphor-icons/react";
import { docsCodeViewportProps } from "@/components/docs/docs-code-viewport";

const MANAGER_LABEL: Record<PackageManager, string> = {
  npm: "npm",
  pnpm: "pnpm",
  yarn: "yarn",
  bun: "bun",
};

const TAB_ITEMS = [...PACKAGE_MANAGERS.map((pm) => MANAGER_LABEL[pm]), "CLI"];

function InstallSnippet({ code }: { code: string }) {
  return (
    <CodeBlock
      title="Terminal"
      icon={
        <TerminalWindowIcon aria-hidden weight="bold" className="size-3.5" />
      }
      className="kp-docs-code !my-0"
      viewportProps={docsCodeViewportProps("Install command")}
    >
      <Pre tabIndex={0}>
        <code className="language-bash">{code}</code>
      </Pre>
    </CodeBlock>
  );
}

export function DocsInstallBlock({ componentName }: { componentName: string }) {
  return (
    <section className="not-prose mb-10" aria-labelledby="docs-install-heading">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2
          id="docs-install-heading"
          className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
        >
          Install
        </h2>
        <p className="text-xs text-muted-foreground">
          <span className="font-mono text-foreground">{UI_PACKAGE_NAME}</span>
          {" · "}
          <span className="font-mono text-foreground">{CLI_PACKAGE_NAME}</span>
        </p>
      </div>

      <Tabs items={TAB_ITEMS} defaultIndex={1} className="kp-docs-install-tabs">
        {PACKAGE_MANAGERS.map((pm) => (
          <Tab key={pm} value={MANAGER_LABEL[pm]}>
            <InstallSnippet code={packageInstallCommand(pm)} />
          </Tab>
        ))}
        <Tab value="CLI">
          <InstallSnippet code={cliAddCommand(componentName)} />
        </Tab>
      </Tabs>
    </section>
  );
}
