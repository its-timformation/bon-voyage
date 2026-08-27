"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Place } from "@/lib/types";
import { categoryPills } from "@/data/seed";
import { useFavourites } from "@/lib/favourites-context";
import { RecommendationCard } from "./RecommendationCard";
import { CategoryFilterPill } from "./Badges";

function FilterRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--bv-text-tertiary)",
          width: 64,
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{children}</div>
    </div>
  );
}

// Category filter is multi-select (same Figma Pill component + colours as
// PlaceGrid's — see Badges.tsx CategoryFilterPill). City stays single-select,
// the user only flagged Category for multi-select, but it now shares the
// same pill styling instead of the old plain cream/dark treatment.
export function FavouritesView({ allPlaces }: { allPlaces: Place[] }) {
  const { favourites, hydrated } = useFavourites();
  const [categories, setCategories] = useState<string[]>([]);
  const [city, setCity] = useState<string>("All");

  const cityOptions = useMemo(() => ["All", ...Array.from(new Set(allPlaces.map((p) => p.city)))], [allPlaces]);

  function toggleCategory(cat: string) {
    if (cat === "All") {
      setCategories([]);
      return;
    }
    setCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  }

  const favouritedPlaces = useMemo(
    () => allPlaces.filter((p) => favourites.includes(p.slug)),
    [allPlaces, favourites]
  );

  const filtered = useMemo(
    () =>
      favouritedPlaces
        .filter((p) => categories.length === 0 || categories.includes(p.category))
        .filter((p) => city === "All" || p.city === city),
    [favouritedPlaces, categories, city]
  );

  if (!hydrated) {
    // Avoid flashing an incorrect empty-state before localStorage has been read.
    return null;
  }

  return (
    <div>
      <FilterRow label="Category">
        {categoryPills.map((cat) => (
          <CategoryFilterPill
            key={cat}
            label={cat}
            active={cat === "All" ? categories.length === 0 : categories.includes(cat)}
            onClick={() => toggleCategory(cat)}
          />
        ))}
      </FilterRow>
      <FilterRow label="City">
        {cityOptions.map((opt) => (
          <CategoryFilterPill key={opt} label={opt} active={opt === city} onClick={() => setCity(opt)} />
        ))}
      </FilterRow>
      <hr className="hairline" style={{ margin: "16px 0 24px" }} />

      {favouritedPlaces.length === 0 ? (
        <div style={{ padding: "64px 0", textAlign: "center", color: "var(--bv-text-tertiary)" }}>
          <p style={{ fontSize: 15, marginBottom: 8 }}>Nothing saved yet.</p>
          <p style={{ fontSize: 13 }}>
            Tap the heart on any place to add it here — start with{" "}
            <Link href="/cities" style={{ color: "var(--bv-action-link)", textDecoration: "underline" }}>
              the cities
            </Link>
            .
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <p style={{ color: "var(--bv-text-tertiary)", padding: "24px 0" }}>No saved places match that filter.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {filtered.map((place) => (
            <RecommendationCard key={place.slug} place={place} />
          ))}
        </div>
      )}
    </div>
  );
}
