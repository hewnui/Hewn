"use client";

import {
  extractColorsFromCss,
  parseAiProposal,
  proposeFromPalette,
  proposeFromPrompt,
  type BasePackId,
  type RadiusPreset,
  type ThemeProposal,
} from "@hewnui/themes/authoring";
import { Button } from "@hewnui/ui";
import { useEffect, useState } from "react";
import {
  DEFAULT_BYOK,
  loadByok,
  requestAiProposal,
  type ByokSettings,
} from "./studio-ai-byok";
import { StudioAiByokForm } from "./studio-ai-byok-form";
import { extractLogoPalette } from "./studio-ai-logo";
import { StudioAiInputs, type AiSource } from "./studio-ai-inputs";

export function StudioAi({
  embedded = false,
  onApply,
}: {
  embedded?: boolean;
  onApply: (next: {
    basePackId: BasePackId;
    accentSeed: string;
    radiusPreset: RadiusPreset;
  }) => void;
}) {
  const [source, setSource] = useState<AiSource>("prompt");
  const [prompt, setPrompt] = useState("");
  const [css, setCss] = useState("");
  const [byok, setByok] = useState<ByokSettings>(DEFAULT_BYOK);
  const [useModel, setUseModel] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setByok(loadByok());
  }, []);

  function applyProposal(proposal: ThemeProposal, extra?: string) {
    onApply({
      basePackId: proposal.basePackId,
      accentSeed: proposal.accentSeed,
      radiusPreset: proposal.radiusPreset,
    });
    setStatus([extra, ...proposal.notes].filter(Boolean).join(" · "));
  }

  async function generate() {
    setBusy(true);
    setStatus(null);
    try {
      if (source === "css") {
        const proposal = proposeFromPalette(extractColorsFromCss(css), css);
        if (!proposal) {
          setStatus("No colors found in CSS / Tailwind input.");
          return;
        }
        applyProposal(proposal);
        return;
      }
      if (source === "logo") {
        setStatus("Choose a logo file first.");
        return;
      }
      if (useModel && byok.apiKey.trim()) {
        const result = await requestAiProposal(byok, prompt);
        if (!result.ok) {
          setStatus(`${result.error} Falling back to offline heuristics.`);
          applyProposal(proposeFromPrompt(prompt), "Offline fallback");
          return;
        }
        const parsed = parseAiProposal(result.raw);
        if ("error" in parsed) {
          setStatus(`AI invalid (${parsed.error}). Offline fallback.`);
          applyProposal(proposeFromPrompt(prompt));
          return;
        }
        applyProposal(parsed, "BYOK model");
        return;
      }
      applyProposal(
        proposeFromPrompt(prompt),
        useModel ? "No API key — offline heuristics" : "Offline heuristics",
      );
    } finally {
      setBusy(false);
    }
  }

  async function onLogo(file: File | null) {
    if (!file) return;
    setBusy(true);
    setStatus(null);
    try {
      const colors = await extractLogoPalette(file);
      const proposal = proposeFromPalette(colors, file.name);
      if (!proposal) {
        setStatus("Could not read palette from that image.");
        return;
      }
      applyProposal(proposal, `Logo · ${colors.length} swatches`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className={
        embedded
          ? "space-y-4"
          : "space-y-4 rounded-[var(--kp-radius-md)] border border-border bg-surface/60 p-4"
      }
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          AI generate
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Prompt, CSS, or logo → validated pack. BYOK optional; key stays local.
        </p>
      </div>

      <StudioAiInputs
        source={source}
        prompt={prompt}
        css={css}
        onSource={setSource}
        onPrompt={setPrompt}
        onCss={setCss}
        onLogo={(file) => void onLogo(file)}
      />

      {source === "prompt" ? (
        <StudioAiByokForm
          byok={byok}
          useModel={useModel}
          onByok={setByok}
          onUseModel={setUseModel}
        />
      ) : null}

      {source !== "logo" ? (
        <Button isDisabled={busy} onPress={() => void generate()}>
          {busy ? "Generating…" : "Generate pack"}
        </Button>
      ) : null}

      {status ? (
        <p className="text-sm text-muted-foreground" role="status">
          {status}
        </p>
      ) : null}
    </div>
  );
}
