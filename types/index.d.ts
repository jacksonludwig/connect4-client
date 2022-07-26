type PlayerToken = 0 | 1 | 2;

type WinnerToken = PlayerToken | -1;

type Board = PlayerToken[][];

type WebsocketContextType = {
  ws: WebSocket | null;
  sendMessage: (data: { [key: string]: any }) => void;
  board: Board;
  winner: WinnerToken;
  currentTurn: PlayerToken;
  isGameStarted: boolean;
  isSocketConnected: boolean;
  isInGame: boolean;
  gameId: string;
  setCurrentTurn: React.Dispatch<PlayerToken>;
  setBoard: React.Dispatch<Board>;
  setWinner: React.Dispatch<WinnerToken>;
  setIsGameStarted: React.Dispatch<boolean>;
  setIsInGame: React.Dispatch<boolean>;
};

type GameStateBody = {
  board: PlayerToken[][];
  currentTurn: PlayerToken;
  winner: PlayerToken;
};

type GameOverBody = {
  winner: WinnerToken;
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

  export type JoinResponse = {
    gameId: string;
  };

  export type CreateResponse = {
    gameId: string;
  };

  export type PlaceResponse = Record<string, never>;

  export type GameStateBody = {
    board: PlayerToken[][];
    currentTurn: PlayerToken;
  };

  export type GameOverBody = {
    winner: WinnerToken;
  };

  export type StatusMessage<Body> = {
    status: 'success' | 'fail' | 'info';
    message: StatusNotification;

    body?: Body;
  };

  export type ResponseMessage<AcceptedBody> = {
    name: Client.Actions;
    type: 'response';
    status: 'accepted' | 'rejected';
    reason: Error;
    body: AcceptedBody;
  };

  export type PossibleMessage = 'CreateGame' | 'JoinGame' | 'PlacePiece' | 'StatusNotification';
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
