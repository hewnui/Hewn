"use client";

import { hero } from "@/components/home/content";
import { themePacks, useTheme, type ThemeName } from "@hewnui/ui";

const themeNames = Object.keys(themePacks) as ThemeName[];

/**
 * Deliberately unlabelled: the Identity chapter owns the explanatory chip grid,
 * so the hero only offers the tactile repaint.
 */
export function HomeHeroThemes() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2.5">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {hero.themeHint}
      </span>
      <div
        role="group"
        aria-label="Preview theme"
        className="flex items-center gap-1"
      >
        {themeNames.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={theme === name}
            aria-label={name}
            onClick={() => setTheme(name)}
            className="group inline-grid size-10 place-items-center rounded-full transition-transform active:scale-[0.9]"
          >
            <span
              aria-hidden
              data-theme={name}
              data-mode={name === "ember" ? "dark" : "light"}
              className="size-2.5 rounded-full bg-accent opacity-45 shadow-[inset_0_1px_0_oklch(1_0_0/35%)] outline-offset-[3px] transition-[opacity,transform] group-hover:opacity-90 group-aria-pressed:scale-[1.35] group-aria-pressed:opacity-100 group-aria-pressed:outline group-aria-pressed:outline-1 group-aria-pressed:outline-accent/50"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
