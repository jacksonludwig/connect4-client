type MessageType = {
  ws: WebSocket;
  message: { [key: string]: any };
};

class StatusNotificationUtil {
  private ws: MessageType['ws'];
  private message: MessageType['message'];

  constructor(data: MessageType) {
    this.ws = data.ws;
    this.message = data.message;
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
  private ws: MessageType['ws'];
  private message: MessageType['message'];

  constructor(data: MessageType) {
    this.ws = data.ws;
    this.message = data.message;
  }

  public StatusNotification() {
    // TODO: call status notification class
    return;
  }

  public JoinGame() {
    return;
  }

  public CreateGame() {
    return;
  }

  public PlacePiece() {
    return;
  }
}

export default MessageUtil;
