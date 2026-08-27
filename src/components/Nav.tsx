"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/cities", label: "Cities" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

// Ported from Figma's Nav Bar (1200:926 / instance 1204:6766). The
// "Favourites lives under the button in the main nav" requirement is this
// button, top right — Bon Voyage doesn't use a dropdown here, it's a direct
// link to /favourites, same as every other nav item just styled as the
// secondary button the Nav Bar component ships with.
export function Nav() {
  const pathname = usePathname();
  return (
    <nav className={styles.bar}>
      <Link href="/" className={styles.logo}>
        <span>bon</span>
        <span className={styles.logoMark}>✈</span>
        <span>voyage</span>
      </Link>
      <div className={styles.links}>
        {LINKS.map((link) => {
          const current = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} className={`${styles.item} ${current ? styles.current : ""}`}>
              {link.label}
              <span className={styles.underline} />
            </Link>
          );
        })}
        <Link href="/favourites" className={styles.favBtn}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M10 17.2s-6.6-4.06-9-8.02C-0.5 6 1 2.6 4.4 2.1c1.9-.27 3.6.7 4.6 2.2 1-1.5 2.7-2.47 4.6-2.2 3.4.5 4.9 3.9 3.4 7.08-2.4 3.96-9 8.02-9 8.02z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          Favourites
        </Link>
      </div>
    </nav>
  );
}
