import { notFound } from "next/navigation";
import { getPlaces, getPlace } from "@/lib/content";
import { CategoryPill, VerdictPill } from "@/components/Badges";
import { PlaceGallery } from "@/components/PlaceGallery";
import { BackLink } from "@/components/BackLink";

export async function generateStaticParams() {
  const places = await getPlaces();
  return places.map((p) => ({ slug: p.slug }));
}

export default async function PlacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const place = await getPlace(slug);
  if (!place) notFound();

  const gallery = place.gallery?.length ? place.gallery : place.heroImage ? [place.heroImage] : [];

  return (
    <div className="wrap" style={{ paddingTop: 24, paddingBottom: 64 }}>
      <BackLink fallbackHref={`/city/${place.citySlug}`} fallbackLabel={`Back to ${place.city}`} />

      <div style={{ display: "grid", gridTemplateColumns: "516px 1fr", gap: 48 }}>
        <PlaceGallery images={gallery} alt={place.name} slug={place.slug} />

        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <CategoryPill type={place.category} />
            {place.verdict && <VerdictPill choice={place.verdict} />}
          </div>
          <h1 style={{ fontSize: 34, marginBottom: 12 }}>{place.name}</h1>
          <p style={{ fontSize: 15, color: "var(--bv-text-secondary)", lineHeight: 1.6, marginBottom: 24 }}>{place.take}</p>

          {place.facts && place.facts.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              {place.facts.map((fact) => (
                <div
                  key={fact.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 24,
                    padding: "13px 0",
                    borderBottom: "1px solid var(--bv-border-subtle)",
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: "var(--bv-text-tertiary)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", fontSize: 11 }}>
                    {fact.label}
                  </span>
                  <span style={{ fontWeight: 600, textAlign: "right" }}>{fact.value}</span>
                </div>
              ))}
            </div>
          )}

          {place.body?.map((para, i) => (
            <p key={i} style={{ fontSize: 14, lineHeight: 1.8, color: "var(--bv-text-secondary)", marginBottom: 16, maxWidth: 516 }}>
              {para}
            </p>
          ))}
          {place.skipItIf && (
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--bv-text-secondary)", maxWidth: 516 }}>
              <strong style={{ color: "var(--bv-text-primary)" }}>Skip it if: </strong>
              {place.skipItIf.replace(/^Skip it if:\s*/i, "")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
