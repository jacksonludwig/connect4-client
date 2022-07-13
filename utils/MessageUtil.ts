import { createStandaloneToast } from '@chakra-ui/react';
import MessageHandler, { MessageUtilType } from './Message';
import { StatusNotificationUtil } from './StatusNotificationUtil';

const { toast } = createStandaloneToast();

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
      setWinner: this.setWinner,
      isGameStarted: this.isGameStarted,
      setIsGameStarted: this.setIsGameStarted,
    })[this.message.message as Server.StatusNotification]();
  }

  public JoinGame() {
    const message = this.message as Server.ResponseMessage<Server.JoinResponse>;

    if (message.status === 'rejected') {
      toast({
        title: 'Could not join game',
        description: `Reason: ${message.reason}`,
        status: 'error',
        isClosable: true,
        duration: 5000,
      });
      return;
    }

    toast({
      title: 'Joined game!',
      status: 'success',
      isClosable: true,
      duration: 5000,
    });

    this.setGameId(message.body.gameId);
    this.setIsGameStarted(true);
  }

  public CreateGame() {
    const message = this.message as Server.ResponseMessage<Server.CreateResponse>;

    if (message.status === 'rejected') {
      toast({
        title: 'Could not create game',
        description: `Reason: ${message.reason}`,
        status: 'error',
        isClosable: true,
        duration: 5000,
      });
      return;
    }

    toast({
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
      toast({
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
