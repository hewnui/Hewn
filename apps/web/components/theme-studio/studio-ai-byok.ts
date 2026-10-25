const BYOK_KEY = "kp-theme-studio-byok";

export type ByokSettings = {
  apiKey: string;
  baseUrl: string;
  model: string;
};

export const DEFAULT_BYOK: ByokSettings = {
  apiKey: "",
  baseUrl: "https://api.openai.com/v1",
  model: "gpt-4o-mini",
};

export function loadByok(): ByokSettings {
  if (typeof window === "undefined") return DEFAULT_BYOK;
  try {
    const raw = localStorage.getItem(BYOK_KEY);
    if (!raw) return DEFAULT_BYOK;
    const parsed = JSON.parse(raw) as Partial<ByokSettings>;
    return {
      apiKey: typeof parsed.apiKey === "string" ? parsed.apiKey : "",
      baseUrl:
        typeof parsed.baseUrl === "string" && parsed.baseUrl.length > 0
          ? parsed.baseUrl
          : DEFAULT_BYOK.baseUrl,
      model:
        typeof parsed.model === "string" && parsed.model.length > 0
          ? parsed.model
          : DEFAULT_BYOK.model,
    };
  } catch {
    return DEFAULT_BYOK;
  }
}

export function saveByok(settings: ByokSettings) {
  localStorage.setItem(BYOK_KEY, JSON.stringify(settings));
}

const SYSTEM = `You propose Hewn theme overrides. Reply with JSON only:
{"basePackId":"forest|tide|graphite|dune|clay|ember","accentSeed":"#rrggbb","radiusPreset":"sharp|soft|rounded|pill"}
Prefer curated pack mood. Never invent extra keys.`;

export async function requestAiProposal(
  settings: ByokSettings,
  userPrompt: string,
): Promise<{ ok: true; raw: unknown } | { ok: false; error: string }> {
  if (!settings.apiKey.trim()) {
    return { ok: false, error: "Add a BYOK API key, or generate without AI." };
  }
  const endpoint = `${settings.baseUrl.replace(/\/$/, "")}/chat/completions`;
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: settings.model,
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: userPrompt },
        ],
      }),
    });
  } catch {
    return {
      ok: false,
      error: "Network error calling the model endpoint (browser CORS may block some hosts).",
    };
  }
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    return {
      ok: false,
      error: `Model HTTP ${response.status}${text ? `: ${text.slice(0, 160)}` : ""}`,
    };
  }
  const body = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = body.choices?.[0]?.message?.content;
  if (!content) return { ok: false, error: "Empty model response" };
  try {
    return { ok: true, raw: JSON.parse(content) as unknown };
  } catch {
    return { ok: false, error: "Model did not return valid JSON" };
  }
}
