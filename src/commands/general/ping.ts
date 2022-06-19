import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { ICommand } from '../../types/ICommand';

const ping: ICommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Shows the current ws ping'),
  execute(interaction: CommandInteraction) {
    const embed = new MessageEmbed().setTitle('Pong !').setColor('RANDOM');

    const t = '`';
    embed.addField(
      'Wayy',
      `${t}${Math.round(interaction.client.ws.ping)} ms${t}`,
      false
    );

    embed.addField(
      'Serving',
      `${t}${interaction.client.guilds.cache.size} guilds${t}`,
      false
    );

    interaction.reply({
      embeds: [embed],
    });
  },
};

module.exports = ping;
