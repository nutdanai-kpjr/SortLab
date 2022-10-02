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
        <title>SortLab - About</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h2>About</h2>
          <p>
            The purpose of this project is to provide you with an opportunity to
            learn more about sorting algorithms through step-by-step animations.
            This project is open-source and created using the Next.js framework.
            Visit my Github repository for more info by clicking{' '}
            <Link href="https://github.com/nutdanai-kpjr/P01-SortLab">
              <a>here</a>
            </Link>
          </p>
          <p>
            {' '}
            Lastly, thank you for visiting SortLab, I hope you enjoy using it!
            If you have any question, please feel free to contact me via my
            email: nutdanai.kpjr@gmail.com
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
