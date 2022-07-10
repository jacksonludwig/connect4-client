type MessageUtilType = {
  ws: WebSocket;
  message: { [key: string]: any };
  setGameId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentTurn: React.Dispatch<PlayerToken>;
  setBoard: React.Dispatch<Board>;
};

class MessageHandler {
  public ws: MessageUtilType['ws'];
  public message: MessageUtilType['message'];
  public setGameId: MessageUtilType['setGameId'];
  public setCurrentTurn: MessageUtilType['setCurrentTurn'];
  public setGameState: MessageUtilType['setBoard'];

  constructor(data: MessageUtilType) {
    this.ws = data.ws;
    this.message = data.message;
    this.setGameId = data.setGameId;
    this.setCurrentTurn = data.setCurrentTurn;
    this.setGameState = data.setBoard;
  }
}

class StatusNotificationUtil extends MessageHandler {
  constructor(data: MessageUtilType) {
    super(data);
  }

  public GameOver() {
    return;
  }

  public GameState() {
    const message = this.message as Server.StatusMessage;

    if (message.status === 'fail' || !message.body) {
      console.log('game state error');
      return;
    }

    this.setGameState(message.body.board);
    this.setCurrentTurn(message.body.currentTurn);
  }

  public GameCreated() {
    return;
  }

  public PlayerJoined() {
    return;
  }
}

class MessageUtil extends MessageHandler {
  constructor(data: MessageUtilType) {
    super(data);
  }

  public StatusNotification() {
    new StatusNotificationUtil({
      ws: this.ws,
      message: this.message,
      setGameId: this.setGameId,
      setCurrentTurn: this.setCurrentTurn,
      setBoard: this.setGameState,
    })[this.message.message as Server.StatusNotification]();
  }

  public JoinGame() {
    const message = this.message as Server.ResponseMessage<Server.JoinResponse>;

    if (message.status === 'rejected') {
      console.log('could not join game');
      return;
    }

    this.setGameId(message.body.gameId);
  }

  public CreateGame() {
    const message = this.message as Server.ResponseMessage<Server.CreateResponse>;

    if (message.status === 'rejected') {
      console.log('could not create game');
      return;
    }

    this.setGameId(message.body.gameId);
  }

  public PlacePiece() {
    return;
  }
}

export default MessageUtil;
