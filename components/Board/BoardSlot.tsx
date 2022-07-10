import { Box, Flex } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { PLAYER_COLOR_MAP } from '../../types/PlayerColor';
import { useWebSocket } from '../context/Websocket';

type BoardSlotProps = {
  filledBy: PlayerToken;
  setHighlightedColumn: React.Dispatch<React.SetStateAction<number | null>>;
  highlightedColumn: number | null;
  column: number;
};

const outResponseiveSize = { base: '3.00rem', md: '4.5rem', lg: '6.00rem', xl: '7.75rem' };
const innerResponsiveSize = { base: '2.75rem', md: '3.7rem', lg: '5.5rem', xl: '7.00rem' };

const BoardSlot = ({
  filledBy,
  setHighlightedColumn,
  column,
  highlightedColumn,
}: BoardSlotProps): ReactElement => {
  const { sendMessage } = useWebSocket();

  const dropPieceInColumn = () => {
    sendMessage({
      name: 'PlacePiece',
      body: {
        column,
      },
    });
  };

  return (
    <Flex
      justify='center'
      align='center'
      h={outResponseiveSize}
      w={outResponseiveSize}
      bg='lightblue'
      filter={`brightness(${column === highlightedColumn ? 1.1 : 1.0})`}
      onMouseEnter={() => setHighlightedColumn(column)}
      onMouseLeave={() => setHighlightedColumn(null)}
      onClick={dropPieceInColumn}
    >
      <Box
        h={innerResponsiveSize}
        w={innerResponsiveSize}
        borderRadius='100%'
        bg={`${PLAYER_COLOR_MAP[filledBy]}`}
      ></Box>
    </Flex>
  );
};

export default BoardSlot;
