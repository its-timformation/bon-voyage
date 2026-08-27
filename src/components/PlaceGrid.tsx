"use client";

import { useMemo, useState } from "react";
import { Place } from "@/lib/types";
import { categoryPills } from "@/data/seed";
import { RecommendationCard } from "./RecommendationCard";
import { CategoryFilterPill } from "./Badges";

// Category Filter (Figma 1270:6301) + the Recommendation Group grid it
// filters. Multi-select: any number of categories can be active at once —
// "All" is its own toggle that clears the selection back to showing
// everything, rather than being just one more option in the set.
export function PlaceGrid({ places }: { places: Place[] }) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(cat: string) {
    if (cat === "All") {
      setSelected([]);
      return;
    }
    setSelected((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  }

  const filtered = useMemo(
    () => (selected.length === 0 ? places : places.filter((p) => selected.includes(p.category))),
    [places, selected]
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 8, paddingBottom: 16, flexWrap: "wrap" }}>
        {categoryPills.map((cat) => (
          <CategoryFilterPill
            key={cat}
            label={cat}
            active={cat === "All" ? selected.length === 0 : selected.includes(cat)}
            onClick={() => toggle(cat)}
          />
        ))}
      </div>
      <hr className="hairline" style={{ marginBottom: 24 }} />
      {filtered.length === 0 ? (
        <p style={{ color: "var(--bv-text-tertiary)", padding: "24px 0" }}>Nothing filed under that filter here yet.</p>
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
