import { Client } from 'discord.js';
import { IButtonEvent } from '../types/IEvent';
import readFiles from '../utils/readFiles';

const buttonHandler = async (client: Client) => {
  const files: string[] = [];

  await readFiles('buttons', files);

  for (const file of files) {
    const btn = require(file) as IButtonEvent;

    client.buttons.set(btn.id, btn);
  }
};

export default buttonHandler;
