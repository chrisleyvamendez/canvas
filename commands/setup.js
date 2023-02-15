const { SlashCommandBuilder, SlashCommandStringOption } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription("/config [classid#1] [classid#2] [classid#3] ")
    .addStringOption(new SlashCommandStringOption()
      .setName("class-ids")
      .setDescription("canvas class id, any invalid id will be removed from processing")
      .setRequired(true)
    ),
  async execute(inter) {
    const idArr = inter.options.getString('class-ids').split(' ');
    inter.reply({content:'I hope you liked this show' + ` ${idArr}`})
    return idArr
  }
};
