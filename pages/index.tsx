import { ChakraProvider, Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Board from '../components/Board/Board';
import LoadingOverlay from '../components/LoadingOverlay/LoadingOverlay';
import { useWebSocket } from '../context/Websocket';

const Main: NextPage = () => {
  const { isSocketConnected } = useWebSocket();

  return (
    <ChakraProvider>
      <Head>
        <title>Connect 4</title>
        <meta name="description" content="Play online connect 4" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex h="100vh" justify="center" align="center">
        <LoadingOverlay enabled={!isSocketConnected} />
        <Board />
      </Flex>
    </ChakraProvider>
  );
};

export default Main;
