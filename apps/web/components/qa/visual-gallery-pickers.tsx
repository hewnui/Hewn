"use client";

import { Combobox, ComboboxItem, Select, SelectItem } from "@hewnui/ui";
import { ThemeLabSection } from "@/components/demos/theme-lab/section";

/** Closed pickers only — open overlays are covered by interaction e2e, not snapshots. */
export function VisualGalleryPickers() {
  return (
    <ThemeLabSection
      title="Pickers"
      description="Select and Combobox triggers stay closed for stable screenshots."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Select label="Region" defaultSelectedKey="eu" placeholder="Choose region">
          <SelectItem id="eu">Europe</SelectItem>
          <SelectItem id="na">North America</SelectItem>
          <SelectItem id="apac">Asia Pacific</SelectItem>
        </Select>
        <Combobox
          label="Workspace"
          defaultSelectedKey="ops"
          placeholder="Find a workspace"
        >
          <ComboboxItem id="ops" textValue="Meridian Ops">
            Meridian Ops
          </ComboboxItem>
          <ComboboxItem id="labs" textValue="Atlas Labs">
            Atlas Labs
          </ComboboxItem>
        </Combobox>
      </div>
    </ThemeLabSection>
  );
}
