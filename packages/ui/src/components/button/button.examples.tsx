"use client";

import { Button } from "./button";

export function ButtonExamples() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button isLoading>Saving</Button>
      <Button isDisabled>Disabled</Button>
    </div>
  );
}
