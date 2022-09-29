import FooterBar from './FooterBar';
import NavBar from './NavBar';
import styles from '../../styles/components/page_wrapper/PageLayout.module.css';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={styles.container}>
        <NavBar />
        <main>{children}</main>

        <FooterBar />
      </div>
    </>
  );
}
