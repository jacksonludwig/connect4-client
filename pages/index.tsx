import { Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Board from './components/Board/Board';

const Main: NextPage = () => {
  return (
    <>
      <Head>
        <title>Connect 4</title>
        <meta name="description" content="Play online connect 4" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex w="100%" h="100%">
        <Board />
      </Flex>
    </>
  );
};

export default Main;
