"use client";

import { hero } from "@/components/home/content";
import { HomeHeroChart } from "@/components/home/home-hero-chart";
import { Badge, Button, Progress, Slider, Switch } from "@hewnui/ui";
import { memo } from "react";

const specimen = hero.specimen;

/**
 * Hero specimen — no enter opacity animation so primary controls keep WCAG
 * contrast from the first painted frame (axe / LCP-adjacent checks).
 */
function HomeHeroClusterInner() {
  return (
    <div className="relative mx-auto w-full max-w-md md:mx-0 md:max-w-none">
      <div
        data-kp-surface
        className="absolute -top-6 right-2 hidden w-[62%] rounded-[var(--kp-radius-lg)] border border-border/70 px-5 py-4 shadow-[var(--kp-shadow-surface)] md:block"
        style={{ rotate: "-2.4deg" }}
      >
        <Slider label={specimen.densityLabel} defaultValue={62} />
      </div>

      <div
        data-kp-surface
        className="relative rounded-[calc(var(--kp-radius-lg)+0.65rem)] border border-border p-6 shadow-[inset_0_1px_0_oklch(1_0_0/12%),var(--kp-shadow-surface)] md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {specimen.label}
            </p>
            <p className="mt-2 max-w-[26ch] text-sm leading-relaxed text-pretty text-muted-foreground">
              {specimen.hint}
            </p>
          </div>
          <Badge>{specimen.badge}</Badge>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="sm">{specimen.primary}</Button>
          <Button size="sm" variant="secondary">
            {specimen.secondary}
          </Button>
          <Switch defaultSelected>{specimen.switchLabel}</Switch>
        </div>

        <div className="mt-8 border-t border-border/60 pt-6">
          <Progress
            className="max-w-none"
            label={specimen.rolloutLabel}
            value={62}
          />
        </div>
      </div>

      <div className="absolute -bottom-7 -left-4 md:-left-10">
        <HomeHeroChart />
      </div>
    </div>
  );
}

export const HomeHeroCluster = memo(HomeHeroClusterInner);
