import { Button, Center, Flex, HStack, Input, Text, useToast } from '@chakra-ui/react';
import { DuplicateIcon } from '@heroicons/react/outline';
import { ReactElement, useState } from 'react';
import { useWebSocket } from '../context/Websocket';

/**
 * Matchmaking options (e.g. join, create)
 */
const MatchmakingOptions = (): ReactElement => {
  const { gameId, sendMessage } = useWebSocket();

  const [joinGameId, setJoinGameId] = useState<string>('');
  const toast = useToast();

  const createGame = () => {
    sendMessage({
      name: 'CreateGame',
    });
  };

  const joinGame = () => {
    sendMessage({
      name: 'JoinGame',
      body: {
        gameId: joinGameId,
      },
    });
  };

  const copyGameIdToClipboard = () => {
    navigator.clipboard.writeText(gameId);
    toast({
      title: 'Game Id Copied!',
      status: 'success',
      isClosable: true,
      duration: 3000,
    });
  };

  return (
    <HStack>
      <Flex minWidth='50%' direction='column'>
        <Button colorScheme='blue' size='lg' onClick={createGame}>
          Create Game
        </Button>
        <Flex
          justify='space-evenly'
          align='center'
          minHeight='3.0rem'
          padding='1'
          rounded='lg'
          bg='gray.200'
        >
          <Text color='gray.500'>{gameId || 'Your Game ID'}</Text>
          <Button
            ml='1'
            color='gray.600'
            p='0'
            size='sm'
            variant='ghost'
            onClick={copyGameIdToClipboard}
          >
            <Center h='1.3rem' w='1.3rem'>
              <DuplicateIcon />
            </Center>
          </Button>
        </Flex>
      </Flex>
      <Flex minWidth='50%' direction='column'>
        <Button colorScheme='blue' size='lg' onClick={joinGame}>
          Join Game
        </Button>
        <Center minHeight='3.0rem' padding='1' rounded='lg' bg='gray.200'>
          <Input
            placeholder='Their Game ID'
            color='gray.500'
            onChange={(e) => setJoinGameId(e.target.value)}
          />
        </Center>
      </Flex>
    </HStack>
  );
};

export default MatchmakingOptions;
