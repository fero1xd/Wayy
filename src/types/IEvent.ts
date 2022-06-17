import { ButtonInteraction, Client } from 'discord.js';

export type IEvent = {
  name: string;
  once: boolean;
  execute: (client: Client, ...args: any) => void;
};

export type IButtonEvent = {
  id: string;
  execute: (intercation: ButtonInteraction) => void;
};
