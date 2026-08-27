import { notFound } from "next/navigation";
import { getCities, getCity, getPlaces, getRoutes } from "@/lib/content";
import { PlaceGrid } from "@/components/PlaceGrid";
import { RouteTeaser } from "@/components/RouteTeaser";

export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map((c) => ({ slug: c.slug }));
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = await getCity(slug);
  if (!city) notFound();

  const [places, routes] = await Promise.all([getPlaces(slug), getRoutes(slug)]);

  return (
    <div>
      <div style={{ position: "relative", height: 190, margin: "0 60px", marginTop: 24, borderRadius: 8, overflow: "hidden" }}>
        {city.heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={city.heroImage}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }}
          />
        )}
        {/* Duotone approximation — Figma's hero band uses a pre-toned source
            image we can't download; grayscale + a multiply overlay in the
            brand green gets the same two-tone treatment from the real photo. */}
        <div style={{ position: "absolute", inset: 0, background: "var(--bv-green-deep)", mixBlendMode: "multiply", opacity: 0.7 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,12,10,0) 45%, rgba(13,12,10,0.4) 100%)" }} />
      </div>

      <div className="wrap" style={{ paddingTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 34 }}>{city.name}</h1>
            <p style={{ fontSize: 13, color: "var(--bv-text-tertiary)", marginTop: 6 }}>{city.placeCount} Places</p>
          </div>
          <span
            style={{
              padding: "7px 14px",
              borderRadius: 100,
              background: "var(--bv-bg-wash)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--bv-text-tertiary)",
            }}
          >
            Updated {city.updated}
          </span>
        </div>

        <p style={{ fontSize: 14, color: "var(--bv-text-secondary)", lineHeight: 1.7, maxWidth: 900, marginBottom: 32 }}>
          {city.description}
        </p>

        <PlaceGrid places={places} />

        {routes.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <p className="eyebrow" style={{ marginBottom: 8 }}>Don&rsquo;t want to plan it</p>
            <h2 style={{ fontSize: 28, marginBottom: 24 }}>Follow a Route Instead</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              {routes.map((route) => (
                <RouteTeaser key={route.slug} route={route} backgroundImage={city.heroImage} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ height: 64 }} />
    </div>
  );
}
