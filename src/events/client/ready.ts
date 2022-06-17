import { Client } from 'discord.js';
import { IEvent } from '../../types/IEvent';

const ready: IEvent = {
  name: 'ready',
  once: true,
  execute: (client: Client) => {
    console.log(`${client.user!.username} is ready !`);
  },
};

module.exports = ready;
