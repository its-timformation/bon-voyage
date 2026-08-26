import Link from "next/link";
import { City } from "@/lib/types";

export function CityTeaser({ city, index }: { city: City; index: number }) {
  return (
    <Link
      href={`/city/${city.slug}`}
      style={{ display: "flex", flexDirection: "column", borderRadius: 5, overflow: "hidden", border: "1px solid var(--bv-border-subtle)" }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "303 / 200",
          background: city.heroImage ? undefined : "var(--bv-category-discover-solid)",
        }}
      >
        {city.heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={city.heroImage} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(25,47,29,0.15) 0%, rgba(25,47,29,0.75) 100%)",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 14,
            left: 14,
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
        <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, color: "var(--bv-text-on-inverse)" }}>
          <div style={{ fontFamily: "Cooper Black, IBM Plex Mono, monospace", fontSize: 22 }}>{city.name}</div>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.85 }}>
            {city.placeCount} Places
          </div>
        </div>
      </div>
      <div style={{ padding: 16, background: "var(--bv-bg-raised)", fontSize: 13, color: "var(--bv-text-secondary)" }}>
        {city.teaserLine}
      </div>
    </Link>
  );
}
