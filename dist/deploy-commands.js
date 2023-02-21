var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('node:fs');
const clientId = process.env.CLIENT_ID;
const tkn = 'MTA3NDM0NDg5NTM2MTMzMTMwMQ.G-Xu_h.uLZ-r_lyvYrQdMpB6qJRxxeZziEfivaDYtzbI4';
console.log(clientId);
const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync('./dist/commands').filter(file => file.endsWith('.js'));
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}
const rest = new REST({
    version: `10`
}).setToken(tkn);
// and deploy your commands!
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = yield rest.put(Routes.applicationCommands("1074344895361331301"), { body: commands });
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
}))();
//# sourceMappingURL=deploy-commands.js.map