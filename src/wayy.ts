import Discord, { Collection, Intents } from 'discord.js';
import { ICommand } from './types/ICommand';
import path from 'path';
import 'dotenv/config';
import { IButtonEvent } from './types/IEvent';

// Initialize client with intents
const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

const TOKEN = process.env.BOT_TOKEN!;

// Custom properties on client object (only for typescript)
declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, ICommand>;
    buttons: Collection<string, IButtonEvent>;
  }
}

client.commands = new Collection();
client.buttons = new Collection();

// Login the bot
client.login(TOKEN).then(() => {
  ['handlers'].forEach((h) => {
    require(path.join(__dirname, h))(client);
  });
});
