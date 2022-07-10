import { Flex, VStack } from '@chakra-ui/react';
import { ReactElement } from 'react';
import Board from '../Board/Board';
import { useWebSocket } from '../context/Websocket';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import MatchmakingOptions from '../Matchmaking/MatchmakingOptions';

/**
 * Core component containing all of the actual/body content of the app
 */
const Game = (): ReactElement => {
  const { isSocketConnected } = useWebSocket();

  return (
    <Flex direction='column' h='100vh' justify='center' align='center'>
      <LoadingOverlay enabled={!isSocketConnected} />
      <VStack>
        <MatchmakingOptions />
        <Board />
      </VStack>
    </Flex>
  );
};

export default Game;
