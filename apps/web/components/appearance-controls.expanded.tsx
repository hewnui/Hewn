"use client";

import { AppearanceInstruments } from "@/components/appearance-controls.instruments";
import {
  DockDivider,
  ThemeSwatch,
} from "@/components/appearance-controls.parts";
import { themePacks, useTheme, type ThemeName } from "@hewnui/ui";
import { m } from "motion/react";

const themeNames = Object.keys(themePacks) as ThemeName[];

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const itemVariants = {
  hidden: { opacity: 0, x: 8, filter: "blur(4px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: spring },
};

export function AppearanceExpanded({
  panelId,
  showThemes,
  motionEnabled,
}: {
  panelId: string;
  showThemes: boolean;
  motionEnabled: boolean;
}) {
  const { setTheme, theme } = useTheme();

  return (
    <m.div
      id={panelId}
      role="group"
      aria-label="Appearance controls"
      tabIndex={0}
      className="flex h-11 items-center gap-2 overflow-x-auto overscroll-x-contain px-1.5"
      initial={motionEnabled ? "hidden" : false}
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.028, delayChildren: 0.06 },
        },
      }}
    >
      {showThemes ? (
        <m.div
          role="group"
          aria-label="Theme"
          className="flex shrink-0 items-center gap-1.5 pl-1"
          variants={itemVariants}
        >
          <span className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
            {theme}
          </span>
          <div className="flex shrink-0 items-center">
            {themeNames.map((value) => (
              <ThemeSwatch
                key={value}
                active={theme === value}
                theme={value}
                label={value}
                onSelect={() => setTheme(value)}
              />
            ))}
          </div>
        </m.div>
      ) : null}

      {showThemes ? (
        <m.span variants={itemVariants}>
          <DockDivider />
        </m.span>
      ) : null}

      <m.div variants={itemVariants}>
        <AppearanceInstruments />
      </m.div>
    </m.div>
  );
}
