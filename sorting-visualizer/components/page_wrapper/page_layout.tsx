import FooterBar from "./footer_bar";
import NavBar from "./nav_bar";
import styles from "../../styles/PageLayout.module.css";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className={styles.container}>{children}</main>
      <FooterBar />
    </>
  );
}
