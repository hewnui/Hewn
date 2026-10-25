"use client";

import { Button, Link } from "@hewnui/ui";
import { ThemeLabSection } from "./section";

export function ThemeLabActions() {
  return (
    <div className="space-y-6">
      <ThemeLabSection
        title="Button variants"
        description="Primary hierarchy, secondary fill, ghost for tertiary actions."
      >
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </ThemeLabSection>

      <ThemeLabSection
        title="States"
        description="Loading and disabled paths share the same hit target and motion rules."
      >
        <div className="flex flex-wrap gap-2">
          <Button isLoading>Saving</Button>
          <Button isDisabled>Disabled</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>
      </ThemeLabSection>

      <ThemeLabSection title="Links" description="Accent and muted link treatments.">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/docs">Docs home</Link>
          <Link href="/docs/components" variant="muted">
            Component gallery
          </Link>
        </div>
      </ThemeLabSection>
    </div>
  );
}
