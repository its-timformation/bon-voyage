"use client";

export default function ContactPage() {
  return (
    <div className="wrap" style={{ paddingTop: 40, paddingBottom: 64, maxWidth: 560 }}>
      <p className="eyebrow" style={{ marginBottom: 8 }}>Get in touch</p>
      <h1 style={{ fontSize: 34, marginBottom: 24 }}>Contact</h1>
      <p style={{ fontSize: 14, color: "var(--bv-text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>
        A correction, a tip for somewhere we&rsquo;ve missed, or just a question — this goes straight to the
        desk, not a ticketing queue.
      </p>
      <form
        style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 420 }}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="you@email.com"
          style={{ padding: "13px 16px", border: "1px solid var(--bv-field-border-default)", borderRadius: 3, background: "var(--bv-field-bg)", fontFamily: "inherit", fontSize: 13 }}
        />
        <textarea
          placeholder="What's on your mind?"
          rows={5}
          style={{ padding: "13px 16px", border: "1px solid var(--bv-field-border-default)", borderRadius: 3, background: "var(--bv-field-bg)", fontFamily: "inherit", fontSize: 13, resize: "vertical" }}
        />
        <button
          type="submit"
          style={{
            alignSelf: "flex-start",
            padding: "13px 24px",
            background: "var(--bv-action-primary)",
            color: "var(--bv-action-on-primary)",
            border: "none",
            borderRadius: 3,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
