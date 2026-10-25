"use client";

import { Select, SelectItem } from "@hewnui/ui";

export function SelectDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 flex flex-col gap-4 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border bg-surface p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <Select label="Theme pack" defaultSelectedKey="forest" variant="outline">
        <SelectItem id="forest">Forest</SelectItem>
        <SelectItem id="tide">Tide</SelectItem>
        <SelectItem id="graphite">Graphite</SelectItem>
        <SelectItem id="dune">Dune</SelectItem>
      </Select>
      <Select label="Material" placeholder="Choose material" variant="filled">
        <SelectItem id="solid">Solid</SelectItem>
        <SelectItem id="glass">Glass</SelectItem>
      </Select>
      <Select label="Radius" defaultSelectedKey="soft" variant="flushed">
        <SelectItem id="sharp">Sharp</SelectItem>
        <SelectItem id="soft">Soft</SelectItem>
        <SelectItem id="rounded">Rounded</SelectItem>
      </Select>
      <Select label="Accent" defaultSelectedKey="moss" variant="glass">
        <SelectItem id="moss">Moss</SelectItem>
        <SelectItem id="tide">Tide</SelectItem>
      </Select>
      <Select label="Locked pack" defaultSelectedKey="ember" isDisabled>
        <SelectItem id="ember">Ember</SelectItem>
      </Select>
      <Select label="Required pack" isRequired isInvalid>
        <SelectItem id="clay">Clay</SelectItem>
        <SelectItem id="dune">Dune</SelectItem>
      </Select>
    </div>
  );
}
