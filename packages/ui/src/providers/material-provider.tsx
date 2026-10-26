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

export type MaterialMode = "solid" | "glass";

type MaterialContextValue = {
  material: MaterialMode;
  setMaterial: (material: MaterialMode) => void;
};

const MaterialContext = createContext<MaterialContextValue | null>(null);
const STORAGE_KEY = "kp-material";

export function MaterialProvider({
  children,
  defaultMaterial = "glass",
}: {
  children: ReactNode;
  defaultMaterial?: MaterialMode;
}) {
  const [material, setMaterialState] =
    useState<MaterialMode>(defaultMaterial);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "solid" || stored === "glass") {
      setMaterialState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.material = material;
    localStorage.setItem(STORAGE_KEY, material);
  }, [material]);

  const setMaterial = useCallback((next: MaterialMode) => {
    setMaterialState(next);
  }, []);

  const value = useMemo(
    () => ({ material, setMaterial }),
    [material, setMaterial],
  );

  return (
    <MaterialContext.Provider value={value}>
      {children}
    </MaterialContext.Provider>
  );
}

const fallbackMaterial: MaterialContextValue = {
  material: "glass",
  setMaterial: () => {},
};

/**
 * Reads material from MaterialProvider when present.
 * Outside a provider, defaults to `glass` so components still render.
 */
export function useMaterial(): MaterialContextValue {
  return useContext(MaterialContext) ?? fallbackMaterial;
}
