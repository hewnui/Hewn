"use client";

import { Switch } from "@hewnui/ui";

export function SwitchDemo() {
  return (
    <div
      data-kp-surface
      className="not-prose my-6 flex flex-col gap-4 rounded-[calc(var(--kp-radius-lg)+0.25rem)] border p-5 shadow-[var(--kp-shadow-surface)]"
    >
      <Switch defaultSelected>Enable motion</Switch>
      <Switch>Digest emails</Switch>
      <Switch isDisabled>Legacy glass path</Switch>
      <Switch isDisabled defaultSelected>
        Locked preference
      </Switch>
    </div>
  );
}
