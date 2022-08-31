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
      <div className={styles.container}>
        <NavBar />
        <main>{children}</main>
        <FooterBar />
      </div>
    </>
  );
}
