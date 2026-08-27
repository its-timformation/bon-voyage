import styles from "./Logo.module.css";

// Shared wordmark — Figma's Logo Lockup component (1201:654). The lockup is
// bound to a Brand/Logo theme token so the text swaps light/dark while the
// orange globe mark stays constant (node 1209:7673 confirms the mark is
// pinned orange even in the dark-on-page variant). Nav (light background)
// passes variant="light"; Footer (dark background) passes variant="dark".
export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <span className={`${styles.logo} ${variant === "dark" ? styles.dark : ""}`}>
      <span className={styles.mark} aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.3" stroke="white" strokeWidth="1.1" />
          <ellipse cx="8" cy="8" rx="2.7" ry="6.3" stroke="white" strokeWidth="1.1" />
          <path d="M1.7 8h12.6M2.7 4.8h10.6M2.7 11.2h10.6" stroke="white" strokeWidth="1.1" />
        </svg>
      </span>
      <span className={styles.word}>bon</span>
      <span className={styles.word}>voyage</span>
    </span>
  );
}
