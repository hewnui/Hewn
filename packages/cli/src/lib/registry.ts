import { DEFAULT_SITE_URL } from "./default-site-url.js";

/** Registry origin — same as the canonical site URL unless overridden. */
export const DEFAULT_REGISTRY_URL = DEFAULT_SITE_URL;

export type Fetcher = (url: string) => Promise<unknown>;

export type RegistryFilePayload = { path: string; content: string };

export type RegistryIndexPayload = {
  version: number;
  items: { name: string; internalDependencies?: string[] }[];
};

export type RegistryItemPayload = {
  name: string;
  dependencies?: string[];
  devDependencies?: string[];
  internalDependencies?: string[];
  sharedDependencies?: string[];
  files: RegistryFilePayload[];
  jsxFiles: RegistryFilePayload[];
};

export type FoundationPayload = {
  version: number;
  files: RegistryFilePayload[];
  jsxFiles: RegistryFilePayload[];
};

async function defaultFetch(url: string): Promise<unknown> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`registry request failed (${response.status}): ${url}`);
  }
  return response.json();
}

export function registryBase(configured?: string): string {
  const base =
    process.env.HEWN_REGISTRY_URL ?? configured ?? DEFAULT_REGISTRY_URL;
  return base.replace(/\/+$/, "");
}

export function createRegistryClient(base: string, fetcher: Fetcher = defaultFetch) {
  return {
    freeIndex: () =>
      fetcher(`${base}/r/index.free.json`) as Promise<RegistryIndexPayload>,
    proIndex: () =>
      fetcher(`${base}/r/index.pro.json`) as Promise<RegistryIndexPayload>,
    foundation: () =>
      fetcher(`${base}/r/foundation.json`) as Promise<FoundationPayload>,
    item: (name: string) =>
      fetcher(`${base}/r/${name}.json`) as Promise<RegistryItemPayload>,
  };
}
