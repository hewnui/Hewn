"use client";

import { useDeferMount } from "@/components/use-defer-mount";
import { ListIcon } from "@phosphor-icons/react/dist/csr/List";
import dynamic from "next/dynamic";
import { useState } from "react";

const HomeNavMobile = dynamic(
  () =>
    import("@/components/home/home-nav-mobile").then((m) => m.HomeNavMobile),
  { ssr: false },
);

function HomeNavMobileShell({ onActivate }: { onActivate: () => void }) {
  return (
    <button
      type="button"
      aria-label="Open menu"
      onClick={onActivate}
      className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-[color,background-color,transform] hover:bg-muted/50 hover:text-foreground active:scale-[0.96] lg:hidden"
    >
      <ListIcon aria-hidden className="size-5" />
    </button>
  );
}

/** Mobile menu — Motion/icons load after idle or first tap. */
export function HomeNavMobileDeferred() {
  const idleReady = useDeferMount();
  const [forced, setForced] = useState(false);
  const ready = idleReady || forced;

  if (!ready) {
    return <HomeNavMobileShell onActivate={() => setForced(true)} />;
  }
  return <HomeNavMobile />;
}
