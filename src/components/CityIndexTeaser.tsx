import Link from "next/link";
import { City } from "@/lib/types";

// City Index Teaser (Figma 1270:6125 / real Belfast instance 1270:6126) —
// a DIFFERENT layout from the Home page's City Teaser Group: image on the
// left, a plain white info card on the right with a "See the Guide" action,
// instead of text overlaid on the photo. The Cities Index page was wrongly
// reusing the Home component before this — that's the "cards are not the
// ones designed in Figma" bug.
export function CityIndexTeaser({ city, index }: { city: City; index: number }) {
  return (
    <Link
      href={`/city/${city.slug}`}
      style={{
        display: "flex",
        borderRadius: 6,
        overflow: "hidden",
        border: "1px solid var(--bv-border-subtle)",
        height: 220,
      }}
    >
      <div
        style={{
          position: "relative",
          flex: "0 0 42%",
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
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 24,
          background: "var(--bv-bg-raised)",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--bv-text-tertiary)",
              marginBottom: 6,
            }}
          >
            No. {String(index + 1).padStart(2, "0")} · Updated {city.updated}
          </p>
          <div style={{ fontFamily: "Cooper Black, IBM Plex Mono, monospace", fontSize: 26, color: "var(--bv-text-primary)" }}>
            {city.name}
          </div>
          <p style={{ fontSize: 13, color: "var(--bv-text-secondary)", marginTop: 2 }}>{city.placeCount} Places</p>
        </div>
        <div>
          <hr className="hairline" style={{ marginBottom: 12 }} />
          <p style={{ fontSize: 14, color: "var(--bv-text-secondary)", lineHeight: 1.5, marginBottom: 16 }}>
            {city.teaserLine}
          </p>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--bv-action-primary)",
            }}
          >
            See the Guide
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 6h8M6.5 2.5 10 6l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
