"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const courses_1 = require("./commands/libs/courses");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const token = 'MTA3NDM0NDg5NTM2MTMzMTMwMQ.G-Xu_h.uLZ-r_lyvYrQdMpB6qJRxxeZziEfivaDYtzbI4';
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
});
client.login(token).then((r) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("client logged : " + r);
    const courses = yield (0, courses_1.classes)();
    for (const course of courses) {
        console.log(course.course_code);
    }
}));
client.once(Events.ClientReady, (client) => {
    client.channels.fetch('1070865825596194892')
        .then(channel => {
        channel.send("Hello here!");
    });
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
    }
    else {
        console.log(`[WARNING] The command at ${f_path} is missing a required "data" or "execute" property.`);
    }
}
client.on(Events.InteractionCreate, (inter) => __awaiter(void 0, void 0, void 0, function* () {
    if (!inter.isChatInputCommand())
        return;
    // match client command with commands collection using get
    const command = inter.client.commands.get(inter.commandName);
    if (!command) {
        console.error(`No command matching ${inter.commandName} was found.`);
        return;
    }
    try {
        const data = yield command.execute(inter);
        console.log(data);
    }
    catch (e) {
        if (e instanceof discord_js_1.DiscordAPIError) {
            yield inter.reply({ content: "sorry our discord bot timed out, try again later" });
        }
        else {
            console.error(e);
            yield inter.reply({ content: "error executing this command :(" });
        }
    }
}));
//# sourceMappingURL=index.js.map