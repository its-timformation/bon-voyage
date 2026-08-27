"use client";

import { useState, useRef } from "react";
import { useFavourites } from "@/lib/favourites-context";
import styles from "./FavouriteButton.module.css";

// The Favourite control from the Recommendation Card (Figma node 1275:9418,
// "Fav State=Default" / "Fav State=Active") — a 30px white circle, top right
// of the card's photo. This is the "delightful interaction when clicked"
// piece: saving fires a quick bounce plus a small burst of particles;
// un-saving is deliberately calmer (just a soft shrink) so removing
// something never feels like a celebration.

const PARTICLE_COUNT = 6;

export function FavouriteButton({
  slug,
  name,
  size = 30,
}: {
  slug: string;
  name: string;
  size?: number;
}) {
  const { isFavourite, toggleFavourite, hydrated } = useFavourites();
  const active = isFavourite(slug);
  const [bursting, setBursting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const willBeActive = !active;
    toggleFavourite(slug);
    if (willBeActive) {
      setBursting(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setBursting(false), 620);
    }
  }

  return (
    <button
      type="button"
      className={`${styles.btn} ${active ? styles.active : ""} ${bursting ? styles.bursting : ""}`}
      style={{ width: size, height: size }}
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from favourites` : `Add ${name} to favourites`}
      // Suppress the very first paint's active state flashing before
      // localStorage has been read (hydrated=false) — renders as
      // not-yet-decided rather than always defaulting to "off".
      data-hydrated={hydrated}
    >
      <svg viewBox="0 0 20 20" width={size * 0.62} height={size * 0.62} className={styles.heart} aria-hidden="true">
        <path
          d="M10 17.2s-6.6-4.06-9-8.02C-0.5 6 1 2.6 4.4 2.1c1.9-.27 3.6.7 4.6 2.2 1-1.5 2.7-2.47 4.6-2.2 3.4.5 4.9 3.9 3.4 7.08-2.4 3.96-9 8.02-9 8.02z"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      {bursting && (
        <span className={styles.particles} aria-hidden="true">
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
            <span
              key={i}
              className={styles.particle}
              style={{ ["--angle" as string]: `${(360 / PARTICLE_COUNT) * i}deg` }}
            />
          ))}
        </span>
      )}
    </button>
  );
}
