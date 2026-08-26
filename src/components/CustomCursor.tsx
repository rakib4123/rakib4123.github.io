"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const crosshairRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("custom-cursor-active");

    const handleMove = (e: MouseEvent) => {
      if (crosshairRef.current) {
        crosshairRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button']"
      );
      crosshairRef.current?.classList.toggle("cursor-crosshair-active", !!interactive);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, []);

  return (
    <div ref={crosshairRef} className="cursor-crosshair" aria-hidden="true">
      <span className="crosshair-line crosshair-top" />
      <span className="crosshair-line crosshair-bottom" />
      <span className="crosshair-line crosshair-left" />
      <span className="crosshair-line crosshair-right" />
    </div>
  );
}
