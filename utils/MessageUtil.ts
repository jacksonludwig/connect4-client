type MessageUtilType = {
  ws: WebSocket;
  message: { [key: string]: any };
  setGameId: React.Dispatch<React.SetStateAction<string>>;
};

class StatusNotificationUtil {
  private ws: MessageUtilType['ws'];
  private message: MessageUtilType['message'];
  private setGameId: MessageUtilType['setGameId'];

  constructor(data: MessageUtilType) {
    this.ws = data.ws;
    this.message = data.message;
    this.setGameId = data.setGameId;
  }

  public GameOver() {
    return;
  }

  public GameState() {
    return;
  }

  public GameCreated() {
    return;
  }

  public PlayerJoined() {
    return;
  }
}

class MessageUtil {
  private ws: MessageUtilType['ws'];
  private message: MessageUtilType['message'];
  private setGameId: MessageUtilType['setGameId'];

  constructor(data: MessageUtilType) {
    this.ws = data.ws;
    this.message = data.message;
    this.setGameId = data.setGameId;
  }

  public StatusNotification() {
    // TODO: call status notification class
    return;
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
