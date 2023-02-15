const fs = require("node:fs");
const path = require("node:path");

require("dotenv").config();
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const appId = process.env.APP_ID;
const publicKey = process.env.PUBLIC_KEY;
const token = process.env.BOT_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
  ],
});

client.login(token);

client.once(Events.ClientReady, (c) => {
  // once the client is ready, what are we going to do
});

client.commands = new Collection();

const cmd_path = path.join(__dirname, "commands"); //dir name == /commands
const cmd_files = fs.readdirSync(cmd_path).filter((f) => f.endsWith(".js"));

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
    console.error(e);
    await inter.reply({ content: "error executing this command :(" });
  }

});
