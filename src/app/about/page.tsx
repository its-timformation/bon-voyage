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
      {/* Figma's About hero (mask group 1259:4570) is a diagonal two-photo
          overlap, not a plain stacked grid — a large photo with a second,
          smaller one peeking out from behind/below it at an offset. */}
      <div style={{ position: "relative", height: 460 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/belfast_warm_hero.jpg"
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "76%",
            height: "80%",
            objectFit: "cover",
            borderRadius: 8,
            boxShadow: "0 16px 32px rgba(13,12,10,0.22)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/the-parthenon.jpg"
          alt=""
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "52%",
            height: "46%",
            objectFit: "cover",
            borderRadius: 8,
            border: "6px solid var(--bv-bg-page)",
            boxShadow: "0 16px 32px rgba(13,12,10,0.26)",
          }}
        />
      </div>
    </div>
  );
}
