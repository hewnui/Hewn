export type DocsMode = "soft" | "studio";

/** Soft landings vs studio-dense detail routes. */
export function getDocsMode(pathname: string): DocsMode {
  const path = pathname.replace(/\/$/, "") || "/docs";

  if (
    path === "/docs" ||
    path === "/docs/components" ||
    path === "/docs/themes"
  ) {
    return "soft";
  }

  return "studio";
}
