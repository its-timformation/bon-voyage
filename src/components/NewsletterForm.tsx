"use client";

export function NewsletterForm() {
  return (
    <form
      style={{ display: "flex", gap: 8, justifyContent: "center", maxWidth: 420, margin: "0 auto" }}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="you@email.com"
        style={{
          flex: 1,
          padding: "13px 16px",
          border: "1px solid var(--bv-field-border-default)",
          borderRadius: 3,
          background: "var(--bv-field-bg)",
          fontFamily: "inherit",
          fontSize: 13,
        }}
      />
      <button
        type="submit"
        style={{
          padding: "13px 20px",
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
        Sign Up
      </button>
    </form>
  );
}
