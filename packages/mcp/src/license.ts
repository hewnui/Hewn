import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { dirname, join } from "path";

/**
 * Legacy stub key shape. Keys matching this pattern no longer unlock Pro —
 * payment verification is deferred and access stays fail-closed.
 */
export const STUB_LICENSE_RE = /^kp_(test|live)_[a-zA-Z0-9]{16,}$/;

export type LicenseAccess = {
  proUnlocked: boolean;
  source: "env" | "file" | "none";
  /** Redacted key hint for status messages. */
  hint?: string;
};

export type CredentialsFile = {
  licenseKey: string;
  updatedAt: string;
};

export function credentialsPath(
  home = process.env.HOME ?? homedir(),
): string {
  return join(home, ".config", "hewn", "credentials.json");
}

export function isStubLicenseKey(key: string): boolean {
  return STUB_LICENSE_RE.test(key.trim());
}

export function redactKey(key: string): string {
  const trimmed = key.trim();
  if (trimmed.length < 12) return "****";
  return `${trimmed.slice(0, 8)}…${trimmed.slice(-4)}`;
}

export function readCredentialsFile(
  path = credentialsPath(),
): CredentialsFile | null {
  if (!existsSync(path)) return null;
  try {
    const raw = JSON.parse(readFileSync(path, "utf8")) as CredentialsFile;
    if (typeof raw.licenseKey !== "string" || raw.licenseKey.length === 0) {
      return null;
    }
    return raw;
  } catch {
    return null;
  }
}

export function writeCredentialsFile(
  licenseKey: string,
  path = credentialsPath(),
): void {
  mkdirSync(dirname(path), { recursive: true });
  const body: CredentialsFile = {
    licenseKey: licenseKey.trim(),
    updatedAt: new Date().toISOString(),
  };
  writeFileSync(path, `${JSON.stringify(body, null, 2)}\n`, { mode: 0o600 });
}

/**
 * Resolve Pro access status. Env wins, then credentials file, but stub keys
 * never unlock Pro for 0.1.0 — access stays fail-closed until payments ship.
 */
export function resolveLicenseAccess(opts?: {
  envKey?: string | undefined;
  filePath?: string;
}): LicenseAccess {
  const envKey = opts?.envKey ?? process.env.HEWN_LICENSE_KEY;
  if (typeof envKey === "string" && envKey.trim().length > 0) {
    return { proUnlocked: false, source: "env", hint: redactKey(envKey) };
  }

  const file = readCredentialsFile(opts?.filePath ?? credentialsPath());
  if (file) {
    return {
      proUnlocked: false,
      source: "file",
      hint: redactKey(file.licenseKey),
    };
  }

  return { proUnlocked: false, source: "none" };
}
