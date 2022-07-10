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
  gameId: string;
  setCurrentTurn: React.Dispatch<PlayerToken>;
  setBoard: React.Dispatch<Board>;
  setWinner: React.Dispatch<WinnerToken>;
  setIsGameStarted: React.Dispatch<boolean>;
  toast: (options?: UseToastOptions | undefined) => ToastId;
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

  export type StatusMessage = {
    status: 'success' | 'fail' | 'info';
    message: StatusNotification;

    body?: GameStateBody;
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
