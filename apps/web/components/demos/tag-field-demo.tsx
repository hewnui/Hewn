"use client";

import { TagField, TagFieldItem } from "@hewnui/ui";

export function TagFieldDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <TagField
        label="Skills"
        description="Pick the stacks you ship with."
        defaultValue={["react"]}
        maxSelections={3}
        name="skills"
      >
        <TagFieldItem id="react">React</TagFieldItem>
        <TagFieldItem id="vue" isDisabled>
          Vue
        </TagFieldItem>
        <TagFieldItem id="svelte">Svelte</TagFieldItem>
        <TagFieldItem id="solid">Solid</TagFieldItem>
        <TagFieldItem id="qwik">Qwik</TagFieldItem>
      </TagField>
    </div>
  );
}
