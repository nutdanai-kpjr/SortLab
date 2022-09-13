import type { NextPage } from "next";
import Image from "next/image";
import PageLayout from "../components/page_wrapper/page_layout";
import styles from "../styles/pages/InfoPage.module.css";

const Home: NextPage = () => {
  const imageScale = 1;
  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h2>About</h2>
          <p>
            The purpose of this project is to provide you with an opportunity to
            learn more about sorting algorithms through step-by-step animations.
            This project is open-source and created using the Next.js framework.
            You are welcome to fork my projects and play with them!
          </p>
        </div>
        <div className={styles.imageContainer}>
          <Image
            alt="Stationary"
            width={447 * imageScale}
            height={559 * imageScale}
            src="/about.svg"
          ></Image>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
