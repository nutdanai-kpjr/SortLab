import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import PageLayout from "../components/page_wrapper/page_layout";
import styles from "../styles/pages/InfoPage.module.css";
import Script from "next/script";
const Home: NextPage = () => {
  const imageScale = 1;
  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1>Pricing</h1>
          <p>
            We charge a subscription fee of 4.99$ per month for our service.
            With our subscription, you will receive more detailed information
            about the sorting algorithms along with 5 exclusive sorting
            algorithms that had never been seen before. Please make sure that
            you have a valid credit card before starting to use our service, as
            we require payment before granting you access to our service...Nope!
            Just kidding! This is a my hobby project and I&apos;m not charging
            you anything. I&apos;m just trying to learn how to use Next.js
            framework and I&apos;m using this project as a playground. So, feel
            free to use this service for free!
          </p>
          <p>
            However, if you are really insisted to support me, then I would be
            happy as larry! You can do it by buy me the coffee, just click the
            button below. Thank you!
          </p>
          <p>
            <a
              href="https://www.buymeacoffee.com/nutdanai"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                height={60}
                width={217}
                src="/buy-me-a-coffee.png"
                alt="Buy Me A Coffee"
              />
            </a>
          </p>
        </div>
        <div className={styles.imageContainer}>
          {" "}
          <Image
            alt="Stationary"
            width={619 * imageScale}
            height={486 * imageScale}
            src="/pricing.png"
          ></Image>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
