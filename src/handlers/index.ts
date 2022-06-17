import { Client } from 'discord.js';
import eventHandler from './eventHandler';
import commandHandler from './commandHandler';
import buttonHandler from './buttonHandler';

module.exports = async (client: Client) => {
  await eventHandler(client);
  await commandHandler(client);
  await buttonHandler(client);
};
