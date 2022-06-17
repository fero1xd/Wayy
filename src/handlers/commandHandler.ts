import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client } from 'discord.js';
import { ICommand } from '../types/ICommand';
import readFiles from '../utils/readFiles';

const commandHandler = async (client: Client) => {
  const files: string[] = [];

  await readFiles('commands', files);

  const commands = [];

  for (const file of files) {
    const command = require(file) as ICommand;

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({
    version: '9',
  }).setToken(process.env.BOT_TOKEN!);

  (async () => {
    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(
        Routes.applicationGuildCommands(client.user!.id, '854330456207654933'),
        { body: commands }
      );

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();
};

export default commandHandler;
