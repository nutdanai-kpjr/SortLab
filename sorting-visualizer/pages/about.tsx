import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import PageLayout from "../components/page_wrapper/page_layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <h1>Sortng Viszualizer</h1>
      <p>Learn world famous sorting algorithms through animiation!</p>
    </PageLayout>
  );
};

export default Home;
