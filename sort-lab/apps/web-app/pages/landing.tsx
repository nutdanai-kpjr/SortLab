import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '../components/page_wrapper/PageLayout';
import styles from '../styles/pages/InfoPage.module.css';

const Home: NextPage = () => {
  const imageScale = 1;
  return (
    <PageLayout>
      <Head>
        <title>SortLab - Landing</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1>
            Sort<span className={styles.logoPurple}>Lab</span>
          </h1>
          <h3>The Extaordinary Sorting Visualizer</h3>
          <p>Learn world famous sorting algorithms through animiation!</p>

          <div className={styles.buttonContainer}>
            <Link href="/">
              <a>Play</a>
            </Link>
          </div>
        </div>
        <div className={styles.imageContainer}>
          {' '}
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
