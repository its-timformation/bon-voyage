import Link from "next/link";
import { City } from "@/lib/types";

// City Teaser Group (Figma 1245:4131, real Home instance 1245:4132) — a
// single fixed-height photo card with everything (eyebrow, title, place
// count, hairline, description) overlaid on the photo. There is no separate
// caption panel below the image in Figma's real design — that was the bug:
// a below-image panel whose height varied with how the description wrapped,
// which is why the cards were rendering at different heights.
export function CityTeaser({ city, index }: { city: City; index: number }) {
  return (
    <Link
      href={`/city/${city.slug}`}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 235,
        borderRadius: 5,
        overflow: "hidden",
        padding: 16,
        background: city.heroImage ? undefined : "var(--bv-category-discover-solid)",
      }}
    >
      {city.heroImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={city.heroImage}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(25,47,29,0.08) 0%, rgba(25,47,29,0.82) 100%)",
        }}
      />
      <span
        style={{
          position: "relative",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--bv-text-on-inverse)",
          opacity: 0.75,
        }}
      >
        No. {String(index + 1).padStart(2, "0")} · Updated {city.updated}
      </span>
      <div style={{ position: "relative", color: "var(--bv-text-on-inverse)" }}>
        <div style={{ fontFamily: "Cooper Black, IBM Plex Mono, monospace", fontSize: 26 }}>{city.name}</div>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.85, marginTop: 2 }}>
          {city.placeCount} Places
        </div>
        <hr style={{ border: "none", borderTop: "1px solid rgba(250,246,236,0.25)", margin: "10px 0" }} />
        <div style={{ fontSize: 14, lineHeight: 1.4, opacity: 0.92, minHeight: 36 }}>{city.teaserLine}</div>
      </div>
    </Link>
  );
}
