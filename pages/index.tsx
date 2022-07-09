import { ChakraProvider, Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useContext } from 'react';
import Board from './components/Board/Board';
import LoadingOverlay from './components/LoadingOverlay/LoadingOverlay';
import { WebsocketContext } from './context/Websocket';

const Main: NextPage = () => {
  const { isSocketConnected } = useContext(WebsocketContext);

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
