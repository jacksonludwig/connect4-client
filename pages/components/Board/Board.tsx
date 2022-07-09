import BoardSlot from './BoardSlot';
import { ReactElement, useContext } from 'react';
import { WebsocketContext } from '../../context/Websocket';
import { Flex } from '@chakra-ui/react';

/**
 * Renders a board given a board state.
 * The board state represents which slots have been taken by each player, and which are still open.
 */
const Board = (): ReactElement => {
  const { board } = useContext(WebsocketContext);

  return (
    <>
      <Flex gap=".2rem" direction="column" justify="center" align="center">
        {board.map((row, row_ind) => (
          <Flex gap=".2rem" key={row_ind} direction="row" align="center" justify="center">
            {row.map((cell, cell_ind) => (
              <BoardSlot filledBy={cell} key={`${row_ind}${cell_ind}`} />
            ))}
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default Board;