import { CostTier, PillType, Verdict } from "@/lib/types";

// Pill / Verdict / Cost — ported from the Figma component library (Pill
// node 1270:6242, Category Filter node 1270:6301, Verdict node 1282:16782,
// Cost node 1282:13386). Exact hex/token values below are read straight off
// those nodes' generated code, not approximated.

const CATEGORY_ACCENT: Record<string, string> = {
  Dine: "var(--bv-category-dine-accent)",
  Drink: "var(--bv-category-drink-accent)",
  Discover: "var(--bv-category-discover-accent)",
  Activity: "var(--bv-category-activities-accent)",
  Stay: "var(--bv-category-stays-accent)",
};

// The always-solid category badge — used on Recommendation Card photos and
// the Place page header. This is Figma's Pill "Style=Default, State=Active"
// for the given category type; there's no "off" look for this one, it's
// always the coloured chip.
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

// Verdict pill (Figma node 1282:16782) — each choice has its OWN look, not
// one shared solid style. "Editors Pick" in particular is the outline/white
// treatment, not a solid fill — that was the bug: every verdict was
// rendering with the same gold-deep fill regardless of choice.
const VERDICT_STYLE: Record<Verdict, { bg: string; border?: string; text: string }> = {
  "Don't Miss": { bg: "var(--bv-gold-deep)", text: "var(--bv-pill-note-bg)" },
  "Worth It": { bg: "var(--bv-status-positive)", text: "var(--bv-pill-note-bg)" },
  "Worth It If": { bg: "var(--bv-status-caution)", text: "var(--bv-pill-note-bg)" },
  "Editors Pick": {
    bg: "var(--bv-bg-raised)",
    border: "1px solid var(--bv-pill-note-border)",
    text: "var(--bv-pill-note-text)",
  },
};

export function VerdictPill({ choice }: { choice: Verdict }) {
  const style = VERDICT_STYLE[choice] ?? VERDICT_STYLE["Don't Miss"];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "7px 14px",
        borderRadius: 100,
        background: style.bg,
        border: style.border,
        color: style.text,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {choice === "Worth It If" ? "Worth It, IF..." : choice}
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

// ── Category Filter pill — the toggleable kind ──────────────────────────
// Figma's Pill component: Default (unselected) is always white/bg-raised
// with a hairline border and muted text, regardless of category. Active
// picks up that category's own accent colour as a solid fill — "All"
// active uses bg/inverse (near-black) rather than a category colour.
const FILTER_ACTIVE_BG: Record<string, string> = {
  All: "var(--bv-bg-inverse)",
  Dine: "var(--bv-category-dine-accent)",
  Drink: "var(--bv-category-drink-accent)",
  Discover: "var(--bv-category-discover-accent)",
  Activity: "var(--bv-category-activities-accent)",
  Stay: "var(--bv-category-stays-accent)",
};

export function CategoryFilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        padding: "7px 14px",
        borderRadius: 100,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        border: active ? "none" : "1px solid var(--bv-pill-note-border)",
        background: active ? (FILTER_ACTIVE_BG[label] ?? "var(--bv-bg-inverse)") : "var(--bv-bg-raised)",
        color: active ? "var(--bv-text-on-solid)" : "var(--bv-pill-note-text)",
      }}
    >
      {label}
    </button>
  );
}
