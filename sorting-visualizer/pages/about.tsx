import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import PageLayout from "../components/page_wrapper/page_layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <h1>About This </h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet in
        pulvinar consectetur tempor at pellentesque. Pharetra mattis porttitor
        vitae quam venenatis bibendum. Leo scelerisque cursus lectus quis
        molestie non. Ac euismod nibh quis leo risus nulla.
      </p>
    </PageLayout>
  );
};

export default Home;
