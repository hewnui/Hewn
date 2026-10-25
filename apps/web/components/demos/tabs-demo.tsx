"use client";

import { Tab, TabList, TabPanel, Tabs } from "@hewnui/ui";

export function TabsDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 flex flex-col gap-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pills (Default)</p>
        <Tabs variant="pills" defaultSelectedKey="overview">
          <TabList>
            <Tab id="overview">Overview</Tab>
            <Tab id="tokens">Tokens</Tab>
            <Tab id="motion">Motion</Tab>
          </TabList>
          <TabPanel id="overview">Pill tabs with spring sliding pill indicator.</TabPanel>
          <TabPanel id="tokens">OKLCH tokens drive pack colors.</TabPanel>
          <TabPanel id="motion">Shared motion springs across tabs.</TabPanel>
        </Tabs>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Line Variant</p>
        <Tabs variant="line" defaultSelectedKey="overview">
          <TabList>
            <Tab id="overview">Overview</Tab>
            <Tab id="tokens">Tokens</Tab>
            <Tab id="motion">Motion</Tab>
          </TabList>
          <TabPanel id="overview">Sleek underline tab indicator style.</TabPanel>
          <TabPanel id="tokens">OKLCH tokens drive pack colors.</TabPanel>
          <TabPanel id="motion">Shared motion springs across tabs.</TabPanel>
        </Tabs>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Glass Variant</p>
        <Tabs variant="glass" defaultSelectedKey="overview">
          <TabList>
            <Tab id="overview">Overview</Tab>
            <Tab id="tokens">Tokens</Tab>
            <Tab id="motion">Motion</Tab>
          </TabList>
          <TabPanel id="overview">Frosted glass backdrop fill for modern header bars.</TabPanel>
          <TabPanel id="tokens">OKLCH tokens drive pack colors.</TabPanel>
          <TabPanel id="motion">Shared motion springs across tabs.</TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
