"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export const themePacks = {
  forest: ["light", "dark"],
  tide: ["light", "dark"],
  graphite: ["light", "dark"],
  dune: ["light"],
  clay: ["light"],
  ember: ["dark"],
} as const;

export type ThemeName = keyof typeof themePacks;
export type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeName;
  mode: ThemeMode;
  supportedModes: readonly ThemeMode[];
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const THEME_KEY = "kp-theme";
const MODE_KEY = "kp-mode";

function isTheme(value: string): value is ThemeName {
  return value in themePacks;
}

function normalizeMode(theme: ThemeName, mode: ThemeMode): ThemeMode {
  const modes = themePacks[theme] as readonly ThemeMode[];
  return modes.includes(mode) ? mode : modes[0]!;
}

function systemMode(): ThemeMode {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyThemeToDom(theme: ThemeName, mode: ThemeMode): void {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.dataset.mode = mode;
  root.classList.toggle("dark", mode === "dark");
  root.style.colorScheme = mode;
}

export function ThemeProvider({
  children,
  defaultTheme = "forest",
  defaultMode = "light",
}: {
  children: ReactNode;
  defaultTheme?: ThemeName;
  /** SSR fallback only. With empty storage, the browser follows `prefers-color-scheme`. */
  defaultMode?: ThemeMode;
}) {
  const [theme, setThemeState] = useState<ThemeName>(defaultTheme);
  const [mode, setModeState] = useState<ThemeMode>(
    normalizeMode(defaultTheme, defaultMode),
  );
  const hydrated = useRef(false);
  const persistPreference = useRef(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    const storedMode = localStorage.getItem(MODE_KEY);
    const nextTheme =
      storedTheme && isTheme(storedTheme) ? storedTheme : defaultTheme;
    const hasStoredMode = storedMode === "dark" || storedMode === "light";
    const parsedMode: ThemeMode = hasStoredMode ? storedMode : systemMode();
    const nextMode = normalizeMode(nextTheme, parsedMode);
    if (hasStoredMode || (storedTheme && isTheme(storedTheme))) {
      persistPreference.current = true;
    }
    setThemeState(nextTheme);
    setModeState(nextMode);
    applyThemeToDom(nextTheme, nextMode);
    hydrated.current = true;
  }, [defaultTheme]);

  useEffect(() => {
    if (!hydrated.current) return;
    applyThemeToDom(theme, mode);
    if (!persistPreference.current) return;
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem(MODE_KEY, mode);
  }, [mode, theme]);

  const setTheme = useCallback((nextTheme: ThemeName) => {
    persistPreference.current = true;
    setThemeState(nextTheme);
    setModeState((current) => normalizeMode(nextTheme, current));
  }, []);

  const setMode = useCallback(
    (nextMode: ThemeMode) => {
      persistPreference.current = true;
      setModeState(normalizeMode(theme, nextMode));
    },
    [theme],
  );

  const value = useMemo(
    () => ({
      theme,
      mode,
      supportedModes: themePacks[theme] as readonly ThemeMode[],
      setTheme,
      setMode,
    }),
    [mode, setMode, setTheme, theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used within ThemeProvider");
  return value;
}
