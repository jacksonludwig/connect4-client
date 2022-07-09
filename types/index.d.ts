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

type GameStateBody = {
  board: Connect4.SlotOwner[][];
  currentTurn: Connect4.SlotOwner;
  winner: Connect4.SlotOwner;
};

type GameOverBody = {
  winner: Connect4.SlotOwner;
};

namespace Server {
  export enum Error {
    GameNotFound = 'GameNotFound',
    GameFull = 'GameFull',
    NotInGame = 'NotInGame',
    FullColumn = 'FullColumn',
    WrongTurn = 'WrongTurn',
    AlreadyInGame = 'AlreadyInGame',
  }

  export enum StatusNotification {
    PlayerJoined = 'PlayerJoined',
    GameCreated = 'GameCreated',
    GameState = 'GameState',
    GameOver = 'GameOver',
  }

  export type JoinResponse = Record<string, never>;

  export type CreateResponse = {
    gameId: string;
  };

  export type GameStateBody = {
    board: PlayerToken[][];
    currentTurn: PlayerToken;
  };

  export type GameOverBody = {
    winner: WinnerToken;
  };

  export type StatusMessage = {
    status: 'success' | 'fail' | 'info';
    message: StatusNotification;

    body?: GameStateBody;
  };

  export type RejectedResponseMessage = {
    name: Client.Actions;
    type: 'response';
    status: 'rejected';
    reason: Error;
  };

  export type AcceptedResponseMessage = {
    name: Client.Actions;
    type: 'response';
    status: 'accepted';
    body: JoinResponse | CreateResponse;
  };
}

namespace Client {
  export enum Actions {
    CreateGame = 'CreateGame',
    JoinGame = 'JoinGame',
    PlacePiece = 'PlacePiece',
  }

  export type JoinData =
    | {
        gameId: string;
      }
    | undefined;

  export type CreateData = null;

  export type PlacePieceData = {
    column: number;
  };

  export type Message = {
    name: Actions;
    body: CreateData | JoinData | PlacePieceData;
  };
}

type PossibleMessage = 'CreateGame' | 'JoinGame' | 'PlacePiece' | 'StatusNotification';
