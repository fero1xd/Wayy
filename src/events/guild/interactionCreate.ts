import { Interaction } from 'discord.js';
import { IEvent } from '../../types/IEvent';

const interactionCreate: IEvent = {
  name: 'interactionCreate',
  once: false,
  execute: async (client, interaction: Interaction) => {
    if (interaction.isButton()) {
      const btn = client.buttons.get(interaction.customId);

      if (btn) return btn.execute(interaction);
    }

    // For slash command
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    if (command.permissions) {
      const member = interaction.guild!.members.cache.get(interaction.user.id);

      if (!member?.permissions.has(command.permissions)) {
        return await interaction.reply({
          content: 'You do not have enough permissions',
          ephemeral: true,
        });
      }
    }

    command.execute(interaction);
  },
};

module.exports = interactionCreate;
