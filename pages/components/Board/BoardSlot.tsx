import { Box, Flex } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { PLAYER_COLOR_MAP } from '../../../types/PlayerColor';

type BoardSlotProps = {
  filledBy: PlayerToken;
};

const BoardSlot = ({ filledBy }: BoardSlotProps): ReactElement => {
  return (
    <Flex justify="center" align="center" h="5.5rem" w="5.5rem" bg="lightblue">
      <Box h="4.75rem" w="4.75em" borderRadius="100%" bg={`${PLAYER_COLOR_MAP[filledBy]}`}></Box>
    </Flex>
  );
};

export default BoardSlot;
