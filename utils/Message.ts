import NEW_BOARD from '../types/Board';

export type MessageUtilType = {
  ws: WebSocket;
  message: { [key: string]: any };
  setGameId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentTurn: WebsocketContextType['setCurrentTurn'];
  setBoard: WebsocketContextType['setBoard'];
  setWinner: WebsocketContextType['setWinner'];
  isGameStarted: WebsocketContextType['isGameStarted'];
  setIsGameStarted: WebsocketContextType['setIsGameStarted'];
  setIsInGame: WebsocketContextType['setIsInGame'];
  isInGame: WebsocketContextType['isInGame'];
};

abstract class MessageHandler {
  public ws: MessageUtilType['ws'];
  public message: MessageUtilType['message'];
  public setGameId: MessageUtilType['setGameId'];
  public setCurrentTurn: MessageUtilType['setCurrentTurn'];
  public setGameState: MessageUtilType['setBoard'];
  public setWinner: MessageUtilType['setWinner'];
  public isGameStarted: MessageUtilType['isGameStarted'];
  public setIsGameStarted: MessageUtilType['setIsGameStarted'];
  public setIsInGame: MessageUtilType['setIsInGame'];
  public isInGame: MessageUtilType['isInGame'];

  constructor(data: MessageUtilType) {
    this.ws = data.ws;
    this.message = data.message;
    this.setGameId = data.setGameId;
    this.setCurrentTurn = data.setCurrentTurn;
    this.setGameState = data.setBoard;
    this.setWinner = data.setWinner;
    this.isGameStarted = data.isGameStarted;
    this.setIsGameStarted = data.setIsGameStarted;
    this.setIsInGame = data.setIsInGame;
    this.isInGame = data.isInGame;
  }

  /**
   * Set state to as if the game had just been created.
   */
  public resetState() {
    this.setGameState(NEW_BOARD);
    this.setCurrentTurn(1);
    this.setWinner(-1);
    this.setIsInGame(true);
    this.setIsGameStarted(false);
  }
}

export default MessageHandler;
