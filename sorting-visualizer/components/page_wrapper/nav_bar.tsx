// create mockup nav bar component

import Link from "next/link";
import styles from "../../styles/NavBar.module.css";
export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.logo}>Sorting Viz</h1>
      <div className={styles.links}>
        {" "}
        <Link href="/landing">
          <a>Landing</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/pricing">
          <a>Pricing</a>
        </Link>
        <Link href="/">
          <a>Play</a>
        </Link>
      </div>
    </nav>
  );
}
