import { Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Board from '../Board/Board';
import { useWebSocket } from '../context/Websocket';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

/**
 * Core component containing all of the actual/body content of the app
 */
const Game: NextPage = () => {
  const { isSocketConnected } = useWebSocket();

  return (
    <Flex h='100vh' justify='center' align='center'>
      <LoadingOverlay enabled={!isSocketConnected} />
      <Board />
    </Flex>
  );
};

export default Game;
