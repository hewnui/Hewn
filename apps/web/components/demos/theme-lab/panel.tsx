"use client";

import { useState } from "react";
import { ThemeLabActions } from "./actions";
import { ThemeLabData } from "./data";
import { ThemeLabExports } from "./exports";
import { ThemeLabFeedback } from "./feedback";
import { ThemeLabForms } from "./forms";
import { ThemeLabFoundation } from "./foundation";
import { ThemeLabLevelNav } from "./level-nav";
import { ThemeLabNavigation } from "./navigation";
import { ThemeLabStatusBar } from "./status-bar";
import type { ThemeLabLevel } from "./types";

function ThemeLabLevelContent({ level }: { level: ThemeLabLevel }) {
  switch (level) {
    case "foundation":
      return <ThemeLabFoundation />;
    case "actions":
      return <ThemeLabActions />;
    case "forms":
      return <ThemeLabForms />;
    case "navigation":
      return <ThemeLabNavigation />;
    case "data":
      return <ThemeLabData />;
    case "feedback":
      return <ThemeLabFeedback />;
  }
}

export function ThemeLabPanel() {
  const [level, setLevel] = useState<ThemeLabLevel>("foundation");

  return (
    <div className="not-prose space-y-6">
      <ThemeLabStatusBar />
      <ThemeLabExports />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]">
        <ThemeLabLevelNav active={level} onSelect={setLevel} />
        <div
          data-kp-surface
          className="min-w-0 rounded-[calc(var(--kp-radius-lg)+0.35rem)] border bg-surface p-4 shadow-[var(--kp-shadow-surface)] md:p-6"
        >
          <ThemeLabLevelContent level={level} />
        </div>
      </div>
    </div>
  );
}
