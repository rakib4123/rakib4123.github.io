"use client";

import { ReactNode, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

/**
 * Renders overlays on document.body.
 *
 * Full-screen overlays must not live inside a transformed ancestor (every
 * scroll-reveal and hover-tilt wrapper is one): a transform makes `fixed
 * inset-0` size itself to that ancestor instead of the viewport. A portal
 * puts them outside all of that.
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
