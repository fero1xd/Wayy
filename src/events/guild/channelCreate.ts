import { GuildChannel } from 'discord.js';
import { IEvent } from '../../types/IEvent';

const channelCreate: IEvent = {
  name: 'channelCreate',
  once: false,
  execute: async (client, channel: GuildChannel) => {
    const guild = channel.guild;

    // Check for verifed role
    let verifiedRole = guild.roles.cache.find((r) => r.name === 'verified');
    if (!verifiedRole) {
      verifiedRole = await guild.roles.create({
        name: 'verified',
        permissions: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'],
      });
    }

    await channel.permissionOverwrites.create(guild.roles.everyone, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: false,
    });

    await channel.permissionOverwrites.create(verifiedRole, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
    });

    console.log('New channel created setting permissions for that');
  },
};

module.exports = channelCreate;
