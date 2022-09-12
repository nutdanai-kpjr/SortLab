import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import FilledButton from "../components/buttons/filled_button";
import PageLayout from "../components/page_wrapper/page_layout";
import styles from "../styles/pages/InfoPage.module.css";

const Home: NextPage = () => {
  const imageScale = 1;
  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1>Sorting Viszualizer</h1>
          <p>Learn world famous sorting algorithms through animiation!</p>
          <FilledButton title="Play"></FilledButton>
        </div>
        <div className={styles.imageContainer}>
          {" "}
          <Image
            alt="Stationary"
            width={1000 * imageScale}
            height={800 * imageScale}
            src="/landing.svg"
          ></Image>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
