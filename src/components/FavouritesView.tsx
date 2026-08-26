"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Place } from "@/lib/types";
import { categoryPills } from "@/data/seed";
import { useFavourites } from "@/lib/favourites-context";
import { RecommendationCard } from "./RecommendationCard";

function FilterRow({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: readonly string[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--bv-text-tertiary)", width: 64 }}>
        {label}
      </span>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {options.map((opt) => {
          const isActive = opt === active;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              style={{
                padding: "6px 13px",
                borderRadius: 100,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                border: isActive ? "none" : "1px solid var(--bv-pill-note-border)",
                background: isActive ? "var(--bv-text-primary)" : "var(--bv-pill-note-bg)",
                color: isActive ? "var(--bv-text-on-solid)" : "var(--bv-pill-note-text)",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function FavouritesView({ allPlaces }: { allPlaces: Place[] }) {
  const { favourites, hydrated } = useFavourites();
  const [category, setCategory] = useState<string>("All");
  const [city, setCity] = useState<string>("All");

  const cityOptions = useMemo(() => ["All", ...Array.from(new Set(allPlaces.map((p) => p.city)))], [allPlaces]);

  const favouritedPlaces = useMemo(
    () => allPlaces.filter((p) => favourites.includes(p.slug)),
    [allPlaces, favourites]
  );

  const filtered = useMemo(
    () =>
      favouritedPlaces
        .filter((p) => category === "All" || p.category === category)
        .filter((p) => city === "All" || p.city === city),
    [favouritedPlaces, category, city]
  );

  if (!hydrated) {
    // Avoid flashing an incorrect empty-state before localStorage has been read.
    return null;
  }

  return (
    <div>
      <FilterRow label="Category" options={categoryPills} active={category} onChange={setCategory} />
      <FilterRow label="City" options={cityOptions} active={city} onChange={setCity} />
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
