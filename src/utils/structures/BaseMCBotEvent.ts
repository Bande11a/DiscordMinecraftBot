import DiscordClient from '../../client/client';

//class the events that you will be coding for the minecraft bot will inherit from.
export default abstract class BaseMCBotEvent {
  constructor(private name: string, private category: string) {}

  getName(): string { return this.name; }
  getCategory(): string { return this.category; }

  abstract run(client: DiscordClient, data : any): Promise<void>;
}