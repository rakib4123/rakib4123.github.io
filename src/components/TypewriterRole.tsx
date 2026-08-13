"use client";

import { useEffect, useState } from "react";

const roles = [
  "an AI/ML Engineer",
  "a Computer Vision Engineer",
  "a Data Scientist",
  "a Software Developer",
];

const TYPE_SPEED = 70;
const DELETE_SPEED = 35;
const PAUSE_AFTER_TYPE = 1600;
const PAUSE_AFTER_DELETE = 300;

export default function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting && text === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === "") {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, PAUSE_AFTER_DELETE);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => setText(currentRole.slice(0, text.length + (isDeleting ? -1 : 1))),
      isDeleting ? DELETE_SPEED : TYPE_SPEED
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <span className="inline-flex items-center">
      <span className="text-brand-cyan font-semibold">{text}</span>
      <span
        className="w-[2px] h-[1em] bg-brand-cyan ml-1 animate-pulse"
        aria-hidden="true"
      />
    </span>
  );
}
