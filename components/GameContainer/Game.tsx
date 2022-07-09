import { Button, Center, Flex, HStack, Text } from '@chakra-ui/react';
import { DuplicateIcon } from '@heroicons/react/outline';
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
    <Flex direction='column' h='100vh' justify='center' align='center'>
      <LoadingOverlay enabled={!isSocketConnected} />
      <HStack>
        <Flex direction='column'>
          <Button colorScheme='blue' size='lg'>
            Create Game
          </Button>
          <Center padding='1' rounded='lg' bg='gray.200'>
            <Text color='gray.500'>Your Game ID</Text>
            <Button color='gray.600' p='0' size='sm' variant='ghost'>
              <DuplicateIcon height='1.3rem' width='1.3rem' />
            </Button>
          </Center>
        </Flex>
        <Flex direction='column'>
          <Button colorScheme='blue' size='lg'>
            Join Game
          </Button>
          <Center padding='1' rounded='lg' bg='gray.200'>
            <Text color='gray.500'>Their Game ID</Text>
          </Center>
        </Flex>
      </HStack>
      <Board />
    </Flex>
  );
};

export default Game;
