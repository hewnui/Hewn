"use client";

import {
  Checkbox,
  Radio,
  RadioGroup,
  SearchField,
  Slider,
  Switch,
  TagField,
  TagFieldItem,
  TextArea,
  TextField,
} from "@hewnui/ui";
import { ThemeLabSection } from "./section";

export function ThemeLabForms() {
  return (
    <div className="space-y-6">
      <ThemeLabSection
        title="Text inputs"
        description="Labels sit above fields; focus rings use the accent token."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Workspace" placeholder="Meridian Ops" />
          <SearchField label="Search" placeholder="Filter records…" />
          <div className="md:col-span-2">
            <TextArea
              label="Notes"
              placeholder="Session notes for the audit trail."
              rows={3}
            />
          </div>
        </div>
      </ThemeLabSection>

      <ThemeLabSection
        title="Toggles and choice"
        description="Checkbox, switch, radio, and slider share spacing rhythm."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <Checkbox defaultSelected>Digest emails</Checkbox>
            <Switch defaultSelected>Glass accents</Switch>
          </div>
          <RadioGroup label="Plan tier" defaultValue="growth">
            <Radio value="starter">Starter</Radio>
            <Radio value="growth">Growth</Radio>
            <Radio value="scale">Scale</Radio>
          </RadioGroup>
        </div>
      </ThemeLabSection>

      <ThemeLabSection title="Slider" description="Track and thumb inherit accent and radius.">
        <div className="max-w-md">
          <Slider label="Volume" defaultValue={42} />
        </div>
      </ThemeLabSection>

      <ThemeLabSection
        title="TagField"
        description="Multi-select chips sit inside the field surface with removable tags."
      >
        <TagField label="Skills" defaultValue={["react"]} maxSelections={3}>
          <TagFieldItem id="react">React</TagFieldItem>
          <TagFieldItem id="svelte">Svelte</TagFieldItem>
          <TagFieldItem id="solid">Solid</TagFieldItem>
        </TagField>
      </ThemeLabSection>
    </div>
  );
}
