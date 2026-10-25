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

export function ThemeProvider({
  children,
  defaultTheme = "forest",
  defaultMode = "light",
}: {
  children: ReactNode;
  defaultTheme?: ThemeName;
  defaultMode?: ThemeMode;
}) {
  const [theme, setThemeState] = useState<ThemeName>(defaultTheme);
  const [mode, setModeState] = useState<ThemeMode>(
    normalizeMode(defaultTheme, defaultMode),
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    const storedMode = localStorage.getItem(MODE_KEY);
    const nextTheme =
      storedTheme && isTheme(storedTheme) ? storedTheme : defaultTheme;
    const parsedMode: ThemeMode =
      storedMode === "dark" || storedMode === "light"
        ? storedMode
        : defaultMode;
    const nextMode = normalizeMode(nextTheme, parsedMode);
    setThemeState(nextTheme);
    setModeState(nextMode);
  }, [defaultMode, defaultTheme]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.mode = mode;
    root.classList.toggle("dark", mode === "dark");
    root.style.colorScheme = mode;
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem(MODE_KEY, mode);
  }, [mode, theme]);

  const setTheme = useCallback((nextTheme: ThemeName) => {
    setThemeState(nextTheme);
    setModeState((current) => normalizeMode(nextTheme, current));
  }, []);

  const setMode = useCallback(
    (nextMode: ThemeMode) => {
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
