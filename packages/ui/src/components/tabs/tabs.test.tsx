import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/render";
import { Tab, TabList, TabPanel, Tabs } from "./tabs";

afterEach(() => cleanup());

describe("Tabs", () => {
  it("renders tablist and panels", () => {
    renderWithProviders(
      <Tabs defaultSelectedKey="overview">
        <TabList>
          <Tab id="overview">Overview</Tab>
          <Tab id="tokens">Tokens</Tab>
        </TabList>
        <TabPanel id="overview">Overview content</TabPanel>
        <TabPanel id="tokens">Token content</TabPanel>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "Overview" })).toBeTruthy();
    expect(screen.getByText("Overview content")).toBeTruthy();
  });
});
