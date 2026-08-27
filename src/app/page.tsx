import Link from "next/link";
import { getCities, getJournalPosts } from "@/lib/content";
import { CityTeaser } from "@/components/CityTeaser";
import { JournalTeaser } from "@/components/JournalTeaser";
import { NewsletterForm } from "@/components/NewsletterForm";

export default async function HomePage() {
  const [cities, journal] = await Promise.all([getCities(), getJournalPosts()]);

  return (
    <div>
      <section className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, paddingTop: 0, paddingBottom: 64, alignItems: "center" }}>
        <div>
          <p className="eyebrow" style={{ marginBottom: 12 }}>Considered, not curated for a photo</p>
          <h1 style={{ fontSize: 40, lineHeight: 1.1, marginBottom: 16 }}>Dishing out the authentic advice</h1>
          <p style={{ fontSize: 15, color: "var(--bv-text-secondary)", lineHeight: 1.6, marginBottom: 24, maxWidth: 480 }}>
            Discover recommendations and self-guided tours that swap the photo-op crowds for the real places you need to see. Focus on the substance, not the stars.
          </p>
          <Link
            href="/cities"
            style={{
              display: "inline-flex",
              padding: "13px 24px",
              background: "var(--bv-action-primary)",
              color: "var(--bv-action-on-primary)",
              borderRadius: 3,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Explore Cities
          </Link>
        </div>
        <div style={{ position: "relative", aspectRatio: "624/538", borderRadius: 8, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/belfast_warm_hero.jpg" alt="Terraced streets in Belfast" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 64 }}>
        <p className="eyebrow" style={{ marginBottom: 8 }}>Get the lowdown</p>
        <h2 style={{ fontSize: 28, marginBottom: 24 }}>Latest Cities</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {cities.map((city, i) => (
            <CityTeaser key={city.slug} city={city} index={i} />
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 64 }}>
        <p className="eyebrow" style={{ marginBottom: 8 }}>From the journal</p>
        <h2 style={{ fontSize: 28, marginBottom: 24 }}>Recently Written</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {journal.map((post) => (
            <JournalTeaser key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section style={{ background: "var(--bv-bg-wash)", padding: "56px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>Notes from the desk, occasionally</h2>
        <p style={{ fontSize: 14, color: "var(--bv-text-secondary)", maxWidth: 460, margin: "0 auto 24px" }}>
          A new opening, a route worth walking, a correction — never more than once a month.
        </p>
        <NewsletterForm />
      </section>
    </div>
  );
}
