import { SlashCommandBuilder } from '@discordjs/builders';
import { ChannelType } from 'discord-api-types/v9';
import {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions,
  TextChannel,
} from 'discord.js';
import { ICommand } from '../../types/ICommand';

const captcha: ICommand = {
  data: new SlashCommandBuilder()
    .setName('captcha')
    .setDescription('Setup captcha')
    .addChannelOption((channel) =>
      channel
        .setName('channel')
        .setDescription('The channel')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),
  permissions: [Permissions.FLAGS.ADMINISTRATOR],
  execute: async (interaction) => {
    const channel = interaction.options.getChannel(
      'channel',
      true
    ) as TextChannel;

    const guild = interaction.guild!;

    // Check for verifed role
    let verifiedRole = guild.roles.cache.find((r) => r.name === 'verified');
    if (!verifiedRole) {
      verifiedRole = await guild.roles.create({
        name: 'verified',
        permissions: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'],
      });
    }

    // Set permissions for each channel
    guild.channels.cache.forEach(async (c) => {
      if (c.type === 'GUILD_TEXT') {
        await c.permissionOverwrites.create(channel.guild.roles.everyone, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: c.id === channel.id,
        });

        await c.permissionOverwrites.create(verifiedRole!, {
          SEND_MESSAGES: c.id !== channel.id,
          VIEW_CHANNEL: c.id !== channel.id,
        });
      }
    });

    const embed = new MessageEmbed()
      .setTitle('Captcha Verification')
      .setDescription('Click the button to verify your self')
      .setFooter({ text: guild.name, iconURL: guild.iconURL()! })
      .setColor('AQUA');

    const button = new MessageButton()
      .setStyle('PRIMARY')
      .setCustomId('captcha')
      .setLabel('Verify');

    channel.send({
      embeds: [embed],
      components: [new MessageActionRow().addComponents(button)],
    });

    interaction.reply({ content: 'Done!', ephemeral: true });
  },
};

module.exports = captcha;
