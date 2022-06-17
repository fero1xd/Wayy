import { Client } from 'discord.js';
import { IEvent } from '../types/IEvent';
import readFiles from '../utils/readFiles';

const eventHandler = async (client: Client) => {
  const files: string[] = [];

  await readFiles('events', files);

  files.forEach((file) => {
    const event = require(file) as IEvent;

    if (!event.name) return;
    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args));
    }
  });
};

export default eventHandler;
