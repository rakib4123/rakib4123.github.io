"use client";

import { ReactNode, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

/**
 * Renders overlays on document.body.
 *
 * Full-screen overlays must not live inside `.scene-layer`: that wrapper sets
 * `pointer-events: none` and its section rule forces `position: relative` on
 * child divs, which silently collapsed `fixed inset-0` overlays to zero height.
 * A portal puts them outside all of that.
 */

const noopSubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export default function Portal({ children }: { children: ReactNode }) {
  const isClient = useIsClient();
  if (!isClient) return null;
  return createPortal(children, document.body);
}
