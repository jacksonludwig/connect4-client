import { ChakraProvider } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Game from '../components/GameContainer/Game';

const Main: NextPage = () => {
  return (
    <ChakraProvider>
      <Head>
        <title>Connect 4</title>
        <meta name='description' content='Play online connect 4' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Game />
    </ChakraProvider>
  );
};

export default Main;
