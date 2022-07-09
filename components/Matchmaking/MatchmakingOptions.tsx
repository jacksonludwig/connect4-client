import { Button, Center, Flex, HStack, Input, Text } from '@chakra-ui/react';
import { DuplicateIcon } from '@heroicons/react/outline';
import { ReactElement } from 'react';

/**
 * Matchmaking options (e.g. join, create)
 */
const MatchmakingOptions = (): ReactElement => {
  return (
    <HStack>
      <Flex minWidth='50%' direction='column'>
        <Button colorScheme='blue' size='lg'>
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
          <Text color='gray.500'>Your Game ID</Text>
          <Button ml='1' color='gray.600' p='0' size='sm' variant='ghost'>
            <DuplicateIcon height='1.3rem' width='1.3rem' />
          </Button>
        </Flex>
      </Flex>
      <Flex minWidth='50%' direction='column'>
        <Button colorScheme='blue' size='lg'>
          Join Game
        </Button>
        <Center minHeight='3.0rem' padding='1' rounded='lg' bg='gray.200'>
          <Input placeholder='Their Game ID' color='gray.500' />
        </Center>
      </Flex>
    </HStack>
  );
};

export default MatchmakingOptions;
