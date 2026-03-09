import Link from "next/link";
import styles from "./index.module.css";

const pages = [
  {
    href: "/",
    label: "Landing Page",
    desc: "The main product page shown to visitors. Includes product details and vote buttons.",
    badge: "Public",
    badgeType: "public",
  },
  {
    href: "/admin",
    label: "Admin Dashboard",
    desc: "View total vote counts — Interested vs Not Interested. Keep this URL private.",
    badge: "Private",
    badgeType: "private",
  },
];


export default function IndexPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>OnGo Instant Bath Wipes</p>
        <h1 className={styles.title}>Site Index</h1>
        <p className={styles.subtitle}>All pages in this project</p>
      </header>

      <main className={styles.main}>
        <ul className={styles.list}>
          {pages.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.cardLabel}>{p.label}</span>
                  <span className={`${styles.badge} ${styles[p.badgeType]}`}>
                    {p.badge}
                  </span>
                </div>
                <p className={styles.cardDesc}>{p.desc}</p>
                <span className={styles.cardUrl}>localhost:3000{p.href}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>
        © 2026 OnGo Instant Bath Wipes
      </footer>
    </div>
  );
}
