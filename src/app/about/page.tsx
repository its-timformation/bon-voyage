export default function AboutPage() {
  return (
    <div className="wrap" style={{ paddingTop: 40, paddingBottom: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
      <div>
        <p className="eyebrow" style={{ marginBottom: 8 }}>About Bon Voyage</p>
        <h1 style={{ fontSize: 34, marginBottom: 24, maxWidth: 480 }}>Authentic experiences, everywhere you go.</h1>
        <p style={{ fontSize: 15, color: "var(--bv-text-secondary)", lineHeight: 1.7, marginBottom: 20, maxWidth: 480 }}>
          Bon Voyage started after seeing too many trips built using other people&rsquo;s &ldquo;hidden gems&rdquo; — the same six cafés, the same queue, the same photo everyone else already took.
        </p>
        <p style={{ fontSize: 15, color: "var(--bv-text-secondary)", lineHeight: 1.7, maxWidth: 480 }}>
          Everything is highly recommended or experienced before being researched and added. No sponsorships, no pay-to-list — we&rsquo;d rather send you somewhere ordinary and excellent than famous and average. This isn&rsquo;t a &ldquo;best of&rdquo; list, but rather a guide to where you actually need to go. Don&rsquo;t expect Michelin stars and velvet ropes, but more likely neighbourhood haunts and places with actual soul.
        </p>
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/belfast_warm_hero.jpg" alt="" style={{ borderRadius: 8, width: "100%", objectFit: "cover", aspectRatio: "624/450" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/the-parthenon.jpg" alt="" style={{ borderRadius: 8, width: "100%", objectFit: "cover", aspectRatio: "624/300" }} />
      </div>
    </div>
  );
}
