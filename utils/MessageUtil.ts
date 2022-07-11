type MessageUtilType = {
  ws: WebSocket;
  message: { [key: string]: any };
  setGameId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentTurn: WebsocketContextType['setCurrentTurn'];
  setBoard: WebsocketContextType['setBoard'];
  toast: WebsocketContextType['toast'];
};

class MessageHandler {
  public ws: MessageUtilType['ws'];
  public message: MessageUtilType['message'];
  public setGameId: MessageUtilType['setGameId'];
  public setCurrentTurn: MessageUtilType['setCurrentTurn'];
  public setGameState: MessageUtilType['setBoard'];
  public toast: MessageUtilType['toast'];

  constructor(data: MessageUtilType) {
    this.ws = data.ws;
    this.message = data.message;
    this.setGameId = data.setGameId;
    this.setCurrentTurn = data.setCurrentTurn;
    this.setGameState = data.setBoard;
    this.toast = data.toast;
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
    const message = this.message as Server.StatusMessage;

    if (message.status === 'fail') {
      console.log('player failed to join');
      return;
    }

    this.toast({
      title: 'Another player joined your game!',
      status: 'success',
      isClosable: true,
      duration: 5000,
    });
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
      toast: this.toast,
    })[this.message.message as Server.StatusNotification]();
  }

  public JoinGame() {
    const message = this.message as Server.ResponseMessage<Server.JoinResponse>;

    if (message.status === 'rejected') {
      this.toast({
        title: 'Could not join game',
        description: `Reason: ${message.reason}`,
        status: 'error',
        isClosable: true,
        duration: 5000,
      });
      return;
    }

    this.toast({
      title: 'Joined game!',
      status: 'success',
      isClosable: true,
      duration: 5000,
    });

    this.setGameId(message.body.gameId);
  }

  public CreateGame() {
    const message = this.message as Server.ResponseMessage<Server.CreateResponse>;

    if (message.status === 'rejected') {
      this.toast({
        title: 'Could not create game',
        description: `Reason: ${message.reason}`,
        status: 'error',
        isClosable: true,
        duration: 5000,
      });
      return;
    }

    this.toast({
      title: 'Game lobby created!',
      status: 'success',
      isClosable: true,
      duration: 5000,
    });

    this.setGameId(message.body.gameId);
  }

  public PlacePiece() {
    const message = this.message as Server.ResponseMessage<Server.PlaceResponse>;

    if (message.status === 'rejected') {
      this.toast({
        title: 'Could not place piece',
        description: `Reason: ${message.reason}`,
        status: 'error',
        isClosable: true,
        duration: 5000,
      });
    }
  }
}

export default MessageUtil;
