"use client";

import { TextArea } from "@hewnui/ui";
import { useId } from "react";
import { StudioSegmented } from "./studio-segmented";

export type AiSource = "prompt" | "css" | "logo";

const sources = [
  { value: "prompt" as const, label: "Prompt" },
  { value: "css" as const, label: "CSS" },
  { value: "logo" as const, label: "Logo" },
];

export function StudioAiInputs({
  source,
  prompt,
  css,
  onSource,
  onPrompt,
  onCss,
  onLogo,
}: {
  source: AiSource;
  prompt: string;
  css: string;
  onSource: (next: AiSource) => void;
  onPrompt: (next: string) => void;
  onCss: (next: string) => void;
  onLogo: (file: File | null) => void;
}) {
  const logoId = useId();

  return (
    <>
      <StudioSegmented
        label="Generate from"
        value={source}
        options={sources}
        onChange={onSource}
      />

      {source === "prompt" ? (
        <TextArea
          label="Prompt"
          value={prompt}
          onChange={onPrompt}
          rows={3}
          placeholder="Calm fintech dashboard, soft corners, #1a6b5c"
        />
      ) : null}

      {source === "css" ? (
        <TextArea
          label="CSS or Tailwind theme"
          value={css}
          onChange={onCss}
          rows={4}
          placeholder="Paste Tailwind theme or :root CSS variables"
          textAreaClassName="font-mono text-xs"
        />
      ) : null}

      {source === "logo" ? (
        <div className="space-y-1.5">
          <label
            htmlFor={logoId}
            className="block text-sm font-medium text-foreground"
          >
            Logo image
          </label>
          <input
            id={logoId}
            type="file"
            accept="image/*"
            onChange={(event) => onLogo(event.target.files?.[0] ?? null)}
            className="block w-full text-sm text-muted-foreground file:mr-3 file:min-h-10 file:rounded-[var(--kp-radius-md)] file:border file:border-border file:bg-surface file:px-3 file:text-foreground"
          />
        </div>
      ) : null}
    </>
  );
}
