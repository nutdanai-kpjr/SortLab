import type { NextPage } from 'next';
import Head from 'next/head';
import PageLayout from '../components/page_wrapper/PageLayout';
import BarSet from '../components/sorter/BarSet';
import { ArrayProvider } from '../context/arrayContext';

const Home: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>SortLab - Home</title>
      </Head>
      <ArrayProvider>
        <BarSet></BarSet>
      </ArrayProvider>
    </PageLayout>
  );
};

export default Home;
