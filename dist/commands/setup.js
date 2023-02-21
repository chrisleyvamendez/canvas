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
const { SlashCommandBuilder, SlashCommandStringOption } = require('discord.js');
const courses_1 = require("./libs/courses");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription("login to your canvas account settings, generate am apikey & paste it here")
        .addStringOption(new SlashCommandStringOption()
        .setName("info")
        .setDescription("canvas api key, if key is invalid, we'll let you know")
        .setRequired(true)),
    execute: function (inter) {
        return __awaiter(this, void 0, void 0, function* () {
            const strs = yield inter.options.getString('info').split(' ');
            const courses = yield (0, courses_1.classes)(strs[0], strs[1]);
            let tmp = "";
            for (const course of courses) {
                tmp += `► ${course.course_code} \n`;
            }
            yield inter.reply({ content: `👋    Hey **${inter.user.username}**,\n We've compiled a list of your classes: \n` + tmp,
                ephemeral: false });
        });
    }
};
//# sourceMappingURL=setup.js.map