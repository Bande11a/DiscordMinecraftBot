import BaseMCBotEvent from '../../utils/structures/BaseMCBotEvent';
import DiscordClient from '../../client/client';

export default class TestCommand extends BaseMCBotEvent {
  constructor() {
    super('Test', 'TestEvent');
  }

  async run(client: DiscordClient, data: any) {
    console.log(`The test Event seems to be working the data I recived was: ${data}`);
  }
}