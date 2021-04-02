import DiscordClient from '../../client/client';

export default abstract class BaseMCBotEvent {
  constructor(private name: string, private category: string) {}

  getName(): string { return this.name; }
  getCategory(): string { return this.category; }

  abstract run(client: DiscordClient, data : any): Promise<void>;
}