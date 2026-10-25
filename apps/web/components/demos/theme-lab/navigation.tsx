"use client";

import {
  Breadcrumb,
  Breadcrumbs,
  Pagination,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@hewnui/ui";
import { ThemeLabSection } from "./section";

export function ThemeLabNavigation() {
  return (
    <div className="space-y-6">
      <ThemeLabSection
        title="Breadcrumbs"
        description="Trail hierarchy uses muted foreground with an accent current page."
      >
        <Breadcrumbs>
          <Breadcrumb href="/docs">Docs</Breadcrumb>
          <Breadcrumb href="/docs/themes">Themes</Breadcrumb>
          <Breadcrumb>Theme Lab</Breadcrumb>
        </Breadcrumbs>
      </ThemeLabSection>

      <ThemeLabSection
        title="Tabs"
        description="Selected tab uses surface contrast; panels inherit pack motion timing."
      >
        <Tabs defaultSelectedKey="overview">
          <TabList>
            <Tab id="overview">Overview</Tab>
            <Tab id="tokens">Tokens</Tab>
            <Tab id="motion">Motion</Tab>
          </TabList>
          <TabPanel id="overview">
            One active pack styles the shell and every specimen here.
          </TabPanel>
          <TabPanel id="tokens">
            Semantic tokens drive accent, neutrals, glass tint, and danger.
          </TabPanel>
          <TabPanel id="motion">
            Global motion respects reduced-motion preferences first.
          </TabPanel>
        </Tabs>
      </ThemeLabSection>

      <ThemeLabSection
        title="Pagination"
        description="Current page uses accent fill; ellipsis stays presentational."
      >
        <Pagination total={10} defaultPage={4} />
      </ThemeLabSection>
    </div>
  );
}
