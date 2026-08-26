import { CostTier, PillType, Verdict } from "@/lib/types";

// Pill / Verdict / Cost — ported from the Figma component library (Pill
// node 1270:6242, Verdict node 1282:16782, Cost node 1282:13386).

const CATEGORY_ACCENT: Record<string, string> = {
  Dine: "var(--bv-category-dine-accent)",
  Drink: "var(--bv-category-drink-accent)",
  Discover: "var(--bv-category-discover-accent)",
  Activity: "var(--bv-category-activities-accent)",
  Stay: "var(--bv-category-stays-accent)",
};

export function CategoryPill({ type }: { type: PillType }) {
  const bg = CATEGORY_ACCENT[type] ?? "var(--bv-category-discover-accent)";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "7px 14px",
        borderRadius: 100,
        background: bg,
        color: "var(--bv-text-on-solid)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {type}
    </span>
  );
}

export function PracticalPill({ label }: { label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "7px 14px",
        borderRadius: 100,
        background: "var(--bv-pill-note-bg)",
        border: "1px solid var(--bv-pill-note-border)",
        color: "var(--bv-pill-note-text)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

export function VerdictPill({ choice }: { choice: Verdict }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "7px 14px",
        borderRadius: 100,
        background: "var(--bv-gold-deep)",
        color: "var(--bv-pill-note-bg)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {choice}
    </span>
  );
}

const COST_SYMBOLS: Record<CostTier, string> = {
  Low: "£",
  Medium: "££",
  High: "£££",
  Luxury: "££££",
};

export function CostBadge({ tier }: { tier: CostTier }) {
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.06em",
        color: "var(--bv-text-tertiary)",
        textTransform: "uppercase",
      }}
    >
      {COST_SYMBOLS[tier]}
    </span>
  );
}
