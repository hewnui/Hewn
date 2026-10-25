declare module "fs" {
  export function readFileSync(
    path: string,
    options: { encoding: BufferEncoding } | BufferEncoding,
  ): string;
}

declare module "path" {
  export function dirname(path: string): string;
  export function resolve(...paths: string[]): string;
}

declare module "url" {
  export function fileURLToPath(url: string | URL): string;
}

type BufferEncoding =
  | "ascii"
  | "utf8"
  | "utf-8"
  | "utf16le"
  | "ucs2"
  | "ucs-2"
  | "base64"
  | "base64url"
  | "latin1"
  | "binary"
  | "hex";
