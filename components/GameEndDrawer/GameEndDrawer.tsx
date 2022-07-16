import {
  Button,
  Heading,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  VStack,
  Text,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { PLAYER_COLOR_MAP } from '../../types/PlayerColor';
import { useWebSocket } from '../context/Websocket';

const GameEndDrawer = (): ReactElement => {
  const { winner } = useWebSocket();
  const { onClose } = useDisclosure();

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Drawer isOpen={winner !== -1} placement='right' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Game Over!</DrawerHeader>

        <DrawerBody>
          <VStack height='100%' justify='center'>
            <Heading>{`Winner:`}</Heading>
            <Heading color={PLAYER_COLOR_MAP[winner as PlayerToken]}>{winner}</Heading>
            <Text fontWeight='semibold'>Refresh to start a new game!</Text>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button colorScheme='blue' onClick={refreshPage}>
            Refresh
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default GameEndDrawer;
