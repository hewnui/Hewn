"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const radiusScales = ["sharp", "soft", "rounded", "pill"] as const;
export type RadiusScale = (typeof radiusScales)[number];

const radiusTokens: Record<
  Exclude<RadiusScale, "soft">,
  { sm: string; md: string; lg: string; panel: string }
> = {
  sharp: {
    sm: "0.125rem",
    md: "0.2rem",
    lg: "0.3rem",
    panel: "0.25rem",
  },
  rounded: {
    sm: "0.85rem",
    md: "1.15rem",
    lg: "1.5rem",
    panel: "1.25rem",
  },
  pill: {
    sm: "9999px",
    md: "9999px",
    lg: "1.5rem",
    panel: "1.15rem",
  },
};

const radiusVars = [
  "--kp-radius-sm",
  "--kp-radius-md",
  "--kp-radius-lg",
  "--kp-radius-panel",
] as const;

type RadiusContextValue = {
  radius: RadiusScale;
  setRadius: (radius: RadiusScale) => void;
};

const RadiusContext = createContext<RadiusContextValue | null>(null);
const STORAGE_KEY = "kp-radius";

function isRadius(value: string): value is RadiusScale {
  return (radiusScales as readonly string[]).includes(value);
}

function applyRadiusTokens(radius: RadiusScale) {
  const root = document.documentElement;
  root.dataset.radius = radius;

  if (radius === "soft") {
    for (const key of radiusVars) root.style.removeProperty(key);
    return;
  }

  const tokens = radiusTokens[radius];
  root.style.setProperty("--kp-radius-sm", tokens.sm);
  root.style.setProperty("--kp-radius-md", tokens.md);
  root.style.setProperty("--kp-radius-lg", tokens.lg);
  root.style.setProperty("--kp-radius-panel", tokens.panel);
}

export function RadiusProvider({
  children,
  defaultRadius = "soft",
}: {
  children: ReactNode;
  defaultRadius?: RadiusScale;
}) {
  const [radius, setRadiusState] = useState<RadiusScale>(defaultRadius);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isRadius(stored)) setRadiusState(stored);
  }, []);

  useEffect(() => {
    applyRadiusTokens(radius);
    localStorage.setItem(STORAGE_KEY, radius);
  }, [radius]);

  const setRadius = useCallback((next: RadiusScale) => {
    setRadiusState(next);
  }, []);

  const value = useMemo(
    () => ({ radius, setRadius }),
    [radius, setRadius],
  );

  return (
    <RadiusContext.Provider value={value}>{children}</RadiusContext.Provider>
  );
}

const fallbackRadius: RadiusContextValue = {
  radius: "soft",
  setRadius: () => {},
};

/**
 * Reads radius scale from RadiusProvider when present.
 * Outside a provider, defaults to `soft` (theme token defaults).
 */
export function useRadius(): RadiusContextValue {
  return useContext(RadiusContext) ?? fallbackRadius;
}
