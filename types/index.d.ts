type PlayerToken = 0 | 1 | 2;

type WinnerToken = PlayerToken | -1;

type Board = PlayerToken[][];

type WebsocketContextType = {
  ws: WebSocket | null;
  sendMessage: typeof WebSocket.prototype.send;
  board: Board;
  winner: WinnerToken;
  currentTurn: PlayerToken;
  isGameStarted: boolean;
  isSocketConnected: boolean;
};
