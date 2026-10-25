"use client";

import {
  createContext,
  useContext,
  useId,
  type ReactNode,
} from "react";
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  type TabsProps as AriaTabsProps,
} from "react-aria-components";
import { m } from "motion/react";
import { springs } from "@hewnui/motion";
import { useMotionMode } from "../../providers/motion-provider";
import {
  tabClass,
  tabIndicatorClass,
  tabPanelClass,
  tabsListClass,
  type TabsVariant,
} from "./tabs.styles";

const TabsContext = createContext<{ layoutId: string; variant: TabsVariant }>({
  layoutId: "kp-tab",
  variant: "pills",
});

export function Tabs({
  children,
  variant = "pills",
  ...props
}: Omit<AriaTabsProps, "children" | "className"> & {
  children: ReactNode;
  variant?: TabsVariant;
}) {
  const layoutId = `kp-tab-${useId()}`;
  return (
    <TabsContext.Provider value={{ layoutId, variant }}>
      <AriaTabs {...props}>{children}</AriaTabs>
    </TabsContext.Provider>
  );
}

export function TabList({
  children,
  className,
  variant: listVariant,
}: {
  children: ReactNode;
  className?: string | undefined;
  variant?: TabsVariant;
}) {
  const context = useContext(TabsContext);
  const variant = listVariant ?? context.variant;
  return (
    <AriaTabList className={tabsListClass(className, variant)} data-kp-control="tabs">
      {children}
    </AriaTabList>
  );
}

export function Tab({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  const { motionEnabled } = useMotionMode();
  const { layoutId, variant } = useContext(TabsContext);

  return (
    <AriaTab id={id} className={tabClass(variant)}>
      {({ isSelected }) => (
        <>
          {isSelected ? (
            motionEnabled ? (
              <m.span
                layoutId={layoutId}
                className={tabIndicatorClass(variant)}
                transition={springs.snappy}
                data-kp-control="tab-indicator"
              />
            ) : (
              <span
                className={tabIndicatorClass(variant)}
                data-kp-control="tab-indicator"
              />
            )
          ) : null}
          <span className="relative z-10">{children}</span>
        </>
      )}
    </AriaTab>
  );
}

export function TabPanel({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  return (
    <AriaTabPanel id={id} className={tabPanelClass}>
      {children}
    </AriaTabPanel>
  );
}
