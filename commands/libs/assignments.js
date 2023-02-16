const axios = require('axios');
import {process} from './process';








/**
 * const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
const axios  = require('axios')
const token = 'MTA3MDkyODI4NjAwOTU0NDcyNA.GamD65.XjyPK4YS_woHvgvjb1_Tj7PC_CHvHYBf2nZtgU';
const fs = require('node:fs');
const path = require('node:path')
const channel_id = "1070865825596194891"
const canvasAPIKey = "11299~g5qmNkOgaLnedDqrtDXKzuuQEnouu8v2UuR3vE2cdiH7PeGozAZt91wYPHRWGSo2"

const classes = [{cid: 101063, cname: "CSC 134"}, {cid: 103232, cname: "STAT 129"}, {cid: 101977, cname: "RPTA 125" }]


// create a new client instance
// the term guild is used by discord to refer to the server
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// once client is online, start to listen to canvas for new assignments
client.once(Events.ClientReady, c => {
    console.log(`ready, logged as ${c.user.tag}`);

    setInterval(async()=> {

        const assignments = await getAssignmentsDue();
        if (assignments.length > 0){
            const message = formatMessage(assignments);
            await sendMessage(message);
        }

    }, 10 * 60 * 60 )
});

async function getAssignmentsDue() {

    const classes = [{cid: 101063, cname: "CSC 134"}, {cid: 103232, cname: "STAT 129"}, {cid: 101977, cname: "RPTA 125" }]
    const current = new Date();
    const fromNow = new Date(current.getTime() + 96 * 60 * 60 * 1000);


    let allAssignments = []
    for (const aClass of classes) {
        try {
            // for each classID, inside our collection of classID's, we are going to return objects of json data of all assignmnents
            const response = await axios.get(`https://csus.instructure.com/api/v1/courses/${aClass.cid}/assignments`, {
                headers: { Authorization: `Bearer ${canvasAPIKey}`}
            })
            const assignments = response.data;
            const assignmentsDue = assignments.filter((assignment) => {
                return assignment.due_at && new Date(assignment.due_at) < fromNow;
            })
            allAssignments = allAssignments.concat(assignmentsDue.map(assignment => ({...assignment, className: aClass.cname})))

        } catch(e) {
            console.error(e);
            return []

        }
    }
    return allAssignments;
}



function formatMessage(assignments) {
    let message = `\n**📝 Assignments due in the next 24 hours:**\n\n`;
    for (const assignment of assignments) {
        message += `- **${assignment.name}** |\t *${assignment.className}*\n`;
    }
    return `@everyone \n${message}\n`;
}




async function sendMessage(message) {
    const channel = client.channels.cache.get(channel_id);
    await channel.send(message);
    console.log(`message sent to ${client.user.tag}`);
}

client.login(token);




















// where we are going to store our /commands
client.commands = new Collection();


// LOAD ALL COMMANDS FROM THE COMMANDS DIR AND LOAD THEM INTO THE CLIENT COMMANDS COLLECTION
// dirname is current directory, concats a dir name and a file name to create a file path'
// source -> source/ commands
const commandsPath = path.join(__dirname, 'commands');
// filter out all the files in the commands folder that dont end in js 
const JScommandFiles = fs.readdirSync(commandsPath).filter(file=>file.endsWith('.js'))

for (const file of JScommandFiles){
    // source / commands -> source/commands/file.js
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // the key is the name of the command, the command object is the value, a hashmap
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[warning] the command at ${filePath} is missing a required data or execute property`);
    }

}




// each slash command is an interaction, to respond to a command, create a listener for these interactions
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return; // only respond to the chat inputs else void 
    console.log(interaction)

    // retrieve the logic for the command name that was input from the interaction
    const command = interaction.client.commands.get(interaction.commandName)
    
    if (!command) {
        console.error(`no command matching ${interaction.commandName}`);
        return
    }
    try {
        await command.execute(interaction);
    } catch(e) {
        console.error(e);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }

});


 */
