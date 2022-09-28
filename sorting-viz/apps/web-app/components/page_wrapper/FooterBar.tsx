import Link from 'next/link';
import { getCurrentYear } from '../../hooks/utils';
import styles from '../../styles/components/page_wrapper/FooterBar.module.css';
export default function FooterBar() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyRight}>Copyright Nash {getCurrentYear()}</p>
      <div className={styles.links}>
        {' '}
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/privacy-policy">
          <a>Privacy Policy</a>
        </Link>
        <Link href="/terms-of-service">
          <a>Terms of Services</a>
        </Link>
      </div>
    </footer>
  );
}
