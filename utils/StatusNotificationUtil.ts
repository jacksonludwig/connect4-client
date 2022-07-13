import { createStandaloneToast } from '@chakra-ui/react';
import MessageHandler, { MessageUtilType } from './Message';

const { toast } = createStandaloneToast();

export class StatusNotificationUtil extends MessageHandler {
  constructor(data: MessageUtilType) {
    super(data);
  }

  public GameOver() {
    const message = this.message as Server.StatusMessage<GameOverBody>;

    if (message.status === 'fail' || !message.body) {
      console.log('game over error');
      return;
    }

    this.setWinner(message.body.winner);
  }

  public GameState() {
    const message = this.message as Server.StatusMessage<GameStateBody>;

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
    const message = this.message as Server.StatusMessage<undefined>;

    if (message.status === 'fail') {
      console.log('player failed to join');
      return;
    }

    toast({
      title: 'Another player joined your game!',
      status: 'success',
      isClosable: true,
      duration: 5000,
    });

    this.setIsGameStarted(true);
  }

  public PlayerLeft() {
    toast({
      title: 'The opposing player disconnected!',
      description: 'Try recreating your lobby and inviting them again.',
      status: 'error',
      isClosable: true,
      duration: 60000,
    });
  }
}
