import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import PageLayout from "../components/page_wrapper/page_layout";
import styles from "../styles/pages/InfoPage.module.css";

const Home: NextPage = () => {
  const imageScale = 1;
  return (
    <PageLayout>
      <Head>
        <title>Sorting Viz - Landing</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1>Sorting Viszualizer</h1>
          <p>Learn world famous sorting algorithms through animiation!</p>
          <div className={styles.buttonContainer}>
            <Link href="/">
              <a>Play</a>
            </Link>
          </div>
        </div>
        <div className={styles.imageContainer}>
          {" "}
          <Image
            alt="Stationary"
            width={600 * imageScale}
            height={600 * imageScale}
            src="/landing.svg"
          ></Image>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
