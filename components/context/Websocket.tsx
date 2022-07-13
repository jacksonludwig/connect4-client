import React, { createContext, ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { setTimeout } from 'timers';
import MessageUtil from '../../utils/MessageUtil';

export const WebsocketContext = createContext<WebsocketContextType>({
  ws: null,
  sendMessage: () => {},
  board: [],
  winner: -1,
  currentTurn: 1,
  isGameStarted: false,
  isSocketConnected: false,
  gameId: '',
  setBoard: () => [],
  setCurrentTurn: () => 1,
  setWinner: () => -1,
  setIsGameStarted: () => false,
});

/**
 * Wrapper around `useContext(WebsocketContext)`
 */
export const useWebSocket = (): WebsocketContextType => useContext(WebsocketContext);

type Props = {
  children: ReactElement;
};

/**
 * Context containing board state. Handles messages from the server and allows components to send
 * messages.
 */
const WebsocketProvider = ({ children }: Props): ReactElement => {
  const ws = useRef<WebSocket | null>(null);

  const [board, setBoard] = useState<Board>([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  const [winner, setWinner] = useState<WinnerToken>(-1);
  const [currentTurn, setCurrentTurn] = useState<PlayerToken>(1);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
  const [gameId, setGameId] = useState<string>('');

  /**
   * Simple wrapper function to log if websocket is not yet connected. This should never actually happen
   * since we show spinner while socket connects.
   */
  const sendMessage = (data: { [key: string]: any }): void => {
    if (!ws.current) {
      console.log(`socket not connected: ${data} not sent`);
      return;
    }

    ws.current.send(JSON.stringify(data));
  };

  useEffect(() => {
    const connect = () => {
      const socket = new WebSocket(process.env.NEXT_PUBLIC_SOCKET_HOST || 'ws://localhost:4001');

      socket.onopen = () => setIsSocketConnected(true);

      socket.onclose = () => {
        console.log('socket closed, retrying...');
        setIsSocketConnected(false);
        setTimeout(connect, 1000);
      };

      socket.onmessage = (event) => {
        console.log(`received message from server: ${event.data}`);

        const data = JSON.parse(event.data);

        new MessageUtil({
          ws: socket,
          message: data,
          setGameId,
          setCurrentTurn,
          setBoard,
          setWinner,
          isGameStarted,
          setIsGameStarted,
        })[data.name as Server.PossibleMessage]();
      };

      ws.current = socket;

      return () => socket.close();
    };

    return connect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const ret = {
    ws: ws.current,
    sendMessage,
    isSocketConnected,
    board,
    winner,
    currentTurn,
    isGameStarted,
    gameId,
    setBoard,
    setCurrentTurn,
    setIsGameStarted,
    setWinner,
  };

  return <WebsocketContext.Provider value={ret}>{children}</WebsocketContext.Provider>;
};

export default WebsocketProvider;
