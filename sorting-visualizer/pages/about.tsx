import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import PageLayout from "../components/page_wrapper/page_layout";
import styles from "../styles/pages/InfoPage.module.css";

const Home: NextPage = () => {
  const imageScale = 1.25;
  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1>About</h1>
          <p>
            The purpose of this project is to provide you with an opportunity to
            learn more about sorting algorithms through step-by-step animations.
          </p>
          <p>
            This project is open-source and created using the Next.js framework.
            You are welcome to fork my projects and play with them!
          </p>
        </div>
        <div>
          <Image
            alt="Stationary"
            width={655 * imageScale}
            height={584 * imageScale}
            src="/about.png"
          ></Image>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
