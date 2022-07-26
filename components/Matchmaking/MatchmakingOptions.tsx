import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { DuplicateIcon } from '@heroicons/react/outline';
import { ReactElement, useEffect, useState } from 'react';
import { PLAYER_COLOR_MAP } from '../../types/PlayerColor';
import { useWebSocket } from '../context/Websocket';

/**
 * Matchmaking options (e.g. join, create)
 */
const MatchmakingOptions = (): ReactElement => {
  const { gameId, sendMessage, currentTurn, isGameStarted, isInGame } = useWebSocket();

  const toast = useToast();

  const [joinGameId, setJoinGameId] = useState<string>('');
  const [currentTurnColor, setCurrentTurnColor] = useState<string>('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);

  const createGame = () => {
    if (isInGame) {
      setIsCreateModalOpen(true);
      return;
    }

    sendMessage({
      name: 'CreateGame',
    });
  };

  const confirmCreateGame = () => {
    sendMessage({
      name: 'CreateGame',
    });

    setIsCreateModalOpen(false);
  };

  const confirmJoinGame = () => {
    sendMessage({
      name: 'JoinGame',
      body: {
        gameId: joinGameId,
      },
    });

    setIsJoinModalOpen(false);
  };

  const joinGame = () => {
    if (isInGame) {
      setIsJoinModalOpen(true);
      return;
    }

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

  useEffect(() => {
    setCurrentTurnColor(PLAYER_COLOR_MAP[currentTurn]);
  }, [currentTurn]);

  return (
    <>
      <HStack w='100%' justify='space-between'>
        <Flex minWidth='16rem' direction='column'>
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
            <Text ml='1rem' color='gray.500'>
              {gameId || 'Your Game ID'}
            </Text>
            <Button
              ml='auto'
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
        {isGameStarted && (
          <Flex>
            <Heading>
              <VStack>
                <Text textColor={currentTurnColor}>{`${currentTurn}'s`}</Text>
                <Text>Turn</Text>
              </VStack>
            </Heading>
          </Flex>
        )}
        <Flex minWidth='16rem' direction='column'>
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
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Start a new lobby?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Your current game will be closed!</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme='red' variant='outline' onClick={confirmCreateGame}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join another game?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{`You won't be able to rejoin your current game!`}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => setIsJoinModalOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme='red' variant='outline' onClick={confirmJoinGame}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MatchmakingOptions;
