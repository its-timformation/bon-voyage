"use client";

import { useMemo, useState } from "react";
import { Place } from "@/lib/types";
import { categoryPills } from "@/data/seed";
import { RecommendationCard } from "./RecommendationCard";

// Category Filter (Figma 1270:6301) + the Recommendation Group grid it
// filters. Client-side only — the full place list for the city/favourites
// page is already on the page, this just shows/hides by category.
export function PlaceGrid({ places }: { places: Place[] }) {
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(
    () => (active === "All" ? places : places.filter((p) => p.category === active)),
    [places, active]
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 8, paddingBottom: 16, flexWrap: "wrap" }}>
        {categoryPills.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "7px 14px",
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                border: isActive ? "none" : "1px solid var(--bv-pill-note-border)",
                background: isActive ? "var(--bv-text-primary)" : "var(--bv-pill-note-bg)",
                color: isActive ? "var(--bv-text-on-solid)" : "var(--bv-pill-note-text)",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
      <hr className="hairline" style={{ marginBottom: 24 }} />
      {filtered.length === 0 ? (
        <p style={{ color: "var(--bv-text-tertiary)", padding: "24px 0" }}>Nothing filed under &ldquo;{active}&rdquo; here yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {filtered.map((place) => (
            <RecommendationCard key={place.slug} place={place} />
          ))}
        </div>
      )}
    </div>
  );
}
