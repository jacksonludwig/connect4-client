import React, { createContext, ReactElement, useContext, useEffect, useRef, useState } from 'react';

export type PlayerToken = 0 | 1 | 2;

export type WinnerToken = PlayerToken | -1;

export type Board = PlayerToken[][];

export type WebsocketContextType = {
  ws: WebSocket | null;
  sendMessage: typeof WebSocket.prototype.send;
  board: Board;
  winner: WinnerToken;
  currentTurn: PlayerToken;
  gameStarted: boolean;
};

export const WebsocketContext = createContext<WebsocketContextType>({
  ws: null,
  sendMessage: () => [],
  board: [],
  winner: -1,
  currentTurn: 1,
  gameStarted: false,
});

export const useWebSocket = (): WebsocketContextType => useContext(WebsocketContext);

type Props = {
  children: ReactElement;
};

/**
 * Context containing board state. Handles messages from the server and allows components to send
 * messages.
 */
export const WebsocketProvider = ({ children }: Props): ReactElement => {
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
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  /**
   * Simple wrapper function to log if websocket is not yet connected. This could be changed
   * to send an alert instead of logging the error.
   */
  const sendMessage = (data: string | ArrayBufferLike | Blob | ArrayBufferView): void => {
    if (!ws.current) {
      console.log(`socket not connected: ${data} not sent`);
      return;
    }

    ws.current.send(data);
  };

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_SOCKET_HOST ?? 'ws://localhost:4001');

    socket.onopen = () => console.log('socket opened');
    socket.onclose = () => console.log('socket closed');
    socket.onmessage = (event) => console.log(`socket message: ${event.data}`);

    ws.current = socket;

    return () => socket.close();
  });

  const ret = {
    ws: ws.current,
    sendMessage,
    board,
    winner,
    currentTurn,
    gameStarted,
  };

  return <WebsocketContext.Provider value={ret}>{children}</WebsocketContext.Provider>;
};
