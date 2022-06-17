import { IButtonEvent } from '../types/IEvent';
import { Captcha } from 'captcha-canvas';
import { Message, MessageAttachment, MessageEmbed } from 'discord.js';

const captcha: IButtonEvent = {
  id: 'captcha',
  async execute(interaction) {
    const captcha = new Captcha();
    captcha.async = true;
    captcha.addDecoy();
    captcha.drawTrace();
    captcha.drawCaptcha();

    const att = new MessageAttachment(await captcha.png, 'captcha.png');
    const guild = interaction.guild!;

    const member = guild.members.cache.get(interaction.user.id)!;

    const embed = new MessageEmbed()
      .setTitle(`Please complete this captcha`)
      .setImage('attachment://captcha.png');

    const msg = await member.send({
      embeds: [embed],
      files: [att],
    });

    await interaction.reply({
      content: 'Please check your `Direct Messages` to complete the captcha',
      ephemeral: true,
    });

    const filter = (m: Message) => {
      return m.author.id === interaction.user.id;
    };

    const collector = msg.channel.createMessageCollector({
      filter,
      max: 1,
      time: 1000 * 10,
    });

    collector.on('end', async (collected) => {
      if (!collected.size) {
        await msg.channel.send(
          'You failed to solve the captcha. Try again later!'
        );
        return;
      }

      collected.forEach(async (m) => {
        if (m.content !== captcha.text) {
          return await msg.channel.send(
            'You failed to solve the captcha. Try again later!'
          );
        }

        const verifiedRole = guild.roles.cache.find(
          (r) => r.name === 'verified'
        );

        verifiedRole && (await member.roles.add(verifiedRole));

        await msg.channel.send(
          `Alright, you are now verified in ${guild.name}`
        );
      });
    });
  },
};

module.exports = captcha;
