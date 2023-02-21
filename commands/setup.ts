const { SlashCommandBuilder, SlashCommandStringOption } = require('discord.js');
import { classes } from './libs/courses';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription("login to your canvas account settings, generate am apikey & paste it here")
    .addStringOption(new SlashCommandStringOption()
      .setName("info")
      .setDescription("canvas api key, if key is invalid, we'll let you know")
      .setRequired(true)
    ),
  execute: async function (inter: any) {
    const strs: string = await inter.options.getString('info').split(' ');
    const courses = await classes(strs[0], strs[1])
    let tmp = "";
    for(const course of courses){
      tmp += `► ${course.course_code} \n`;
    }
    await inter.reply({ content: `👋    Hey **${inter.user.username}**,\n We've compiled a list of your classes: \n` + tmp,
    ephemeral: false});
  }
}



