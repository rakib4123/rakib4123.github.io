import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Hovering one row of a list dims its siblings, so the eye stays on it. */
export const listRow =
  "rounded-2xl p-5 transition-all duration-300 lg:group-hover/list:opacity-50 lg:hover:bg-surface lg:hover:opacity-100! lg:hover:shadow-[0_20px_40px_-24px_rgba(14,18,32,0.25)]";
