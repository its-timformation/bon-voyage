"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Context-aware back control. Figma's Place frame shows a generic "Back to
// {City}" link, but the user needs two behaviours that aren't a single
// static href: (1) from Favourites, it should read "Back to Favourites",
// and (2) wherever it's clicked from, it should return the user to that
// exact previous scroll position/state, not always jump to the city page.
// router.back() handles (2); reading document.referrer handles (1) without
// needing to thread "came from" state through every link to this page.
export function BackLink({ fallbackHref, fallbackLabel }: { fallbackHref: string; fallbackLabel: string }) {
  const router = useRouter();
  const [label, setLabel] = useState(fallbackLabel);

  useEffect(() => {
    const ref = document.referrer;
    if (!ref) return;
    try {
      const path = new URL(ref).pathname;
      if (path.startsWith("/favourites")) {
        setLabel("Back to Favourites");
      }
    } catch {
      // unparsable referrer — keep the fallback label
    }
  }, []);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  return (
    <a
      href={fallbackHref}
      onClick={handleClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--bv-text-tertiary)",
        marginBottom: 24,
      }}
    >
      ← {label}
    </a>
  );
}
