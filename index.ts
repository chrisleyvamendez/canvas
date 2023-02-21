import { DiscordAPIError } from "discord.js";
import { classes } from './commands/libs/courses'

const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();

const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");

const token: string = "MTA3NDM0NDg5NTM2MTMzMTMwMQ.Gv2673.OxbExYJUkg_qfZz4WX51xLv5Pz1f6GH-ty-CYs";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(token).then(async r => {
  console.log("client logged : " + r);
  const courses = await classes();
  for (const course of courses){
    console.log(course.course_code);
  }
})

client.once(Events.ClientReady, (client) => {
    client.channels.fetch('1070865825596194892')
    .then(channel => {
        channel.send("Hello here!");
    })
});

client.commands = new Collection();

const cmd_path = path.join(__dirname, "commands"); //dir name == /commands
const cmd_files = fs.readdirSync(cmd_path).filter((f: string) => f.endsWith(".js"));

for (const f of cmd_files) {
  const f_path = path.join(cmd_path, f);
  const cmd = require(f_path); // will look into the path and look for a file
  // hashmap => key:command-name, value: exported-code from module
  if ("data" in cmd && "execute" in cmd) {
    client.commands.set(cmd.data.name, cmd);
  } else {
    console.log(
      `[WARNING] The command at ${f_path} is missing a required "data" or "execute" property.`
    );
  }
}

client.on(Events.InteractionCreate, async (inter) => {
  if (!inter.isChatInputCommand()) return;

  // match client command with commands collection using get
  const command = inter.client.commands.get(inter.commandName);
  if (!command) {
    console.error(`No command matching ${inter.commandName} was found.`);
    return;
  }
  try {
    const data = await command.execute(inter);
    console.log(data);


  } catch (e) {
    if (e instanceof DiscordAPIError) {
      await inter.reply({content: "sorry our discord bot timed out, try again later"})
    } else {
      console.error(e);
      await inter.reply({ content: "error executing this command :(" });


    }
  }

});
