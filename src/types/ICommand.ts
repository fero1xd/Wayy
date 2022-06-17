import { CommandInteraction } from 'discord.js';

export type ICommand = {
  data: any;
  permissions?: bigint[];
  execute: (interaction: CommandInteraction) => void;
};
