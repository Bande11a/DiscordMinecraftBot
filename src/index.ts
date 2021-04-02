
import { registerCommands, registerEvents, registerBotEvent } from './utils/registry';
import config from '../slappey.json';
import DiscordClient from './client/client';
const client = new DiscordClient({});

(async () => {
  client.prefix = config.prefix || client.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await registerBotEvent(client, "../MCBOT");
  await client.login(config.token);
})();

