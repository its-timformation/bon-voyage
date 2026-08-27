import Link from "next/link";
import styles from "./Footer.module.css";
import { cities } from "@/data/seed";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Logo variant="dark" />
          <p className={styles.tagline}>Getting you the local recommendation, before you have to ask</p>
        </div>
        <div className={styles.cols}>
          <div className={styles.col}>
            <span className={styles.colTitle}>Cities</span>
            <div className={styles.colLinks}>
              {cities.map((c) => (
                <Link key={c.slug} href={`/city/${c.slug}`}>{c.name}</Link>
              ))}
            </div>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>Company</span>
            <div className={styles.colLinks}>
              <Link href="/about">About</Link>
              <Link href="/journal">Journal</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.rule} />
      <div className={styles.bottom}>
        <span>© 2026 Bon Voyage. All rights reserved.</span>
        <div className={styles.legal}>
          <span>Privacy</span><span>·</span><span>Terms</span><span>·</span><span>Cookies</span>
        </div>
      </div>
    </footer>
  );
}
