"use client";

import { Checkbox, TextField } from "@hewnui/ui";
import type { ByokSettings } from "./studio-ai-byok";
import { saveByok } from "./studio-ai-byok";

export function StudioAiByokForm({
  byok,
  useModel,
  onByok,
  onUseModel,
}: {
  byok: ByokSettings;
  useModel: boolean;
  onByok: (next: ByokSettings) => void;
  onUseModel: (next: boolean) => void;
}) {
  function update(patch: Partial<ByokSettings>) {
    const next = { ...byok, ...patch };
    onByok(next);
    saveByok(next);
  }

  return (
    <details className="text-sm">
      <summary className="inline-flex min-h-10 cursor-pointer items-center text-muted-foreground">
        BYOK settings
      </summary>
      <div className="mt-3 space-y-3">
        <Checkbox isSelected={useModel} onChange={onUseModel}>
          Call OpenAI-compatible model
        </Checkbox>
        <TextField
          label="API key"
          type="password"
          value={byok.apiKey}
          onChange={(value) => update({ apiKey: value })}
          description="Stored in this browser only — never sent to Hewn."
          inputClassName="font-mono text-xs"
        />
        <TextField
          label="Base URL"
          type="url"
          value={byok.baseUrl}
          onChange={(value) => update({ baseUrl: value })}
          placeholder="https://api.openai.com/v1"
          inputClassName="font-mono text-xs"
        />
        <TextField
          label="Model"
          value={byok.model}
          onChange={(value) => update({ model: value })}
          placeholder="gpt-4o-mini"
          inputClassName="font-mono text-xs"
        />
      </div>
    </details>
  );
}
