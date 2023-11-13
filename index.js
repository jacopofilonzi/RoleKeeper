console.clear();
const fs = require("fs")
const {Client, GatewayIntentBits} = require('discord.js');

//System checkup
require("./utility/check")()

//Create the client
const client = new Client({
    intents:[
        GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences, //TO BE ACTIVATED IN THE BOT SETTINGS ON discord.com/developers
        GatewayIntentBits.GuildMembers, //TO BE ACTIVATED IN THE BOT SETTINGS ON discord.com/developers
        GatewayIntentBits.MessageContent //TO BE ACTIVATED IN THE BOT SETTINGS ON discord.com/developers
    ]
})

//#region LOAD EVENTS

//Get all the events files
let eventFiles = fs.readdirSync("./events/").filter(file => file.endsWith(".js"))

//Loop through all the events
for (const eventPath of eventFiles) {
    const event = require(`./events/${eventPath}`)

    if (event.Once) //If needed once
        client.once(event.EventName, (...args) => event.Execute(client, ...args))
    else//If always needed 
        client.on(event.EventName,  (...args) => event.Execute(client, ...args))
}

//#endregion

//Connect
console.log("[BOT] Booting up...")
client.login(process.env.BOT_TOKEN);